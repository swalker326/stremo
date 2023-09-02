import express from "express";
import http from "http";
import { Server } from "socket.io";
import { prisma } from "db";
import { type User, type Room } from "db/types";
import cors from "cors";

type RoomWithUsers = {
  id: string;
  name: string;
  users: User[];
};
// ClientToServer
export type CreateRoomPayload = {
  userId: string;
  room: RoomWithUsers;
};
export type UserConnectedPayload = {
  roomId: string;
  userId: string;
};

export interface ClientToServerEvents {
  "user-connected": (payload: UserConnectedPayload) => Promise<void>;
  "create-room": (payload: CreateRoomPayload) => Promise<void>;
}

// ServerToClient
export type RoomCreatedPayload = RoomWithUsers;

export interface ServerToClientEvents {
  "room-created": (room: RoomCreatedPayload) => void;
}

const app = express();
app.use(cors);
const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: [
      /https:\/\/stremo-([A-Za-z0-9-_]+).vercel.app/,
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("create-room", async ({ userId, room }) => {
    console.log("Room Create Message Recivied");
    socket.to(room.id).emit("room-created", { ...room });
    // const room = await prisma.room.create({
    //   data: { name: name || "", users: { connect: { id: userId } } },
    //   select: { id: true, name: true, users: true }
    // });

    socket.emit("room-created", room);
  });
  socket.on("user-connected", async (args) => {
    const user = await prisma.user.findUnique({ where: { id: args.roomId } });
    if (!user) {
      socket.disconnect();
    } else {
      const room = await prisma.room.findUnique({
        where: { id: args.roomId }
      });
      if (room) {
        prisma.room.update({
          where: { id: args.roomId },
          data: { users: { connect: { id: args.userId } } }
        });
      }
    }
  });
});

const WS_PORT = 5000;
server.listen(WS_PORT, () => {
  console.log(`✅ Server is running on http://localhost:${WS_PORT}`);
});

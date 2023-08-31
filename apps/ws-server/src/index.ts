import express from "express";
import http from "http";
import { Server } from "socket.io";
import { prisma } from "db";
import { type User, type Room } from "db/types";
import cors from "cors";

// ClientToServer
export type CreateRoomPayload = {
  userId: string;
  name?: string;
};
export type UserConnectedPayload = {
  roomId: string;
  userId: string;
};

interface ClientToServerEvents {
  "user-connected": (payload: UserConnectedPayload) => Promise<void>;
  "create-room": (payload: CreateRoomPayload) => Promise<void>;
}

// ServerToClient
export type RoomCreatedPayload = Room & { users: User[] };

interface ServerToClientEvents {
  "room-created": (room: RoomCreatedPayload) => void;
}

const app = express();
app.use(cors);
const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust this if your client runs on a different port
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("create-room", async ({ userId, name }) => {
    console.log("Room Create Message Recivied");
    console.log(typeof userId);
    const room = await prisma.room.create({
      data: { name: name || "", users: { connect: { id: userId } } },
      select: { id: true, name: true, users: true }
    });
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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

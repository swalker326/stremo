import { prisma } from "db";
import { type User, type Room } from "db/types";

const WS_PORT = 5000;

type MessageType = "create-room" | "user-connected";

interface InboundMessageBase {
  type: MessageType;
}
interface CreateRoomMessage extends InboundMessageBase {
  type: "create-room";
  payload: {
    userId: string;
    room: Room;
  };
}
interface UserConnectedMessage extends InboundMessageBase {
  type: "user-connected";
  payload: {
    roomId: string;
    userId: string;
  };
}
type Message = CreateRoomMessage | UserConnectedMessage;
const server = Bun.serve<Message>({
  port: WS_PORT,
  // cors: {
  //   origin: [
  //     /https:\/\/stremo-([A-Za-z0-9-_]+).vercel.app/,
  //     "http://localhost:3000"
  //   ],
  //   methods: ["GET", "POST"]
  // },
  fetch(req, server) {
    const success = server.upgrade(req);
    if (success) {
      // Bun automatically returns a 101 Switching Protocols
      // if the upgrade succeeds
      return undefined;
    }

    // handle HTTP request normally
    return new Response("Hello world!");
  },
  websocket: {
    open(ws) {
      console.log("A user connected");
    },
    // this is called when a message is received
    async message(ws, message) {
      switch (ws.data.type) {
        case "create-room": {
          const { room } = ws.data.payload;
          ws.send(JSON.stringify({ type: "create-room", room }));
          break;
        }
        case "user-connected": {
          const user = await prisma.user.findUnique({
            where: { id: ws.data.payload.userId }
          });
          if (!user) {
            ws.close();
          } else {
            const room = await prisma.room.findUnique({
              where: { id: ws.data.payload.roomId }
            });
            if (room) {
              prisma.room.update({
                where: { id: ws.data.payload.roomId },
                data: { users: { connect: { id: ws.data.payload.userId } } }
              });
            }
          }
        }
      }
      // send back a message
      ws.send(`You said: ${message}`);
    }
  }
});

console.log(`✅ Listening on localhost:${server.port}`);

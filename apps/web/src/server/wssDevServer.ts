import { applyWSSHandler } from "@trpc/server/adapters/ws";
import ws from "ws";

type JoinMessage = {
  type: "room-join";
  payload: {
    name: string;
    roomId: string;
  };
};
type LeaveMessage = {
  type: "room-leave";
  payload: {
    name: string;
    roomId: string;
  };
};
type OfferMessage = {
  type: "offer";
  payload: {
    name: string;
    roomId: string;
  };
};
type WSMessage = JoinMessage | OfferMessage | LeaveMessage;

const wss = new ws.Server({
  port: 3001
});

wss.on("connection", (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once("close", () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
  ws.on("message", (message) => {
    const data = JSON.parse(message.toString()) as WSMessage;
    console.log(data);
    switch (data.type) {
      case "room-join": {
        break;
      }
      case "room-leave": {
        break;
      }
      case "offer": {
        break;
      }
    }
  });
});
console.log("✅ WebSocket Server listening on ws://localhost:3001");

process.on("SIGTERM", () => {
  wss.close();
});

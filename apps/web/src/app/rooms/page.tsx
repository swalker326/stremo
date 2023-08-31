"use client";
import { useAuth, useClerk } from "@clerk/nextjs";
import { io } from "socket.io-client";
import { CreateRoomPayload } from "ws-server";

export default function Room() {
  const socket = io("http://localhost:5000/");
  socket.emit("message", "hello server!");
  const user = useAuth();
  if (!user.userId) {
    return <div>You have to login to do that</div>;
  }
  return (
    <div>
      <h1>Rooms</h1>
      <button
        onClick={() => {
          console.log("Sending 'create-room' message");
          socket.emit("create-room", {
            userId: user.userId,
            name: "first room, yay"
          } satisfies CreateRoomPayload);
        }}
      >
        Create Room
      </button>
    </div>
  );
}

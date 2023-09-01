"use client";

import { Socket } from "socket.io-client";

export const CreateRoomButton = ({
  createRoom,
  // socket,
  userId
}: {
  createRoom: (socket: Socket, userId: string) => void;
  // socket: Socket;
  userId: string;
}) => {
  return (
    <>
      {/* <button onClick={() => createRoom(socket, userId)}>Create Room</button> */}
    </>
  );
};

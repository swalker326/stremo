"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "ws-server";

export const SocketContext = createContext<{
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  isConnected: boolean;
}>({
  socket: {} as Socket<ServerToClientEvents, ClientToServerEvents>,
  isConnected: false
});

export const useSocket = () => {
  if (!SocketContext) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<
    Socket<ServerToClientEvents, ClientToServerEvents>
  >({} as Socket<ServerToClientEvents, ClientToServerEvents>);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setSocket(() => {
      console.log("Connecting to socket", process.env.NEXT_PUBLIC_WS_URL);
      const socket = io(process.env.NEXT_PUBLIC_WS_URL as string);
      socket.on("connect", () => {
        setIsConnected(true);
      });
      socket.on("disconnect", () => {
        setIsConnected(false);
      });
      return socket;
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
export const SocketContext = createContext<{
  socket: WebSocket;
  isConnected: boolean;
}>({
  socket: {} as WebSocket,
  isConnected: false
});

export const useSocket = () => {
  if (!SocketContext) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket>({} as WebSocket);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setSocket(() => {
      console.log("Connecting to socket", process.env.NEXT_PUBLIC_WS_URL);
      const socket = new WebSocket("ws://localhost:5000");

      socket.addEventListener("open", () => {
        console.log("Socket connected");
        setIsConnected(true);
      });
      socket.addEventListener("close", () => {
        console.log("Socket disconnected");
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

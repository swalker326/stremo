"use client";

import { useSocket } from "./socketProvider";

export const ConnectionIndicator = () => {
  const socket = useSocket();
  return <div>{socket.isConnected ? "Connected" : "Disconnected"}</div>;
};

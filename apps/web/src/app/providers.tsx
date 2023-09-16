"use client";

import { SessionProvider } from "auth/react";
import { SocketProvider } from "./_components/providers/socketProvider";
import RTCProvider from "./_components/providers/RTCProvider";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <SocketProvider>
        <RTCProvider>{children}</RTCProvider>
      </SocketProvider>
    </SessionProvider>
  );
}

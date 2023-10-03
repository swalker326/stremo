"use client";

import { SessionProvider } from "auth/react";
import { SocketProvider } from "./_components/providers/socketProvider";
import RTCProvider from "./_components/providers/RTCProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <SocketProvider>
          <RTCProvider>{children}</RTCProvider>
        </SocketProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

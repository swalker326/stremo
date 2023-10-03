"use client";

import { SessionProvider } from "auth/react";
import { SocketProvider } from "./_components/providers/socketProvider";
import RTCProvider from "./_components/providers/RTCProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// TODO: this is not working *sad face*
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  const [queryClient] = React.useState(() => new QueryClient());
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

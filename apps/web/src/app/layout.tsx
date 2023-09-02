import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SocketProvider } from "./_components/socketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web RTC Video Chat"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SocketProvider>
        <html lang="en">
          <body className={`${inter.className} h-[calc(100vh-32px)] bg-slate-500`}>{children}</body>
        </html>
      </SocketProvider>
    </ClerkProvider>
  );
}

import "./globals.css";
import Image from "next/image";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SocketProvider } from "./_components/socketProvider";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ConnectionIndicator } from "./_components/ConnectionIndicator";

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
          <body
            className={`${inter.className} h-[calc(100vh-32px)] bg-slate-200`}
          >
            <div className="flex flex-col w-full h-full">
              <div className="flex bg-slate-800 h-24 items-center justify-between px-3 text-slate-100">
                <Link href="/">
                  <Image src="/logo.png" width={100} height={100} alt="logo" />
                </Link>
                <div className="flex flex-col justify-end items-center h-full">
                  <div className="min-w-20">
                    <UserButton />
                  </div>
                  <ConnectionIndicator />
                </div>
              </div>
              <div className="px-3 pt-2 h-full">{children}</div>
            </div>
          </body>
        </html>
      </SocketProvider>
    </ClerkProvider>
  );
}

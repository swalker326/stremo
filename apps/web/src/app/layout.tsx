import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SocketProvider } from "./_components/socketProvider";
import Link from "next/link";
import { ConnectionIndicator } from "./_components/ConnectionIndicator";
import { Sidebar } from "./_components/Sidebar";

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
            <div className="flex flex-col w-full h-screen relative">
              {/* <div className="flex bg-slate-800 h-32 items-center justify-between px-3 text-slate-100">
                <Link href="/">
                  <Image
                    className="m-3"
                    src="/logo.png"
                    width={90}
                    height={90}
                    alt="logo"
                  />
                </Link>
                <ConnectionIndicator />
              </div> */}
              <div className="px-3 pt-2 h-screen">{children}</div>
              <Sidebar />
            </div>
          </body>
        </html>
      </SocketProvider>
    </ClerkProvider>
  );
}

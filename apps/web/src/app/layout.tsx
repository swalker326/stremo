import "./globals.css";
import Image from "next/image";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "./_components/Sidebar";
import { Providers } from "./providers";

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
    <html lang="en">
      <body className={`${inter.className} h-[calc(100vh-32px)] bg-slate-200`}>
        <Providers>
          <div className="flex flex-col w-full h-screen relative">
            <div className="border flex items-center gap-2 bg-white py-2">
              <Sidebar />
              <Image src={"/logo.png"} width={50} height={50} alt="logo" />
            </div>
            <div className="px-3 pt-2 h-screen">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

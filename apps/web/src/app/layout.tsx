import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";
import Image from "next/image";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "./_components/Sidebar";
import { Providers } from "./providers";
import { ConnectionIndicator } from "~/app/_components/ConnectionIndicator";
import Link from "next/link";
import NextBreadcrumb from "./_components/Breadcrumb";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamO"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-[calc(100vh-32px)] bg-gray-100`}>
        <Providers>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <div className="flex flex-col w-full h-screen relative">
            <div className="flex justify-between bg-white items-center">
              <div className="flex items-center gap-2 py-2">
                <Sidebar />
                <Link href={"/"}>
                  <Image src={"/logo.png"} width={50} height={50} alt="logo" />
                </Link>
              </div>
              <div>
                <NextBreadcrumb
                  homeElement={"StremO"}
                  separator={<span>/</span>}
                  activeClasses="text-blue-500"
                  containerClasses="flex py-5"
                  listClasses="hover:underline mx-2 font-bold"
                  capitalizeLinks
                />
              </div>
              <div className="pr-2">
                <ConnectionIndicator />
              </div>
            </div>
            <div className="px-3 pt-2 h-screen">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

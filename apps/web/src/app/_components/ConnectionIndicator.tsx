"use client";

import { useClerk } from "@clerk/nextjs";
import { useSocket } from "./socketProvider";
import Image from "next/image";
import Link from "next/link";

export const ConnectionIndicator = () => {
  const socket = useSocket();
  const { user } = useClerk();
  if (!user) return <Link href="/signin">Login</Link>;
  const { externalAccounts } = user;
  const AccountImage = () => {
    if (externalAccounts.length === 0) return null;
    const { provider, username, imageUrl } = externalAccounts[0];
    if (provider === "google") {
      return (
        <div className="flex relative  w-30 h-30">
          <div
            className={`rounded-full absolute ${
              socket.isConnected ? "bg-green-500" : "bg-red-500"
            } bottom-0 right-0 w-3 h-3`}
          ></div>
          <Image
            width={60}
            height={60}
            className="rounded-full h-10 w-10"
            src={imageUrl}
            alt={username || "external account user image"}
          />
        </div>
      );
    }
    return null;
  };
  return (
    <div className="flex w-30 transition-all ease-in duration-3000">
      <AccountImage />
    </div>
  );
};

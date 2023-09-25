"use client";

import { useSession } from "auth/react";
import { useSocket } from "./providers/socketProvider";
import Image from "next/image";

export const ConnectionIndicator = () => {
  const socket = useSocket();
  const { data } = useSession();
  if (!data) return null;
  const { user } = data;
  console.log("user", user);
  const AccountImage = () => {
    if (!user.image) return null;
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
          src={user.image}
          alt={"external account user image"}
        />
      </div>
    );
  };

  return (
    <div className="flex w-30 transition-all ease-in duration-3000">
      <AccountImage />
    </div>
  );
};

"use client";

import { signOut, useSession } from "auth/react";
import { useSocket } from "./providers/socketProvider";
import Image from "next/image";
import { signIn } from "auth/react";
import { Popover } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export const ConnectionIndicator = () => {
  const socket = useSocket();
  const { data } = useSession();

  const AccountImage = () => {
    return (
      <>
        {data?.user ? (
          <Popover className="relative">
            <Popover.Button className="flex">
              <div className="flex">
                <ChevronDownIcon className="ui-open:rotate-180 ui-open:transform w-7" />
                <div className="flex relative w-full">
                  <div
                    className={`rounded-full absolute ${
                      socket.isConnected ? "bg-green-500" : "bg-red-500"
                    } bottom-0 right-2 w-3 h-3`}
                  ></div>
                  {data.user.image && (
                    <Image
                      width={45}
                      height={45}
                      className="rounded-full"
                      src={data.user.image}
                      alt={"external account user image"}
                    />
                  )}
                </div>
              </div>
            </Popover.Button>
            <Popover.Panel className="absolute -left-1/2 z-10 mt-3 max-w-sm -translate-x-1/4 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="rounded-lg relative bg-white p-3 flex flex-col">
                  <Link
                    className="px-3 py-1 text-blue-600 rounded-md hover:bg-blue-100"
                    href={`/profile/${data.user.id}`}
                  >
                    <div className="flex gap-1">
                      <UserIcon className="text-blue-800 w-5" />
                      <h4>Profile</h4>
                    </div>
                  </Link>
                  <button
                    className="px-3 py-1 text-blue-600 rounded-md hover:bg-blue-100"
                    onClick={() => signOut()}
                  >
                    <div className="flex gap-1">
                      <ArrowRightOnRectangleIcon className="text-blue-800 w-5" />
                      <h4>Logout</h4>
                    </div>
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Popover>
        ) : (
          <button
            className="px-3 py-1 bg-blue-400 rounded-md"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </>
    );
  };

  return (
    <div className="flex transition-all ease-in duration-3000">
      <AccountImage />
    </div>
  );
};

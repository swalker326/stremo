"use client";
import Link from "next/link";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { MouseEventHandler, MutableRefObject } from "react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useSession } from "auth/react";
import { ServerLinkList } from "./ServerLinkList";
import { prisma } from "db";
import { useQuery } from "@tanstack/react-query";
import { getServersByUserId } from "../_actions/sidebar";

// headless UI is not exporting this, so we have to define it ourselves
type MouseEvent<T> = Parameters<MouseEventHandler<T>>[0];

// export const SidebarLink = ({
//   href,
//   title,
//   close
// }: {
//   href: string;
//   title: string;
//   close(
//     focusableElement?:
//       | HTMLElement
//       | MutableRefObject<HTMLElement | null>
//       | MouseEvent<HTMLElement>
//   ): void;
// }) => {
//   return (
//     <Link
//       onClick={() => {
//         close();
//       }}
//       href={href}
//     >
//       <div className="flex w-full justify-between rounded-lg hover:bg-blue-500 px-4 py-2 text-left text-lg font-medium  focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
//         {title}
//       </div>
//     </Link>
//   );
// };

export const Sidebar = () => {
  const { data } = useSession();
  const { data: servers } = useQuery({
    queryKey: ["user", "servers", data?.user?.id ?? null],
    queryFn: () => getServersByUserId(data?.user?.id)
  });
  return (
    <>
      <Popover>
        {({ close }) => {
          return (
            <div className="relative">
              <Popover.Button className="mx-1 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </Popover.Button>
              <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
              <Transition
                className={`absolute -top-4 right-l h-screen`}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="relative z-10">
                  <div
                    className={`w-64 font-thin pb-2 flex justify-between flex-col h-screen bg-slate-100 text-slate-800 text-xl`}
                  >
                    <div className="flex flex-col">
                      <div>
                        <div className={`flex justify-center relative`}>
                          <Link href={"/"}>
                            <Image
                              src="/logo.png"
                              width={90}
                              height={90}
                              alt="logo"
                            />
                          </Link>
                          <button
                            className="absolute top-1 right-2 hover:text-blue-500 hover:translate-x-1 duration-150 ease-in-out"
                            onClick={() => close()}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="w-full mt-4">
                          <Link
                            href="/"
                            className="flex w-full justify-between rounded-lg hover:bg-blue-500 px-4 py-2 text-left text-lg font-medium  focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
                            onClick={() => close()}
                          >
                            {" "}
                            <h3>Home</h3>
                          </Link>

                          <Disclosure>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="flex w-full justify-between  hover:bg-blue-500 px-4 py-2 text-left text-lg font-medium  focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                  <span>Servers</span>
                                  <ChevronUpIcon
                                    className={`${
                                      !open ? "rotate-180 transform" : ""
                                    } w-8`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel
                                  static
                                  className={`${
                                    open
                                      ? "py-2 text-sm text-gray-500 bg-blue-200 transition-all duration-200"
                                      : ""
                                  }`}
                                >
                                  <Transition
                                    show={open}
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-175 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                  >
                                    <ul>
                                      {servers
                                        ? servers.map((server) => {
                                            return (
                                              <Link
                                                key={server.id}
                                                onClick={() => close()}
                                                className="flex w-full justify-between rounded-lg hover:underline px-4 py-2 text-left text-lg font-medium  focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
                                                href={`/servers/${server.id}`}
                                              >
                                                {server.name}
                                              </Link>
                                            );
                                          })
                                        : null}
                                      <li>
                                        <Link
                                          onClick={() => close()}
                                          className="flex w-full justify-between rounded-lg hover:underline px-4 py-2 text-left text-lg font-medium  focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
                                          href="/servers"
                                        >
                                          New Server
                                        </Link>
                                      </li>
                                    </ul>
                                  </Transition>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <h3>Settings</h3> */}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          );
        }}
      </Popover>
    </>
  );
};

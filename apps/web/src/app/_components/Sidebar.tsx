"use client";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { ConnectionIndicator } from "./ConnectionIndicator";
import Image from "next/image";
import { MouseEventHandler, MutableRefObject } from "react";
import { signIn, useSession } from "auth/react";

// headless UI is not exporting this, so we have to define it ourselves
type MouseEvent<T> = Parameters<MouseEventHandler<T>>[0];

export const SidebarLink = ({
  href,
  title,
  close,
}: {
  href: string;
  title: string;
  close(
    focusableElement?:
      | HTMLElement
      | MutableRefObject<HTMLElement | null>
      | MouseEvent<HTMLElement>,
  ): void;
}) => {
  return (
    <Link
      onClick={() => {
        close();
      }}
      href={href}
    >
      <div className="w-full hover:bg-blue-500 p-1">{title}</div>
    </Link>
  );
};

export const Sidebar = () => {
  const { data } = useSession();
  if (!data) return null;
  const { user } = data;
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
                          <SidebarLink href="/" title="Home" close={close} />
                          <SidebarLink
                            href="/rooms"
                            title="Rooms"
                            close={close}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {user ? (
                        <ConnectionIndicator />
                      ) : (
                        <button onClick={() => signIn()}>Login</button>
                      )}
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

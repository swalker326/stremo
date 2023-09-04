"use client";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { ConnectionIndicator } from "./ConnectionIndicator";
import Image from "next/image";
import { Fragment, useState } from "react";

const SidebarLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <div className="w-full hover:bg-blue-500 p-1">
      <Link href={href}>{title}</Link>
    </div>
  );
};

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [position, setPoition] = useState("w-0");
  const toggleOpen = () => {
    setOpen((open) => {
      if (!open) {
        setPoition("left-0");
      } else {
        setPoition("left-[256px]]");
      }
      return !open;
    });
  };
  return (
    <>
      <Popover className="absolute">
        <Popover.Button className="absolute left-0 ">
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
        <Popover.Panel>
          <div
            className={`w-64 font-thin pb-2 flex justify-between flex-col h-screen absolute left bg-slate-100 text-slate-800 text-xl`}
          >
            <div className="flex flex-col">
              <div>
                <div className={`flex justify-center`}>
                  <Link href={"/"}>
                    <Image src="/logo.png" width={90} height={90} alt="logo" />
                  </Link>
                </div>
                <div className="w-full mt-4">
                  <SidebarLink href="/" title="Home" />
                  <SidebarLink href="/rooms" title="Rooms" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ConnectionIndicator />
              <h3>Settings</h3>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
      {/* <Transition
        as={Fragment}
        show={open}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      > */}
      {/* </Transition> */}
    </>
  );
};

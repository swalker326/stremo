import {
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon
} from "@heroicons/react/20/solid";
import { prisma } from "db";
import Link from "next/link";

export default async function ServerLayout({
  children,
  params: { serverId }
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const serverRooms = await prisma.room.findMany({
    where: { serverId }
  });
  return (
    <div className="flex">
      <div className="flex-col h-screen border-slate-600 border-r-2 p-2 px-4 min-w-fit">
        <div className="flex justify-between w-full gap-2 items-center">
          <h2 className="font-bold text-2xl text-blue-500">Rooms</h2>
          <Link
            className="hover:underline flex gap-2"
            href={`/servers/${serverId}/settings`}
          >
            <Cog6ToothIcon className="w-6 h-6 text-gray-600" />
          </Link>
        </div>
        <div className="flex flex-col gap-1 pl-2">
          {serverRooms.map((room) => {
            return (
              <Link
                className="hover:underline flex gap-2"
                key={room.id}
                href={`/servers/${serverId}/rooms/${room.id}`}
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                <h3 className="font-medium text-lg">{room.name}</h3>
              </Link>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
}

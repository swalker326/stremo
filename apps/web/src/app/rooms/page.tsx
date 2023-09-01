import { getRooms } from "./_actions/rooms.actions";
// import { Socket, io } from "socket.io-client";
// import {
//   ClientToServerEvents,
//   CreateRoomPayload,
//   ServerToClientEvents
// } from "ws-server";
// import { CreateRoomButton } from "./_components/CreateRoomButton";
// import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "db";
import { redirect } from "next/navigation";

export default async function RoomsPage() {
  // const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  //   "ws://localhost:5000/"
  //   );
  const joinRoom = async (formData: FormData) => {
    "use server";
    const userId = (await formData.get("userId")) as string;
    const roomId = (await formData.get("roomId")) as string;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!user) {
      throw new Error("User not found");
    }
    if (!room) {
      throw new Error("Room not found");
    }
    await prisma.room.update({
      where: { id: roomId },
      data: { users: { connect: { id: user.id } } },
      include: { users: true }
    });
  };
  const createRoom = async (formData: FormData) => {
    "use server";
    const userId = (await formData.get("userId")) as string;
    const name = (await formData.get("name")) as string;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    const room = await prisma.room.create({
      data: { name: name || "New Room", users: { connect: { id: user.id } } },
      include: { users: true }
    });
    redirect(`/rooms/${room.id}`);
  };
  const user = await currentUser();

  const rooms = await getRooms();
  return (
    <div>
      <h1 className="text-4xl">Rooms</h1>
      <div>
        {rooms.map((room) => (
          <div key={room.id} className="flex gap-1 items-end">
            <h3 className="text-2xl">{room.name || room.id}</h3>
            <div>
              {room.users.length > 0 ? (
                room.users.map((u) => (
                  <div key={u.id} className="ml-2">
                    {u.email}
                  </div>
                ))
              ) : (
                <>Empty</>
              )}
            </div>
            <form action={joinRoom}>
              <input type="hidden" name="userId" value={user?.id} />
              <input type="hidden" name="roomId" value={room.id} />
              <button className="text-slate-800 rounded-md bg-orange-400 p-2" type="submit">
                Join
              </button>
            </form>
          </div>
        ))}
      </div>
      <form action={createRoom}>
        <div className="flex gap-1">
          <input type="hidden" name="userId" value={user?.id} />
          <input
            className="border border-slate-200 rounded-sm p-1"
            placeholder="Room name"
            type="text"
            name="name"
          />
          <button className="rounded-md bg-orange-400 p-2 drop-shadow-sm" type="submit">
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
}

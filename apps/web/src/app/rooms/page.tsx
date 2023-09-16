import { getServerAuthSession } from "auth/server";
import { getRooms } from "./_actions/rooms.actions";
import { prisma } from "db";
import { redirect } from "next/navigation";

export default async function RoomsPage() {
  const data = await getServerAuthSession();
  if (!data) {
    return null;
  }
  const { user } = data;
  const joinRoom = async (formData: FormData) => {
    "use server";
    const roomId = (await formData.get("roomId")) as string;
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    debugger;
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
    const name = (await formData.get("name")) as string;
    if (!user) {
      throw new Error("User not found");
    }
    const room = await prisma.room.create({
      data: { name: name || "New Room", users: { connect: { id: user.id } } },
      include: { users: true }
    });
    redirect(`/rooms/${room.id}`);
  };

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
              <button
                className="text-slate-800 rounded-md bg-orange-400 p-2"
                type="submit"
              >
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
          <button
            className="rounded-md bg-orange-400 p-2 drop-shadow-sm"
            type="submit"
          >
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
}

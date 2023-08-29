import prisma from "@/lib/prisma";

export default async function Room() {
  const rooms = await prisma.room.findMany({ include: { users: true } });
  return (
    <div>
      <h1>Rooms</h1>
      {rooms?.map((room) => (
        <div key={room.id}>
          <h2>{room.name}</h2>
          {room.users?.map((user) => (
            <div key={user.id}>
              <h2>{user.email}</h2>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

import { prisma } from "db";

export default async function ServerLayout({
  children,
  params: { serverId }
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  console.log("server layout", serverId);
  const getServerRooms = async () => {
    "server action";
    return await prisma.room.findMany({
      where: { serverId }
    });
  };
  return (
    <div className="flex">
      <>
        <h2>Rooms</h2>
        {(await getServerRooms()).map((room) => {
          return <div key={room.id}>{room.name}</div>;
        })}
      </>
      {children}
    </div>
  );
}

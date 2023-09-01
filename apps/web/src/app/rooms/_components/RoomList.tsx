import { getRooms } from "../_actions/rooms.actions";

export async function RoomList() {
  const rooms = await getRooms();
  return (
    <>
      {rooms.map((room) => {
        return <div key={room.id}>{room.name || room.id}</div>;
      })}
    </>
  );
}

import { getRoomById } from "../_actions/rooms.actions";

export default async function Room({ params }: { params: { roomId: string } }) {
  const room = await getRoomById(params.roomId);
  return <div>{room?.id}</div>;
}

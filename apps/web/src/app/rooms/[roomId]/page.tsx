import { prisma } from "db";
import { getRoomById } from "../_actions/rooms.actions";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export default async function Room({ params }: { params: { roomId: string } }) {
  const sendMessage = async (formData: FormData) => {
    "use server";
    const userId = (await formData.get("userId")) as string;
    const roomId = (await formData.get("roomId")) as string;
    const messageContent = (await formData.get("message")) as string;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!user) {
      throw new Error("User not found");
    }
    if (!room) {
      throw new Error("Room not found");
    }

    const message = await prisma.message.create({
      data: {
        message: messageContent,
        room: { connect: { id: room.id } },
        user: { connect: { id: user.id } }
      }
    });
    await prisma.room.update({
      where: { id: roomId },
      data: { messages: { connect: { id: message.id } } }
    });
    revalidatePath(`/rooms/${roomId}`);
  };
  const room = await getRoomById(params.roomId);
  const user = await currentUser();
  return (
    <div className="flex-col h-full">
      <h2>{room?.name || room?.id}</h2>
      <div className="flex flex-col h-full justify-between">
        <div className="flex-col">
          {room?.messages.map((message) => {
            return (
              <div key={message.id}>
                {message.user.email}: {message.message}
              </div>
            );
          })}
        </div>
        <form className="w-full" action={sendMessage}>
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="roomId" value={params.roomId} />
          <input
            className="p-2 border border-slate-800 rounded-md w-full"
            placeholder="Type something"
            type="text"
            name="message"
          />
        </form>
      </div>
    </div>
  );
}

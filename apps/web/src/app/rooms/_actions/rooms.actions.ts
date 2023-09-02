"use server";
import { prisma } from "db";
import { revalidatePath } from "next/cache";

export const getRoomById = (roomId: string, path?: string) => {
  const room = prisma.room.findUnique({
    where: { id: roomId },
    include: { users: true, messages: { include: { user: true } } }
  });
  if (path) {
    revalidatePath(path);
  }
  return room;
};

export const getRooms = async () => {
  return prisma.room.findMany({ include: { users: true } });
};

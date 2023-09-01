"use server";
import { prisma } from "db";
import { revalidatePath } from "next/cache";
import { Socket } from "socket.io-client";
import { CreateRoomPayload } from "ws-server";

export const getRoomById = (roomId: string) => {
  const room = prisma.room.findUnique({
    where: { id: roomId },
    include: { users: true }
  });
  return room;
};

export const getRooms = async () => {
  return prisma.room.findMany({ include: { users: true } });
};

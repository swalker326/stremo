"use server";

import { prisma } from "db";
import { SettingsSchema } from "~/app/_components/server/SettingsForm";

export async function getServersDetailsById(id: string | undefined) {
  return await prisma.server.findFirst({
    where: { id },
    include: { rooms: true }
  });
}

export async function updateServerRooms({
  id,
  data
}: {
  id: string | undefined;
  data: SettingsSchema;
}) {
  return await prisma.server.update({
    where: { id },
    data: { rooms: { create: data.rooms } }
  });
}

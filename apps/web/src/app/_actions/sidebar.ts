"use server";

import { prisma } from "db";

export async function getServersByUserId(id: string | undefined) {
  return await prisma.server.findMany({ where: { owner: { id } } });
}

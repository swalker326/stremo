"use server";

import { prisma } from "db";
import { User } from "db/types";

export const createUser = async (data: Omit<User, "id">) => {
  return prisma.user.create({ data });
};

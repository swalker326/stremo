"use server";

import prisma from "~/lib/prisma";
import { User } from "@prisma/client";

export const createUser = async (data: Omit<User, "id">) => {
  return prisma.user.create({ data });
};

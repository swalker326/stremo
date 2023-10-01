import { prisma } from "db";

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id
    }
  });
};

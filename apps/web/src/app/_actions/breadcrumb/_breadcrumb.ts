"use server";

import { prisma } from "db";

export default async function getBreadcrumb(
  link: string,
  pathNames: string[],
  index: number
) {
  let fetchedName = link;
  if (pathNames[index - 1] === "servers") {
    prisma.server
      .findUnique({
        where: {
          id: link
        }
      })
      .then((response) => {
        if (response?.name) fetchedName = response?.name;
      });
  }
  if (pathNames[index - 1] === "rooms") {
    prisma.room
      .findUnique({
        where: {
          id: link
        }
      })
      .then((response) => {
        if (response?.name) fetchedName = response?.name;
      });
  }
  return fetchedName;
}

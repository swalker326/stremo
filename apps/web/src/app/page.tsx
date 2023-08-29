import { UserButton } from "@clerk/nextjs";
import { prisma } from "~/lib/prisma";
import UserList from "./_components/UserList";
import { User } from "@prisma/client";
import { createUser } from "~/app/app.actions";

export default async function Home() {
  const users = await prisma.user.findMany({});
  const addUser = (data: Omit<User, "id">) => prisma.user.create({ data });
  return (
    <main className="flex min-h-screen flex-col p-24">
      <UserButton />
      <UserList users={users} addUser={createUser} />
    </main>
  );
}

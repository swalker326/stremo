import { prisma } from "db";
import { UserButton } from "@clerk/nextjs";
import UserList from "./_components/UserList";
import { User } from "db/types";

export default async function Home() {
  const users = await prisma.user.findMany({});
  return (
    <main className="flex min-h-screen flex-col p-24">
      <UserButton />
      <UserList users={users} />
    </main>
  );
}

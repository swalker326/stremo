import { prisma } from "db";
import { UserButton } from "@clerk/nextjs";
import UserList from "./_components/users/UserList";
import { io } from "socket.io-client";

export default async function Home() {
  const users = await prisma.user.findMany({});
  const socket = io("ws://localhost:5000/");

  return (
    <main className="flex min-h-screen flex-col p-24">
      <UserButton />
      <UserList users={users} />
    </main>
  );
}

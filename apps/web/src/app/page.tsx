import { prisma } from "db";
import UserList from "./_components/users/UserList";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col p-3 pb-0 h-full relative">
      <div
        id="right-section"
        className="self-end w-52 h-screen absolute -right-2.5 -top-2"
      >
        {/* <Discover />
        <Trending /> */}
      </div>
    </main>
  );
}

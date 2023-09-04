import { type User } from "db/types";
import Link from "next/link";

function Username({ user }: { user: User }) {
  return (
    <div key={user.id} className="flex p-3 justify-between">
      <div className="flex justify-between w-full items-center">
        <div>
          <h1>{user.userName}</h1>
        </div>
        <button className="bg-slate-200 p-2 text-slate-600 rounded-md hover:bg-slate-300">
          <Link href="/rooms">Join</Link>
        </button>
      </div>
    </div>
  );
}

export default function UserList({ users }: { users: User[] }) {
  return (
    <div className="flex flex-col shadow-sm h-full w-full bg-slate-200 shadow-slate-500">
      <h2 className="my-1 text-2xl pl-3">Users</h2>
      {users.map((user) => (
        <Username key={user.id} user={user} />
      ))}
    </div>
  );
}

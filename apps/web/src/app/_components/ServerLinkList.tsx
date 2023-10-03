import { Session } from "auth/server";
import { prisma } from "db";

export async function ServerLinkList({ user }: { user: Session["user"] }) {
  const getUserServers = async () => {
    "server action";
    return prisma.server.findMany({ where: { owner: { id: user.id } } });
  };
  return (
    <div>
      {(await getUserServers()).map((server) => {
        return <div key={server.id}>{server.name}</div>;
      })}
    </div>
  );
}

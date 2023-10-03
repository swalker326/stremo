import { getServerAuthSession } from "auth/server";
import { prisma } from "db";
import { redirect } from "next/navigation";

export default function ServerPage() {
  const createServer = async (formData: FormData) => {
    "use server";
    const session = await getServerAuthSession();
    if (!session) {
      redirect("/login");
    }
    const { user } = session;
    const name = (await formData.get("name")) as string;
    const isPublic = Boolean(await formData.get("isPublic"));
    const server = await prisma.server.create({
      data: {
        public: isPublic,
        name: name || "New Server",
        owner: { connect: { id: user.id } }
      }
    });
    redirect(`/servers/${server.id}`);
  };
  return (
    <div>
      <h1 className="text-4xl">Servers</h1>
      <div>
        <form action={createServer}>
          <input type="text" name="name" />
          <input type="checkbox" name="isPublic" />
          <button type="submit" className="border border-red-400">
            Create Server
          </button>
        </form>
      </div>
    </div>
  );
}

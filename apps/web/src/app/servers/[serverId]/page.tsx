export default function ServerHomePage({
  params: { serverId }
}: {
  params: { serverId: string };
}) {
  return (
    <div>
      <h1 className="text-4xl">Server</h1>
    </div>
  );
}

import { getUserById } from "./_actions";
export default async function ProfilePage({
  params
}: {
  params: { profileId: string };
}) {
  const { profileId } = params;
  const user = await getUserById(profileId);
  console.log(user);
  if (!user) {
    return <h1>User not found</h1>;
  }
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}

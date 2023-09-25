import { signIn } from "auth/react";
export default async function Page() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const userName = (await formData.get("username")) as string;
    const password = (await formData.get("password")) as string;
    await signIn();
  };
  return (
    <>
      <form action={handleSubmit}>
        <div className="flex flex-col gap-2">
          <input
            className="p-2 outline outline-slate-500 rounded-md"
            name="username"
          />
          <input
            className="p-2 outline outline-slate-500 rounded-md"
            name="password"
          />
          <button type="submit">Sign In</button>
        </div>
      </form>
    </>
  );
}

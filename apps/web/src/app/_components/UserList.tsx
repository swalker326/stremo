"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { createUser } from "~/app/app.actions";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" })
});

type Schema = z.infer<typeof schema>;

export default function UserList({ users }: { users:any }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: ""
    }
  });
  const onSubmit: SubmitHandler<Schema> = (data) => {
    createUser({ ...data, id: "replace_with_realThing", roomId: null });
  };
  const FormInput = ({
    field
  }: {
    field: "firstName" | "lastName" | "email";
  }) => {
    //convert "camelCase" to "Camel Case"
    const displayText = field.replace(/([A-Z])/g, " $1");
    const placeholder =
      displayText.charAt(0).toUpperCase() + displayText.slice(1);
    return (
      <div className="flex flex-col gap-0.5">
        <input
          className={`rounded-md h-10 px-0.5 border ${
            errors[field] ? "bg-red-200" : ""
          }}`}
          placeholder={placeholder}
          {...register(field)}
        />
        {errors[field] && (
          <span className="text-red-400 px-1 rounded-md">
            {errors[field]?.message ||
              `There was an unknown error with ${field}`}
          </span>
        )}
      </div>
    );
  };
  return (
    <div className="w-1/3">
      <h2 className="my-3 text-3xl">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 flex-col">
        <FormInput field={"firstName" as const} />
        <FormInput field={"lastName" as const} />
        <FormInput field={"email" as const} />
        <button
          className="rounded-md p-2 bg-slate-200 hover:bg-slate-300"
          type="submit"
        >
          Add Yourself
        </button>
      </form>
      <h2 className="my-3 text-3xl">Users</h2>
      {users.map((user: any) => {
        return (
          <div
            key={user.id}
            className="flex bg-slate-50 p-3 shadow-md mt-1 justify-between"
          >
            <div>
              <div className="flex gap-1">
                <h1>{user.firstName}</h1>
                <h1>{user.lastName}</h1>
              </div>
              <h1>{user.email}</h1>
            </div>
            <div className="flex gap-1">
              <button className="bg-slate-200 p-2 rounded-md hover:bg-slate-300">
                Add Friend
              </button>
              <button className="bg-slate-200 p-2 rounded-md hover:bg-slate-300">
                <Link href="/rooms">Join Room</Link>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SettingsSchema,
  settingsSchema
} from "../../servers/[serverId]/settings/page";

export const SettingsForm = ({
  data,
  onSubmit
}: {
  data: any;
  onSubmit: (data: SettingsSchema) => any;
}) => {
  console.log("!!!!", data);

  const { control, handleSubmit, register } = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: "",
      rooms: []
    },
    values: data
  });

  const { fields, append } = useFieldArray({
    control: control,
    name: "rooms"
  });

  return (
    <form
      className="p-10 bg-white w-full rounded-md drop-shadow-lg"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <div>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          {...register("name")}
        />
        <div className="relative border border-slate-200 border-dashed p-3 my-2 rounded-lg">
          <div className="flex justify-between items-center ">
            <h2 className="text-2xl p-1 py-3">Rooms</h2>
            <button
              className="float-right bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              type="button"
              onClick={() => append({ name: "" })}
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex pl-2 flex-col gap-3">
            {fields.map((field, index) => (
              <li className="list-none flex flex-col gap-2" key={field.id}>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register(`rooms.${index}.name` as const)}
                />
                <input
                  type="hidden"
                  {...register(`rooms.${index}.id` as const)}
                />
              </li>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="mt-12 py-2 px-4 bg-blue-500 rounded-lg text-white"
            type="submit"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

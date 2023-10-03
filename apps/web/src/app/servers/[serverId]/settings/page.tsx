"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  getServersDetailsById,
  updateServerRooms
} from "~/app/_actions/server/_server";
import {
  SettingsForm,
  SettingsSchema
} from "~/app/_components/server/SettingsForm";

type SettingsProps = { params: { serverId: string } };

export default function ServerSettings({
  params: { serverId }
}: SettingsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["server-settings", serverId],
    queryFn: async () => getServersDetailsById(serverId)
  });

  const formMutation = useMutation({
    mutationFn: async (data: {
      id: string | undefined;
      data: SettingsSchema;
    }) => updateServerRooms(data),
    onSuccess: () => {
      console.log("onSuccess fired");
      queryClient.invalidateQueries({
        queryKey: ["server-settings", serverId]
      });
      router.refresh();
    }
  });

  const onSubmit = (data: SettingsSchema) => {
    // data will have rooms and new rooms mixed together, the new rooms will not have an id though.
    // if the id is undefined, we know it's a new room
    // remove the rooms with id we don't create duplicate rooms.
    data.rooms = data.rooms
      .filter((room) => Boolean(!room.id))
      .map((r) => {
        delete r.id;
        return r;
      });
    formMutation.mutate({ id: serverId, data });
  };

  return (
    <div className="w-full px-10">
      <SettingsForm data={data} onSubmit={onSubmit} />
    </div>
  );
}

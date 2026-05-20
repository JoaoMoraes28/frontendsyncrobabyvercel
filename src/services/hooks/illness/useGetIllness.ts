import { useQuery } from "@tanstack/react-query";
import { getIllness } from "../../illness/illness.service";
import type { ResponseIllness } from "../../illness/illness.service";

export const useGetIllness = (child_id: number, canExecute: boolean) => {
  return useQuery<ResponseIllness>({
    queryKey: ["illness"],
    queryFn: async () => {
      return await getIllness(child_id);
    },
    enabled: canExecute,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getIllness } from "../../illness/illness.service";
import type { ResponseIllness } from "../../illness/illness.service";

export const useGetIllness = (child_id: number, canExecute: boolean) => {
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  return useQuery<ResponseIllness>({
    queryKey: ["illness", child_id],
    queryFn: async () => {
      await delay(700)
      return await getIllness(child_id);
    },
    enabled: canExecute,
  });
};

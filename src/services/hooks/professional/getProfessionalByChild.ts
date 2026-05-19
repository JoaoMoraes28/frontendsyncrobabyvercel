import { useQuery } from "@tanstack/react-query";
import { getProfessionals } from "../../professional/professional.service";
import type { ResponseProfessional } from "../../professional/professional.service";

export const useGetProfessionalsByChild = (
  childId: number,
  canExecute: boolean,
) => {
  return useQuery<ResponseProfessional>({
    queryKey: ["professional", "child", childId],
    queryFn: async () => {
      return await getProfessionals(childId);
    },
    enabled: canExecute,
  });
};

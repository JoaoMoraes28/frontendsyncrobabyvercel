import { useQuery } from "@tanstack/react-query";
import {
  getProfessionals,
  getProfessionalBySpecialization,
} from "../../professional/professional.service";
import type { ResponseProfessional } from "../../professional/professional.service";

export const useGetProfessionalBySpecialty = (
  specializationId: number,
  childId: number,
) => {
  return useQuery<ResponseProfessional>({
    queryKey: ["professional", "child", childId, "specialty", specializationId],
    queryFn: async () => {
      console.log(childId);
      if (specializationId === 0) {
        return await getProfessionals(childId);
      } else {
        return await getProfessionalBySpecialization(specializationId, childId);
      }
    },
  });
};

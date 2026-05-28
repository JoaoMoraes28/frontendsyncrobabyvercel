import { useQuery } from "@tanstack/react-query";
import type { ResponseGetVaccineStatus } from "../../vaccine/vaccine.service";
import { getVaccineByStatus } from "../../vaccine/vaccine.service";

export const useGetVaccineStatus = (status: number, id_child: number) => {
  return useQuery<ResponseGetVaccineStatus>({
    queryKey: ["vaccine", "status", status, "id_child", id_child],
    queryFn: async () => {
      return await getVaccineByStatus(status, id_child);
    }
  });
};
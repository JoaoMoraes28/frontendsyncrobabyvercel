import { useQuery } from "@tanstack/react-query";
import type { ResponseGetVaccineAgeGroup } from "../../vaccine/vaccine.service";
import { getVaccineByAgeGroup } from "../../vaccine/vaccine.service";

export const useGetVaccineAgeGroup = (id_child: number, age: number) => {
  return useQuery<ResponseGetVaccineAgeGroup>({
    queryKey: ["vaccine", "id_child", id_child, "age", age],
    queryFn: async () => {
      return await getVaccineByAgeGroup(id_child, age);
    }
  });
};
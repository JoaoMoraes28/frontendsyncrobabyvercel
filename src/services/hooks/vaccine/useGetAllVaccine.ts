import { useQuery } from "@tanstack/react-query";
import type { ResponseGetAllVaccine } from "../../vaccine/vaccine.service";
import { getAllVaccine } from "../../vaccine/vaccine.service";

export const useGetAllVaccine = () => {
    return useQuery<ResponseGetAllVaccine>({
      queryKey: ["vaccine"],
      queryFn: async () => {
        return await getAllVaccine ();
      }
    });
};
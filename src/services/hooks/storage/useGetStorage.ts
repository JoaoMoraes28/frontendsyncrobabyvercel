import { useQuery } from "@tanstack/react-query";
import { getProductsIdChild } from "../../storage/storage.service"; 
import type { ResponseGetStorage } from "../../storage/storage.service";

export const useGetStorage = (child_id: number) => {
  return useQuery<ResponseGetStorage>({
    queryKey: ["illness", child_id],
    queryFn: async () => {
      return await getProductsIdChild(child_id);
    },
    enabled: true,
  });
};

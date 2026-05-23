import { useQuery } from "@tanstack/react-query";
import { getProductsByType } from "../../product/product.service";
import type { ResponseProductsType } from "../../product/product.service"; 

export const useGetProductByType = (type_id: number | null) => {
  return useQuery<ResponseProductsType>({
    queryKey: ["product", type_id],
    queryFn: async () => {
      return await getProductsByType(type_id!);
    },
    enabled: !!type_id
  });
};
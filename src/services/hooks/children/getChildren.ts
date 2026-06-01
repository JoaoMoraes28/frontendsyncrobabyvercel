import { useQuery } from "@tanstack/react-query";
import { getChildren } from "../../children/children.service"
import type { ResponseChild } from "../../children/children.service";

export const useGetChildren = () => {
    return useQuery<ResponseChild>({
        queryKey: ['children'],
        queryFn: async () => {
            const response = await getChildren()
            return response
        }
    });
}
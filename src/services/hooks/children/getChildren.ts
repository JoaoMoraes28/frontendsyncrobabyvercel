import { useQuery } from "@tanstack/react-query";
import { getChildren } from "../../children/children.service"
import type { ResponseChild } from "../../children/children.service";

export const useGetChildren = () => {
    return useQuery<ResponseChild | string>({
            queryKey: ['children'],
            queryFn: async () => {
                try {
                    const response = await getChildren()
                    return response
                } catch (error) {
                    return "404: notFound"
                }
            }
        });
}
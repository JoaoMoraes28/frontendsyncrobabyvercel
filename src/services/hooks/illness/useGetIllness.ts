import { useQuery } from "@tanstack/react-query";
import { getIllness } from "../../illness/illness.service";
import type { ResponseIllness } from "../../illness/illness.service";

export const useGetIllness = (child_id: number) => {
    return useQuery<ResponseIllness | string>({
        queryKey: ['illness'],
        queryFn: async () => {
            try {
                const response = await getIllness(child_id)
                return response
            } catch (error) {
                return "404: notFound"
            }
        }
    });
}
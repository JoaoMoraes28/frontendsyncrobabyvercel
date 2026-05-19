import { useQuery } from "@tanstack/react-query";
import { getDiary } from "../../diary/diary.service";
import type { ResponseDiary } from "../../diary/diary.service";

export const useGetDiary = (child_id: number) => {
    return useQuery<ResponseDiary | string>({
        queryKey: ['diary'],
        queryFn: async () => {
            try {
                const response = await getDiary(child_id)
                return response
            } catch (error) {
                return "404: notFound"
            }
        }
    });
}
import { useQuery } from "@tanstack/react-query";
import { getDiary } from "../../diary/diary.service";
import type { ResponseDiary } from "../../diary/diary.service";

export const useGetDiary = (child_id: number) => {
    return useQuery<ResponseDiary>({
        queryKey: ['diary', child_id],
        queryFn: async () => {
            const response = await getDiary(child_id)
            return response

        }
    });
}
import { useQuery } from "@tanstack/react-query";
import { getDiary } from "../../diary/diary.service";
import type { ResponseDiary } from "../../diary/diary.service";

export const useGetDiary = (child_id: number) => {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    return useQuery<ResponseDiary>({
        queryKey: ['diary', child_id],
        queryFn: async () => {
            await delay(700)
            const response = await getDiary(child_id)
            return response

        }
    });
}
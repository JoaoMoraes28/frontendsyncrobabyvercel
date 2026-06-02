import { useQuery } from "@tanstack/react-query";
import { getDiaryId } from "../../diary/diary.service";
import type { ResponseDiary } from "../../diary/diary.service";

export const useGetDiaryId = (id_diary: number) => {
    return useQuery<ResponseDiary>({
        queryKey: ['singleDiary', id_diary],
        queryFn: async () => {
            const response = await getDiaryId(id_diary)
            return response
        }
    });
}
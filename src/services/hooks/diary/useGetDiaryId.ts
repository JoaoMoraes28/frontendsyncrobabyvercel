import { useQuery } from "@tanstack/react-query";
import { getDiaryId } from "../../diary/diary.service";
import type { ResponseDiary } from "../../diary/diary.service";

export const useGetDiaryId = (id_diary: number) => {
    return useQuery<ResponseDiary | string>({
        queryKey: ['singleDiary', id_diary],
        queryFn: async () => {
            try {
                const response = await getDiaryId(id_diary)
                return response
            } catch (error) {
                return "404: notFound"
            }
        }
    });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteDiary } from "../../diary/diary.service";

export const useDeleteDiary = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (diary_id: number) => deleteDiary(diary_id),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['diary_delete'] });

            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteDiary } from "../../diary/diary.service";
import { useNavigate } from "react-router-dom";

export const useDeleteDiary = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (diary_id: number) => deleteDiary(diary_id),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['diary_delete'] });
            navigate(-1)
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
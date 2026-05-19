import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateDiary } from "../../diary/diary.service";
import type { Diary } from "../../diary/diary.service"; 
import { useNavigate } from "react-router-dom";

export const useUpdateDiary = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data: Diary) => updateDiary(data, data.id_diary_note),

        onSuccess: (data) => {
            navigate(-1)
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
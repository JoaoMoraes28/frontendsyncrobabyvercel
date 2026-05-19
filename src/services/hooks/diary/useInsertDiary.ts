import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { insertDiary } from "../../diary/diary.service";
import type { InsertDiary } from "../../diary/diary.service";
import { useNavigate } from "react-router-dom";

export const useInsertDiary = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: InsertDiary) => insertDiary(data),

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
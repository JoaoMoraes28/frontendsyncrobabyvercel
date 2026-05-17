import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { insertIllness } from "../../illness/illness.service";
import type { InsertIllness } from "../../illness/illness.service";
import { useNavigate } from "react-router-dom";

export const useInsertIllness = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: InsertIllness) => insertIllness(data),

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
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { insertMeasures } from "../../measures/measures.service";
import type { InsertMeasures } from "../../measures/measures.service";
import { useNavigate } from "react-router-dom";

export const useInsertMeasures = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: InsertMeasures) => insertMeasures(data),

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
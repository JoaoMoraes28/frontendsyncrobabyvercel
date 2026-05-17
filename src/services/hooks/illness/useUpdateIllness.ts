import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateIllness } from "../../illness/illness.service";
import type { Illness } from "../../illness/illness.service"; 
import { useNavigate } from "react-router-dom";

export const useUpdateIllness = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data: Illness) => updateIllness(data, data.id_illness),

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
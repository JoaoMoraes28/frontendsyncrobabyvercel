import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { insertRegisterFeeding } from "../../routines/routines.service";
import type { RegisterFeeding } from "../../routines/routines.service";

export const useRegisterFeeding = () => {
    return useMutation({
        mutationFn: (data: RegisterFeeding) => insertRegisterFeeding(data),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
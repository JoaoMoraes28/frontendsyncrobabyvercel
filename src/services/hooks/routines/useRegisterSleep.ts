import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { insertRegisterSleep } from "../../routines/routines.service";
import type { RegisterSleep } from "../../routines/routines.service";
import { useNavigate } from "react-router-dom";

export const useRegisterSleep = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: RegisterSleep) => insertRegisterSleep(data),

        onSuccess: (data) => {
            alert("Registro feito!")
            navigate(-1)
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
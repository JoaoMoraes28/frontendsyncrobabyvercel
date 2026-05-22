import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { insertRegisterBath } from "../../routines/routines.service";
import type { RegisterBath } from "../../routines/routines.service";
import { useNavigate } from "react-router-dom";

export const useRegisterBath = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: RegisterBath) => insertRegisterBath(data),

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
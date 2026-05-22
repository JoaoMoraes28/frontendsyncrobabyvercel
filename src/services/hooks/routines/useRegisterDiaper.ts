import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { insertRegisterDiaper } from "../../routines/routines.service";
import type { RegisterDiaper } from "../../routines/routines.service";
import { useNavigate } from "react-router-dom";

export const useRegisterDiaper = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: RegisterDiaper) => insertRegisterDiaper(data),

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
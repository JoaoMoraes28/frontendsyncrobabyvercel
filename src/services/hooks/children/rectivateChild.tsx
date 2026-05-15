import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { reactivateChild } from "../../children/children.service"

export const onReactivateChild = () => {
    return useMutation({
        mutationFn: (idChild: number) => reactivateChild(idChild),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
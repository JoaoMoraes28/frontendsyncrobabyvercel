import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getChild } from "../../children/children.service"

export const onGetChild = () => {
    return useMutation({
        mutationFn: (idChild: number) => getChild(idChild),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
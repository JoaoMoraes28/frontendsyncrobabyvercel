import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deactivateChild } from "../../children/children.service"
import type { VerifyDesactivate } from "../../children/children.service"

export const onDeactivateChild = () => {
    return useMutation({
        mutationFn: (data: VerifyDesactivate) => deactivateChild(data.id_child, data),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
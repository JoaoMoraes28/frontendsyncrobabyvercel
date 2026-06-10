import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updatePassword } from "../../user/user.service";
import type { UpdatePassword } from "../../user/user.service"

export const usePasswordUser = () => {
    return useMutation({
        mutationFn: (data: UpdatePassword) => updatePassword(data),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
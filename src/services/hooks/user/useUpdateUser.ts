import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateUser } from "../../user/user.service";
import type { UpdateUser } from "../../user/user.service"

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: (data: UpdateUser) => updateUser(data),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updatePicture } from "../../user/user.service";

export const useUpdatePictureUser = () => {
    return useMutation({
        mutationFn: (data: FormData) => updatePicture(data),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
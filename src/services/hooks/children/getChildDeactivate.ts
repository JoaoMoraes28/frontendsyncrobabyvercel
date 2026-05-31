import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getChildDeactivate } from "../../children/children.service"

export const onGetChildDeactivate = () => {
    return useMutation({
        mutationFn: () => getChildDeactivate(),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
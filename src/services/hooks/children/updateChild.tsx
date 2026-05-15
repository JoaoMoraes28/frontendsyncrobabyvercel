import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateChild } from "../../children/children.service"
import type { UpdateChild } from "../../children/children.service"

export const onUpdateChild = () => {
    return useMutation({
        mutationFn: (data: UpdateChild) => updateChild(data, data.id_child),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
    });
}
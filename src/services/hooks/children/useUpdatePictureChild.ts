import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updatePictureChild } from "../../children/children.service"

export const useUpdatePictureChild = () => {
    return useMutation({
        mutationFn: ({ data, id_child }: { data: FormData, id_child: number }) => updatePictureChild(data, id_child),

        onSuccess: (data) => {
            return data
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
        },
        
    });
}
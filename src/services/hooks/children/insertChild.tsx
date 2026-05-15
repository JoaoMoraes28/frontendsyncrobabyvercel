import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { insertChild } from "../../children/children.service"
import type { InsertChild } from "../../children/children.service"
import { useNavigate } from "react-router-dom";

export const onInsertChild = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data: InsertChild) => insertChild(data),

        onSuccess: () => {
            alert("Filho adiconado com sucesso!")
            navigate(-1)
        },

        onError: (error: AxiosError) => {
            console.log("ERRO DA API:", error.response?.data);
            console.log("ERRO COMPLETO:", error);
            return error
        },
    });
}
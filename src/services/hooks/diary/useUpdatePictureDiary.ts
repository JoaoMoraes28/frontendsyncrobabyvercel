import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatPictureDiary } from "../../diary/diary.service";

export const useUpdatePictureDiary = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id_diary, data }: { id_diary: number, data: FormData }) => updatPictureDiary(id_diary, data),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["diary_image"] });
            return data;
        },

        onError: (error: Error) => {
            console.log("ERRO AO ATUALIZAR IMAGEM DO DIÁRIO:", error.message);
        },
    });
};
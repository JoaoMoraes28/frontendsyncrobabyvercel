import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDiary } from "../../diary/diary.service";
import type { InsertDiary } from "../../diary/diary.service";

export const useUpdateDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      idDiary,
    }: {
      data: InsertDiary;
      idDiary: number;
    }) => updateDiary(data, idDiary),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["diary"] });
      return data;
    },

    onError: (error: Error) => {
      console.log("ERRO AO ATUALIZAR DIÁRIO:", error.message);
    },
  });
};
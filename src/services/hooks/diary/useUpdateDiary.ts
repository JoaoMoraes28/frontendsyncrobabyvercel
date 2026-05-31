import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateDiary } from "../../diary/diary.service";

export const useUpdateDiary = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      formData,
      idDiary,
    }: {
      formData: FormData;
      idDiary: number;
    }) => updateDiary(formData, idDiary),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["diary"] });
      navigate(-1)
      return data;
    },

    onError: (error: Error) => {
      console.log("ERRO AO ATUALIZAR DIÁRIO:", error.message);
    },
  });
};
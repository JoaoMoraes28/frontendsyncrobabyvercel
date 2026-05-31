import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { insertDiary } from "../../diary/diary.service";

export const useInsertDiary = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => insertDiary(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["diary"] });
      navigate(-1)
      return data;
    },

    onError: (error: Error) => {
      console.log("ERRO AO INSERIR DIÁRIO:", error.message);
    },
  });
};
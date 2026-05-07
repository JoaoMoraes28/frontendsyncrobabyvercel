import { useMutation } from "@tanstack/react-query";
import { registerService, type RegisterData } from "../../auth/auth.service";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterData) => registerService(data),

    onSuccess: () => {
      navigate("/login");
    },

    onError: (error: AxiosError) => {
      console.log("ERRO DA API (Cadastro):", error.response?.data);
      console.log("ERRO COMPLETO:", error);
    },
  });
};

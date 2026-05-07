import { useMutation } from "@tanstack/react-query";
import { loginService, type LoginData } from "../../auth/auth.service";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginData) => loginService(data),

    onSuccess: (data) => {
      const token = data.response.user[0].token;
      localStorage.setItem("@App:token", token);
      navigate("/home");
    },

    onError: (error: AxiosError) => {
      console.log("ERRO DA API:", error.response?.data);
      console.log("ERRO COMPLETO:", error);
    },
  });
};

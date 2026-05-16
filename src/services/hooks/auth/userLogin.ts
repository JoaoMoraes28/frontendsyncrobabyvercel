import { useMutation } from "@tanstack/react-query";
import { loginService, type LoginData } from "../../auth/auth.service";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginData) => loginService(data),

    onSuccess: (data) => {
      const dataStorage = data.user[0]

      const token = dataStorage.token;
      const user_name = dataStorage.guardian_name
      const id_guardian = dataStorage.id_guardian
      const email = dataStorage.email
      const picture = dataStorage.profile_picture
      localStorage.setItem("@App:token", token);
      localStorage.setItem("user_name", user_name);
      localStorage.setItem("user_id_guardian", id_guardian.toString());
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_photo", picture);
      navigate("/home");
    },

    onError: (error: AxiosError) => {
      console.log("ERRO DA API:", error.response?.data);
      console.log("ERRO COMPLETO:", error);
    },
  });
};

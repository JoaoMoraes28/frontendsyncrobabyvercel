import { AuthLayout } from "../../../layouts/AuthLayout";
import WelcomeBar from "../../../layouts/WelcomeBar";
import { AuthHeader } from "../components/AuthHeader";
import { Authcard } from "../components/AuthCard";
import BtnPrimary from "../../../components/BtnPrimary";
import { InputDefault } from "../../../components/InputDefault";
import { InputPassword } from "../components/InputPassword";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export function Register() {
  const inputStyle = [
    "w-full bg-white text-gray-medium placeholder:text-gray-placeholder py-3 px-6 rounded-2xl outline-none transition-all shadow-purple-sm focus:ring-2 focus:ring-accent focus:shadow-md md:py-6 md:px-9",
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassWord, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleToMain = (e: FormEvent) => {
    e.preventDefault();
    if (
      email === "teste@syncrobaby.com" &&
      password === "12345" &&
      confirmPassWord === "12345" &&
      name === "syncrobaby"
    ) {
      navigate("/home");
    } else {
      alert("Email ou senha incorretos! Tente: teste@sincrobaby.com / 12345");
    }
  };

  return (
    <AuthLayout leftContent={<WelcomeBar />} headerContent={<AuthHeader />}>
      <Authcard title="Criar Conta">
        <form onSubmit={handleToMain} className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4 md:gap-6">
            <InputDefault
              placeholder="Nome completo"
              type="text"
              className={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputDefault
              placeholder="Email"
              type="email"
              className={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputPassword
              placeholder="Senha"
              className={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputPassword
              placeholder="Confirmar senha"
              className={inputStyle}
              value={confirmPassWord}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Link
              to="/login"
              className="underline font-semi-bold w-full text-center font-nunito text-sm md:text-lg mt-2"
            >
              Já tem uma conta? Entre aqui
            </Link>
          </div>

          <BtnPrimary
            text="Cadastrar"
            type="submit"
            className="bg-accent text-white font-poppins shadow-md hover:shadow-lg transition-shadow md:py-4 md:text-2xl mt-4"
            onClick={() => console.log("Cadastro tentado")}
          />
        </form>
      </Authcard>
    </AuthLayout>
  );
}

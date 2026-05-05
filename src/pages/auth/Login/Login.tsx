import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthLayout } from "../../../layouts/AuthLayout";
import WelcomeBar from "../../../layouts/WelcomeBar";

import { AuthHeader } from "../components/AuthHeader";
import { Authcard } from "../components/AuthCard";
import { InputDefault } from "../../../components/InputDefault";
import { InputPassword } from "../components/InputPassword";
import BtnPrimary from "../../../components/BtnPrimary";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const inputStyle = [
    "w-full bg-white text-gray-medium placeholder:text-gray-placeholder py-3 px-6 rounded-2xl outline-none transition-all shadow-purple-sm focus:ring-2 focus:ring-accent focus:shadow-md md:py-6 md:px-9",
  ];

  const handleToMain = (e: FormEvent) => {
    e.preventDefault();
    if (email === "teste@syncrobaby.com" && senha === "12345") {
      navigate("/home");
    } else {
      alert("Email ou senha incorretos! Tente: teste@sincrobaby.com / 12345");
    }
  };

  return (
    <AuthLayout leftContent={<WelcomeBar />} headerContent={<AuthHeader />}>
      <Authcard title="Entre">
        <form onSubmit={handleToMain} className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-6">
            <InputDefault
              placeholder="Email"
              className={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex flex-col gap-2">
              <InputPassword
                value={senha}
                className={inputStyle}
                onChange={(e) => setSenha(e.target.value)}
              />

              <Link
                to="/reset-password"
                className="self-end text-sm font-nunito font-semibold text-gray-medium hover:text-accent transition-colors md:text-base"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <BtnPrimary
              text="Entrar"
              type="submit"
              className="bg-accent text-white font-poppins shadow-md hover:shadow-lg transition-shadow md:py-4 md:text-2xl"
            />

            <Link
              to="/register"
              className="underline font-semi-bold w-full text-center font-nunito text-sm text-gray-medium hover:text-accent transition-colors md:text-lg"
            >
              Não tem uma conta? Crie aqui
            </Link>
          </div>
        </form>
      </Authcard>
    </AuthLayout>
  );
}

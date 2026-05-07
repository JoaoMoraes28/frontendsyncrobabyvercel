import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../../services/hooks/auth/userLogin";

import { AuthLayout } from "../../../layouts/AuthLayout";
import WelcomeBar from "../../../layouts/WelcomeBar";

import { AuthHeader } from "../components/AuthHeader";
import { Authcard } from "../components/AuthCard";
import { InputDefault } from "../../../components/InputDefault";
import { InputPassword } from "../components/InputPassword";
import BtnPrimary from "../../../components/BtnPrimary";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: handleLoginAPI, isPending } = useLogin();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    api: "",
  });
  const inputStyle = [
    "w-full bg-white text-gray-medium placeholder:text-gray-placeholder py-3 px-6 rounded-2xl outline-none transition-all shadow-purple-sm focus:ring-2 focus:ring-accent focus:shadow-md md:py-6 md:px-9",
  ];

  const handleBlur = (field: "email" | "password", value: string) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, [field]: "Este campo é obrigatório." }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    setErrors((prev) => ({ ...prev, api: "" }));

    if (!email || !password) {
      setErrors((prev) => ({
        ...prev,
        email: !email ? "Este campo é obrigatório." : prev.email,
        password: !password ? "Este campo é obrigatório." : prev.password,
      }));
      return;
    }

    handleLoginAPI(
      { email, password },
      {
        onError: () => {
          setErrors((prev) => ({
            ...prev,
            api: "Email ou senha incorretos! Tente novamente.",
          }));
        },
      },
    );
  };

  return (
    <AuthLayout leftContent={<WelcomeBar />} headerContent={<AuthHeader />}>
      <Authcard title="Entre">
        <form onSubmit={onSubmit} className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-6">
            {/* Campo de Email */}
            <div className="flex flex-col gap-1">
              <InputDefault
                placeholder="Email"
                className={`${inputStyle} ${errors.email ? "border-2 border-red-500" : ""}`}
                value={email}
                maxLength={255}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                onBlur={() => handleBlur("email", email)}
              />
              {errors.email && (
                <span className="text-sm text-red-500 font-medium px-2">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Campo de Senha */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <InputPassword
                  value={password}
                  className={`${inputStyle} ${errors.password ? "border-2 border-red-500" : ""}`}
                  maxLength={15}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  onBlur={() => handleBlur("password", password)}
                />
                {/* Span de erro da Senha */}
                {errors.password && (
                  <span className="text-sm text-red-500 font-medium px-2">
                    {errors.password}
                  </span>
                )}
              </div>

              <Link
                to="/reset-password"
                className="self-end text-sm font-nunito font-semibold text-gray-medium hover:text-accent transition-colors md:text-base"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {/* Span de erro da API (Credenciais incorretas) */}
            {errors.api && (
              <span className="text-center text-red-500 font-bold bg-lilas py-2 rounded-lg italic">
                {errors.api}
              </span>
            )}

            <BtnPrimary
              text="Entrar"
              type="submit"
              disabled={isPending}
              className="bg-accent text-white font-poppins shadow-md hover:shadow-lg transition-shadow md:py-4 md:text-2xl disabled:opacity-70"
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

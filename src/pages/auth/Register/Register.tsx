import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../../services/hooks/auth/userRegister";
import { AuthLayout } from "../../../layouts/AuthLayout";
import WelcomeBar from "../../../layouts/WelcomeBar";
import { AuthHeader } from "../components/AuthHeader";
import { Authcard } from "../components/AuthCard";
import BtnPrimary from "../../../components/BtnPrimary";
import { InputDefault } from "../../../components/InputDefault";
import { InputPassword } from "../components/InputPassword";

export function Register() {
  const inputStyle = [
    "w-full bg-white text-gray-medium placeholder:text-gray-placeholder py-3 px-6 rounded-2xl outline-none transition-all shadow-purple-sm focus:ring-2 focus:ring-accent focus:shadow-md md:py-6 md:px-9",
  ];

  const [guardian_name, setGuardian_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassWord, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    guardian_name: "",
    email: "",
    password: "",
    confirmPassWord: "",
    api: "",
  });

  const { mutate: handleRegisterAPI, isPending } = useRegister();

  const handleBlur = (field: string, value: string) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, [field]: "Este campo é obrigatório." }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    setErrors((prev) => ({ ...prev, api: "" }));

    let hasError = false;
    const newErrors = {
      guardian_name: "",
      email: "",
      password: "",
      confirmPassWord: "",
      api: "",
    };

    if (!guardian_name) {
      newErrors.guardian_name = "Este campo é obrigatório.";
      hasError = true;
    }
    if (!email) {
      newErrors.email = "Este campo é obrigatório.";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "Este campo é obrigatório.";
      hasError = true;
    }

    if (!confirmPassWord) {
      newErrors.confirmPassWord = "Este campo é obrigatório.";
      hasError = true;
    } else if (password !== confirmPassWord) {
      newErrors.confirmPassWord = "As senhas não coincidem.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    handleRegisterAPI(
      { email, guardian_name, password },
      {
        onError: () => {
          setErrors((prev) => ({
            ...prev,
            api: "Erro ao criar conta. Verifique os dados e tente novamente.",
          }));
        },
      },
    );
  };

  return (
    <AuthLayout leftContent={<WelcomeBar />} headerContent={<AuthHeader />}>
      <Authcard title="Criar Conta">
        <form onSubmit={onSubmit} className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Nome Completo */}
            <div className="flex flex-col gap-1">
              <InputDefault
                placeholder="Nome completo"
                type="text"
                className={`${inputStyle} ${errors.guardian_name ? "border-2 border-red-500" : ""}`}
                value={guardian_name}
                maxLength={150}
                onChange={(e) => {
                  setGuardian_name(e.target.value);
                  setErrors((prev) => ({ ...prev, guardian_name: "" }));
                }}
                onBlur={() => handleBlur("guardian_name", guardian_name)}
              />
              {errors.guardian_name && (
                <span className="text-sm text-red-500 font-medium px-2">
                  {errors.guardian_name}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <InputDefault
                placeholder="Email"
                type="email"
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

            {/* Senha */}
            <div className="flex flex-col gap-1">
              <InputPassword
                placeholder="Senha"
                className={`${inputStyle} ${errors.password ? "border-2 border-red-500" : ""}`}
                value={password}
                maxLength={15}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                onBlur={() => handleBlur("password", password)}
              />
              {errors.password && (
                <span className="text-sm text-red-500 font-medium px-2">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Confirmar Senha */}
            <div className="flex flex-col gap-1">
              <InputPassword
                placeholder="Confirmar senha"
                className={`${inputStyle} ${errors.confirmPassWord ? "border-2 border-red-500" : ""}`}
                value={confirmPassWord}
                maxLength={15}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, confirmPassWord: "" }));
                }}
                onBlur={() => handleBlur("confirmPassWord", confirmPassWord)}
              />
              {errors.confirmPassWord && (
                <span className="text-sm text-red-500 font-medium px-2">
                  {errors.confirmPassWord}
                </span>
              )}
            </div>

            <Link
              to="/login"
              className="underline font-semi-bold w-full text-center font-nunito text-sm md:text-lg mt-2"
            >
              Já tem uma conta? Entre aqui
            </Link>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {/* Span de erro da API */}
            {errors.api && (
              <span className="text-center text-red-500 font-bold bg-red-100 py-2 rounded-lg">
                {errors.api}
              </span>
            )}

            <BtnPrimary
              text="Cadastrar"
              type="submit"
              disabled={isPending}
              className="bg-accent text-white font-poppins shadow-md hover:shadow-lg transition-shadow md:py-4 md:text-2xl disabled:opacity-70"
            />
          </div>
        </form>
      </Authcard>
    </AuthLayout>
  );
}

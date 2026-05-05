import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../../../layouts/AuthLayout";
import WelcomeBar from "../../../layouts/WelcomeBar";
import { AuthHeader } from "../components/AuthHeader";
import { Authcard } from "../components/AuthCard";
import BtnPrimary from "../../../components/BtnPrimary";
import { InputDefault } from "../../../components/InputDefault";
import { InputPassword } from "../components/InputPassword";

export function ResetPassword() {
  const navigate = useNavigate();

  const inputStyle = [
    "w-full bg-white text-gray-medium placeholder:text-gray-placeholder py-3 px-6 rounded-2xl outline-none transition-all shadow-purple-sm focus:ring-2 focus:ring-accent focus:shadow-md md:py-6 md:px-9",
  ];

  return (
    <AuthLayout leftContent={<WelcomeBar />} headerContent={<AuthHeader />}>
      <Authcard title="Recupere sua senha">
        <div className="flex flex-col gap-4 md:gap-6">
          <InputDefault
            placeholder="E-mail"
            type="email"
            className={inputStyle}
          />

          <InputPassword placeholder="Nova Senha" className={inputStyle} />

          <InputPassword
            placeholder="Confirme sua senha"
            className={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:gap-6 md:mt-8">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex-1 bg-white text-darker-purple font-poppins font-bold py-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 md:py-4 md:text-xl"
          >
            Cancelar
          </button>

          <BtnPrimary
            text="Alterar senha"
            className="flex-1 bg-accent text-white font-poppins shadow-md hover:shadow-lg transition-shadow md:py-4 md:text-xl"
            onClick={() => console.log("Tentativa de alteração de senha")}
          />
        </div>
      </Authcard>
    </AuthLayout>
  );
}

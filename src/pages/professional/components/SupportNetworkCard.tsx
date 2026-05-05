import CheckIcon from "../../../assets/checkIcon.svg?react";
import BtnPrimary from "../../../components/BtnPrimary";
import { useNavigate } from "react-router-dom";

export function SupportNetworkCard() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex-col gap-4 font-poppins hidden xl:flex">
      {/* Header e Botão */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-primary-text">
          Rede de Apoio
        </h1>
        <BtnPrimary
          text="Adicionar profissional"
          className="bg-accent flex justify-center items-center text-white font-poppins font-bold text-lg max-w-[65%] max-h-10 text-center lg:w-auto lg:px-6 rounded-xl shadow-md cursor-pointer hover:opacity-90 active:scale-95 transition-all"
          onClick={() => {
            navigate("/add-pediatrician");
          }}
        />
      </div>

      {/* Card Principal */}
      <div className="relative overflow-hidden rounded-2xl border border-accent bg-lilas backdrop-blur-md shadow-purple-md p-4  flex flex-col md:flex-row gap-6 items-center transition-all duration-300 hover:shadow-[0_0_45px_rgba(168,85,247,0.25)]">
        <div className="flex shrink-0">
          <div className="w-16 h-16 bg-white rounded-full shadow-[0_6px_15px_rgba(0,0,0,0.08)] flex items-center justify-center">
            <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center">
              <CheckIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-primary-text font-poppins">
            Seus Profissionais de Confiança
          </h2>
          <p className="text-primary/80 leading-relaxed text-sm md:text-base font-medium font-nunito">
            Tudo o que a saúde da sua família precisa, organizado em um só
            lugar: acesse o histórico completo das consultas com nossos
            especialistas validados e tenha a tranquilidade de acompanhar cada
            etapa do desenvolvimento de quem você ama, com segurança e
            praticidade.
          </p>
        </div>
      </div>
    </div>
  );
}

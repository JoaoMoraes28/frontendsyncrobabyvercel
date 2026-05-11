import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import BtnPrimary from "../../../components/BtnPrimary";
import { InputDefault } from "../../../components/InputDefault";
import NavigationBar from "../../../layouts/NavigationBar";
import { listIcons } from "../../../layouts/MainLayout";
import PerfilHeader from "../../../layouts/Perfil";

import bellIcon from "../../../assets/notifications.svg";
import backIcon from "../../../assets/BackIcon.svg";
import logoutIcon from "../../../assets/logoutIcon.svg";

import { inputClassName } from "../../routines/RoutineFeeding";
import Header from "../../../layouts/Header";

interface ChildData {
  name: string;
  birthDate: string;
  weight?: string;
  height?: string;
}

export function AddChildPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChildData>();

  function handleAddChild(data: ChildData) {
    console.log("Filho(a) adicionado(a):", data);
    navigate("/");
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-light xl:pb-0 xl:flex-row">
      {/* Header Mobile*/}
      <div className="xl:hidden w-full">
        <Header />
      </div>
      <PerfilHeader user_name="Pedro" />

      <main className="flex-1 flex flex-col items-center justify-start w-full px-6 relative pt-5 pb-8">
        <div className="hidden xl:flex justify-between items-center w-full mb-1">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full text-white"
          >
            <img src={backIcon} alt="Voltar" className="w-8 h-8" />
          </button>

          <div className="flex gap-6 items-center">
            <button onClick={() => navigate("/")}>
              <img src={logoutIcon} alt="Sair" className="w-8 h-8" />
            </button>
            <button>
              <img
                src={bellIcon}
                alt="Notificações"
                className="w-8 h-8 text-gray-800"
              />
            </button>
          </div>
        </div>

        <div className="w-full max-w-[90%] xl:max-w-2xl bg-lilas rounded-4xl px-6 py-8 md:py-12 relative mx-auto my-auto flex flex-col items-center shadow-purple-md">
          <div className="w-36 h-36 rounded-full border-[3px] border-primary bg-transparent flex items-center justify-center mb-8 xl:w-48 xl:h-48 cursor-pointer hover:bg-white/40 transition-colors">
            <span className="text-primary text-6xl font-light xl:text-8xl">
              +
            </span>
          </div>

          <form
            onSubmit={handleSubmit(handleAddChild)}
            className="flex flex-col w-full justify-between gap-4 xl:gap-6 "
          >
            {/* Campos do Formulário */}
            <div className="flex flex-col w-full">
              <InputDefault
                id="name"
                type="text"
                placeholder="Nome*"
                className={`${inputClassName} bg-white`}
                {...register("name", { required: "O nome é obrigatório" })}
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1 px-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-full">
              <InputDefault
                id="birthDate"
                type="date"
                placeholder="Data de Nascimento*"
                className={`${inputClassName} bg-white `}
                {...register("birthDate", {
                  required: "A data de nascimento é obrigatória",
                })}
              />
              {errors.birthDate && (
                <span className="text-red-500 text-xs mt-1 px-1">
                  {errors.birthDate.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-full">
              <InputDefault
                id="weight"
                type="text"
                placeholder="Peso"
                className={`${inputClassName} bg-white`}
                {...register("weight")}
              />
            </div>

            <div className="flex flex-col w-full mb-4">
              <InputDefault
                id="height"
                type="text"
                placeholder="Altura"
                className={`${inputClassName} bg-white`}
                {...register("height")}
              />
            </div>

            {/* Container dos Botões */}
            <div className="flex flex-col gap-3 mt-2 md:mt-6 xl:mt-4 xl:flex-row-reverse xl:justify-center">
              <BtnPrimary
                type="submit"
                text="Adicionar filho(a)"
                className="w-full bg-accent text-white rounded-xl py-3 font-bold hover:bg-accent-dark transition-all md:py-4 xl:w-1/2"
              />

              <button
                type="button"
                className="w-full bg-white text-primary-text rounded-xl py-3 md:py-4 font-bold shadow-sm hover:bg-gray-50 transition-all xl:w-1/2"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>

      <div className="xl:hidden fixed bottom-0 w-full bg-light">
        <NavigationBar listIcons={listIcons} />
      </div>
    </div>
  );
}

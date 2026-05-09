import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import BtnPrimary from "../../components/BtnPrimary";
import { InputDefault } from "../../components/InputDefault";
import Header from "../../layouts/Header";
import NavigationBar from "../../layouts/NavigationBar";
import { listIcons } from "../../layouts/MainLayout";
import PerfilHeader from "../../layouts/Perfil";

import cameraIcon from "../../assets/cameraIcon.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import bellIcon from "../../assets/notifications.svg";
import backIcon from "../../assets/BackIcon.svg";

import { inputClassName, labelClassName } from "../routines/RoutineFeeding";

interface UserData {
  name: string;
  email: string;
  password?: string;
}

export function PerfilPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      name: "Pedro Henrique Araújo",
      email: "pedroh.araujo67@gmail.com",
    },
  });

  function handleSave(data: UserData) {
    console.log("Dados atualizados:", data);
    setIsEditing(false);
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row w-full min-h-screen bg-light">
      <div className="xl:hidden w-full">
        <Header />
      </div>
      <PerfilHeader user_name="Pedro" />

      <main className="flex-1 flex flex-col items-center justify-center w-full relative py-8 xl:py-0 font-nunito">
        <div className="hidden xl:flex justify-between items-center w-full absolute top-10 left-0 px-16">
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

        <div className="w-full max-w-[90%] xl:max-w-2xl bg-lilas rounded-4xl px-6 py-8 md:max-w-[90%] md:py-12 relative shadow-purple-md mx-auto">
          <button
            className="xl:hidden absolute top-4 right-4 text-purple-600 hover:text-purple-800 transition-colors"
            onClick={() => navigate("/")}
          >
            <img src={logoutIcon} alt="Sair" className="w-6 h-6" />
          </button>

          <div className="flex justify-center xl:hidden mb-3">
            <div className="w-32 h-32 rounded-full border-2 border-purple-300 bg-white flex items-center justify-center relative overflow-hidden md:w-40 md:h-40 xl:w-60 xl:h-60">
              <img
                src={cameraIcon}
                alt="Mudar foto"
                className="w-10 h-10 opacity-60 md:w-15 md:h-15 xl:w-25 xl:h-25"
              />
            </div>
          </div>

          <h3 className="hidden xl:block text-4xl font-black text-indigo-950 mb-10">
            Seus Dados
          </h3>

          <form
            onSubmit={handleSubmit(handleSave)}
            className="flex flex-col w-full justify-between md:gap-6 lg:gap-8"
          >
            {/* Campos do Formulário */}
            <div className="flex flex-col">
              <label htmlFor="name" className={`xl:hidden ${labelClassName}`}>
                Nome
              </label>
              <div className="flex flex-col">
                <InputDefault
                  id="name"
                  type="text"
                  className={`${inputClassName} bg-white xl:py-4 xl:text-lg rounded-xl`}
                  disabled={!isEditing}
                  {...register("name", { required: "O nome é obrigatório" })}
                />
              </div>
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className={`xl:hidden ${labelClassName}`}>
                E-mail
              </label>
              <InputDefault
                id="email"
                type="email"
                className={`${inputClassName} bg-white xl:py-4 xl:text-lg rounded-xl`}
                disabled={!isEditing}
                {...register("email", {
                  required: "O e-mail é obrigatório",
                  pattern: { value: /^\S+@\S+$/i, message: "E-mail inválido" },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className={`xl:hidden ${labelClassName}`}
              >
                Senha
              </label>
              <InputDefault
                id="password"
                type="password"
                placeholder="***********"
                className={`${inputClassName} bg-white xl:py-4 xl:text-lg rounded-xl`}
                disabled={!isEditing}
                {...register("password")}
              />
            </div>

            {/* Container dos Botões */}
            <div className="flex flex-col gap-2 mt-4 md:gap-5 md:mt-10 xl:justify-center xl:gap-8 xl:mt-8 xl:flex-row-reverse">
              <div className="xl:w-1/2">
                {isEditing ? (
                  <BtnPrimary
                    type="submit"
                    text="Salvar alterações"
                    className="w-full bg-accent text-white rounded-xl py-3 font-bold hover:bg-purple-700 transition-all shadow-md md:py-4"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="w-full bg-accent text-white xl:bg-primary xl:text-white xl:border-none rounded-xl py-3 md:py-4 font-bold hover:opacity-90 transition-all shadow-md"
                  >
                    Editar Perfil
                  </button>
                )}
              </div>

              <button
                type="button"
                className="w-full bg-white text-purple-700 border border-purple-200  xl:text-primary-text xl:border-none xl:w-1/2 rounded-xl py-3 md:py-4 font-bold shadow-md hover:opacity-90 transition-all"
                onClick={() => console.log("Excluir conta")}
              >
                Excluir Perfil
              </button>
            </div>
          </form>
        </div>
      </main>

      <div className="xl:hidden">
        <NavigationBar listIcons={listIcons} />
      </div>
    </div>
  );
}

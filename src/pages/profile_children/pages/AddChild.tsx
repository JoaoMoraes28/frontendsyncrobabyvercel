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
import Male from "../../../assets/profileChildren/male.svg";
import Fem from "../../../assets/profileChildren/fem.svg";

import { inputClassName } from "../../routines/RoutineFeeding";
import Header from "../../../layouts/Header";

import { onInsertChild } from "../../../services/hooks/children/insertChild";
import { useState } from "react";

interface ChildData {
  name: string;
  birthDate: string;
  weight?: string;
  height?: string;
  photo: string
  gender: string
}

interface Genders {
  id: string
  gender: string
  opposite: string
}

const genderList: Genders[] = [
  {
    id: "male",
    gender: Male,
    opposite: "female"
  },
  {
    id: "female",
    gender: Fem,
    opposite: "male"
  }
]

export function AddChildPage() {
  const navigate = useNavigate();

  const { mutate: handleRegisterAPI } = onInsertChild();

  const [photo, setPhoto] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChildData>();

  const [genderSelected, setGenderSelected] = useState<string>("male")

  function generatePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setPhoto(URL.createObjectURL(e.target.files[0]))
    }
  }


  function handleAddChild(data: ChildData) {
    handleRegisterAPI(
      {
        child_name: data.name,
        height: Number(data.height),
        weight: Number(data.weight),
        blood_type: "",
        gender: genderSelected,
        photo: photo,
        birth_date: data.birthDate
      },
      {
        onError: (error: any) => {
          const message = error.response?.data?.message
          alert(message)
        },
      },
    );
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
          <ul className="absolute left-6 top-6">
            {genderList.map((gender) => (
              <li key={gender.id} className={`w-14 h-14 ${genderSelected != gender.id ? 'hidden' : 'flex'}`}>
                <button onClick={() => setGenderSelected(gender.opposite)} className="rounded-full w-full h-full">
                  <img src={gender.gender} alt="Gênero da criança." className="w-8 h-auto" />
                </button>
              </li>
            ))}
          </ul>
          <div className="w-36 h-36 rounded-full border-[3px] border-primary bg-transparent flex items-center justify-center mb-8 xl:w-48 xl:h-48 cursor-pointer hover:bg-white/40 transition-colors">
            <label htmlFor="fileImage" className={`text-primary text-center w-full h-full flex justify-center items-center rounded-full text-6xl font-light xl:text-8xl ${photo == "" ? "pb-4 xl:pb-8" : ""}`}>
              {photo == "" ? (<span>+</span>) : (<img src={photo} alt="Foto selecionada." className="w-full h-full object-center object-cover rounded-full" />)}
            </label>
            <input onChange={(e) => generatePhoto(e)} type="file" id="fileImage" className="hidden" />
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
                type="number"
                placeholder="Peso(Kg)"
                className={`${inputClassName} bg-white`}
                {...register("weight")}
              />
            </div>

            <div className="flex flex-col w-full mb-4">
              <InputDefault
                id="height"
                type="number"
                placeholder="Altura(cm)"
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

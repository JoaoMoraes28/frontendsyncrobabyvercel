import { useLocation } from "react-router-dom";

import Databar from "../pages/perfil/components/DataBar.tsx";
import { InputDefault } from "../components/InputDefault.tsx";

import ProfilePicture from "../assets/profileChildren/profilePicture.svg";

import type { UseFormRegisterReturn } from "react-hook-form";
import type { DataChild } from "../pages/profile_children/ProfileChildren.tsx";

export interface Props {
  child?: DataChild;
  readonly?: boolean;
  setGenderSelected?: (gender: string) => void;
  genderSelected?: string;
  register_name?: UseFormRegisterReturn;
  user_name?: string;
}

function Perfil({
  child,
  register_name,
  readonly,
  genderSelected,
  setGenderSelected,
  user_name,
}: Props) {
  const location = useLocation();

  return (
    <aside className="hidden xl:flex xl:flex-col xl:z-99 xl:items-center xl:w-1/3 xl:min-w-136 xl:h-screen xl:pt-8 xl:rounded-tr-2xl xl:rounded-br-2xl xl:bg-primary">
      <h1 className="xl:w-full xl:pl-18 xl:font-semibold xl:text-[4.2rem] xl:text-darker-purple">
        SYNCROBABY
      </h1>
      <h3 className="xl:flex xl:items-center xl:justify-center xl:full xl:mt-1">
        {location.pathname == "/profile-children" ? (
          <InputDefault
            readOnly={readonly}
            {...register_name}
            className={`xl:w-[77%] xl:pl-2 xl:text-[3.1rem] xl:text-text-primary xl:font-bold ${readonly ? "" : "xl:bg-white xl:rounded-xl"}`}
          />
        ) : (
          <span className="text-primary-text">
            Olá {user_name ? user_name : "usuário"}
          </span>
        )}
      </h3>
      <img
        src={ProfilePicture}
        alt="Foto do perfil do usuário logado."
        className="xl:w-84 xl:h-84 xl:mt-10 xl:rounded-full xl:border-5 xl:border-lilas"
      />
      <div
        className={`${location.pathname == "/profile-children" ? "xl:flex" : "xl:hidden"} xl:flex xl:justify-center xl:items-center xl:w-full xl:h-42 xl:mt-4`}
      >
        <Databar
          setGenderSelected={setGenderSelected}
          genderSelected={genderSelected}
          child={child}
          readonly={readonly}
        />
      </div>
    </aside>
  );
}

export default Perfil;

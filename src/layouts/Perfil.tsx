import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Databar from "../pages/perfil/components/DataBar.tsx";
import { InputDefault } from "../components/InputDefault.tsx";

import type { DataChild } from "../pages/profile_children/ProfileChildren.tsx";

import Profile from "../assets/profileChildren/profilePicture.svg"

export interface Props {
  child?: DataChild;
  readonly?: boolean;
  setGenderSelected?: (gender: string) => void;
  genderSelected?: string;
  register_name?: string;
  set_register_name?: (text: string) => void;
  previewImg?: (e: React.ChangeEvent<HTMLInputElement>) => void
  preview?: string
}

function Perfil({
  child,
  register_name,
  set_register_name,
  readonly,
  genderSelected,
  setGenderSelected,
  previewImg,
  preview
}: Props) {
  const location = useLocation();
  
  return (
    <aside className="hidden xl:flex xl:flex-col xl:z-99 xl:items-center xl:w-1/3 xl:min-w-136 xl:h-screen xl:pt-8 xl:bg-primary">
      <h1 className="xl:w-full xl:pl-18 xl:font-semibold xl:text-[4.2rem] xl:text-darker-purple">
        SYNCROBABY
      </h1>
      <h3 className="xl:flex xl:w-full xl:items-center xl:justify-center xl:full xl:mt-1">
        {location.pathname == "/profile-children" ? (
          <InputDefault
            readOnly={readonly}
            value={register_name}
            onChange={(e) => {
              set_register_name ? set_register_name(e.target.value) : ""
            }}
            className={`xl:w-[77%] xl:pl-2 xl:text-[3.1rem] xl:text-text-primary xl:font-bold ${readonly ? "" : "xl:bg-white xl:rounded-xl"}`}
          />
        ) : (
          <span className="xl:w-[77%] xl:pl-2 xl:text-[3.1rem] xl:text-text-primary xl:font-bold">
            Olá {localStorage.getItem("user_name") ? localStorage.getItem("user_name") : "usuário"}
          </span>
        )}
      </h3>
      {location.pathname == "/profile-children" ? (
        <div>
          <label htmlFor={!readonly ? "imgChild" : ""}>
            <img
              src={preview ? preview : Profile}
              alt="Foto do perfil do usuário logado."
              className="xl:w-84 xl:h-84 xl:mt-10 xl:rounded-full xl:border-5 xl:object-cover xl:object-center xl:border-lilas-dark"
            />
          </label>
          <input onChange={(e) => {
            previewImg ? previewImg(e) : ""
          }} type="file" id="imgChild" className="hidden" />
        </div>
      ) : (
        <div>
          <label htmlFor={readonly ? "imgUser" : ""}>
            <img
              src={preview ? preview : Profile}
              alt="Foto do perfil do usuário logado."
              className="xl:w-84 xl:h-84 xl:mt-10 xl:rounded-full xl:border-5 xl:object-cover xl:object-center xl:border-lilas-dark"
            />
          </label>
          <input onChange={(e) => {
            previewImg ? previewImg(e) : ""
          }} type="file" id="imgUser" className="hidden" />
        </div>
      )}
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

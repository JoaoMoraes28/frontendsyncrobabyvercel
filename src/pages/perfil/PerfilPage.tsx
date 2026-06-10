import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import BtnPrimary from "../../components/BtnPrimary";
import { InputDefault } from "../../components/InputDefault";
import Header from "../../layouts/Header";
import NavigationBar from "../../layouts/NavigationBar";
import { listIcons } from "../../layouts/MainLayout";
import PerfilHeader from "../../layouts/Perfil";
import Date from "../../utils/Date";

import cameraIcon from "../../assets/cameraIcon.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import Profile from "../../assets/navigation/profileHeader.svg";
import DisableChild from "../../assets/disableChild.svg"
import Search from "../../assets/search.svg"
import Close from "../../assets/closeGray.svg"

import { inputClassName, labelClassName } from "../routines/RoutineFeeding";

import { useUpdateUser } from "../../services/hooks/user/useUpdateUser";
import { useGetUser } from "../../services/hooks/user/useGetUser";
import type { UpdateUser } from "../../services/user/user.service";
import { useUpdatePictureUser } from "../../services/hooks/user/useUpdatePictureUser";
import { useGetNotificationChild } from "../../services/hooks/notification/useGetNotificationChild";
import type { Notification } from "../../services/notification/notification.service";
import { onGetChildDeactivate } from "../../services/hooks/children/getChildDeactivate";
import { onReactivateChild } from "../../services/hooks/children/rectivateChild";
import type { Children } from "../../services/children/children.service";
import { usePasswordUser } from "../../services/hooks/user/useUpdatePassword";

import { LoadingBaby } from "../../components/LoadingBaby";

interface UserData {
  name: string;
  email: string;
  password?: string;
  new_password?: string
}

export function PerfilPage() {
  const idChild: number = Number(localStorage.getItem("select_child"))
  const { data: useGetChildrenDeactivate, isLoading, isError } = onGetChildDeactivate()
  const { mutate: useReactivateChild } = onReactivateChild()
  const { mutate: onUpdatePass } = usePasswordUser()

  const { data: onGetNotificationChild } = useGetNotificationChild(idChild)
  const { mutate: onUpdateUser } = useUpdateUser()
  const { mutate: onUpdatePictureUser } = useUpdatePictureUser()
  const { data: onGetUserData, refetch } = useGetUser()

  const navigate = useNavigate();
  const [openModal, setOPenModal] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [preview, setPreview] = useState<string | null>(localStorage.getItem("user_photo") == undefined
    || localStorage.getItem("user_photo") == null
    || localStorage.getItem("user_photo") == "null"
    || localStorage.getItem("user_photo") == "" ?
    Profile : localStorage.getItem("user_photo"))
  const [photoFile, setPhotoFile] = useState<File | string>("")
  const [editPhoto, setEditPhoto] = useState<boolean>(false)
  const [valueInput, setInputValue] = useState<string>()
  const [children, setChidren] = useState<Children[]>([])
  const [childrenFilter, setChildreFilter] = useState<Children[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserData>({
    defaultValues: {
      name: localStorage.getItem("user_name") ?? "",
      email: localStorage.getItem("user_email") ?? "",
    }
  });

  function handleSave(data: UserData) {
    const newData: UpdateUser = {
      guardian_name: data.name,
      email: data.email
    }

    if (editPhoto) {
      const formData = new FormData()
      formData.append("profile_picture", photoFile)

      onUpdatePictureUser(
        formData,
        {
          onSuccess: () => {
            refetch()

          }, onError: () => {
            alert("Erro ao atualizar foto")
          }
        }
      )
    }

    if (data.password) {
      if (data.new_password) {
        onUpdatePass(
          {
            current_password: data.password,
            new_password: data.new_password
          },
          {
            onSuccess: () => {
              alert("Senha alterada com sucesso!")
            }, onError: () => {
              alert("Erro ao alterar senha!")
            }
          }
        )
      } else {
        alert("Digite sua nova senha!")

      }

    }

    onUpdateUser(
      newData,
      {
        onSuccess: (response) => {
          alert("Alterações salvas!")
          reset({
            name: response.user.guardian_name,
            email: response.user.email
          })
          localStorage.setItem("user_name", response.user.guardian_name);
          localStorage.setItem("user_email", response.user.email);
        }
      }
    )
    setIsEditing(false);
  }

  const handleEditClick = (e: React.MouseEvent) => {
    setEditPhoto(false)
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  function onChangePreview(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setEditPhoto(true)
      setPhotoFile(e.target.files[0])
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  function filterChild(text: string) {
    const newData: Children[] = children.filter(it => it.child_name.toLowerCase().includes(text.toLowerCase()))
    setChildreFilter(newData)
  }

  function reactivateChild(id: number) {
    useReactivateChild(
      id,
      {
        onSuccess: () => {
          alert("Filho ativado com sucesso!")
          setOPenModal(false)
          const newData: Children[] = children.filter(it => it.id_child != id)
          setChidren(newData)
          setChildreFilter(newData)

        }, onError: () => {
          alert("Erro ao ativar filho!")
        }
      }
    )
  }

  useEffect(() => {
    if (!onGetUserData) {
      return
    }

    if (onGetUserData) {
      setPreview(onGetUserData.user[0].profile_picture)
      localStorage.setItem("user_photo", onGetUserData.user[0].profile_picture)
    }
  }, [onGetUserData])

  useEffect(() => {
    if (!onGetNotificationChild) {
      return
    }

    if (onGetNotificationChild) {
      setNotifications(onGetNotificationChild.notification)
    }
  }, [onGetNotificationChild])

  useEffect(() => {
    if (!useGetChildrenDeactivate) {
      return
    }

    if (useGetChildrenDeactivate) {
      setChildreFilter(useGetChildrenDeactivate.children)
      setChidren(useGetChildrenDeactivate.children)
    }
  }, [useGetChildrenDeactivate])

  return (
    <div className="flex flex-col xl:flex-row w-full min-h-screen bg-light">
      <div>
        <Header notification={notifications} />
      </div>
      <PerfilHeader previewImg={onChangePreview} preview={preview!} readonly={isEditing} />
      <div className={`fixed flex items-center justify-center font-nunito bg-black/50 backdrop-blur-sm w-full h-full z-91 top-0 ${openModal ? "block" : "hidden"}`}>
        <section className="flex flex-col w-[95%] h-[60%] bg-white rounded-xl p-6
        md:w-[75%]
        xl:w-[30%]">
          <header className="flex items-center justify-between">
            <div className="flex gap-1 flex-col">
              <h4 className="text-black font-bold text-xl">Perfis inativos</h4>
              <span className="text-gray-600 font-semibold">Selecione um perfil para reativar.</span>
            </div>
            <button onClick={() => setOPenModal(false)}>
              <img src={Close} alt="Fecha o modal de filhos inativos." className="w-auto h-8" />
            </button>
          </header>
          <div className="flex items-center mt-8 gap-2 pl-2 w-full h-10 rounded-lg shadow-purple-sm">
            <img aria-hidden="true" src={Search} alt="" className="w-auto h-4.5" />
            <InputDefault onChange={(e) => {
              setInputValue(e.target.value)
              filterChild(e.target.value)
            }} value={valueInput} placeholder="Pesquisar perfil..." />
          </div>
          {isLoading && !isError && <LoadingBaby text="Procurando perfis desativados" />}

          {!isLoading && isError &&
            <p className="text-[12px] text-red-error">Erro ao carregar perfis!</p>
          }

          {!isLoading && !isError && childrenFilter.length == 0 &&
            <p className="flex grow justify-center pt-34 text-primary-text font-semibold">Nenhum perfil desativado encontrado!</p>
          }

          {!isLoading && !isError && childrenFilter.length > 0 &&
            <ul className="flex flex-col grow gap-2 pt-2">
              {useGetChildrenDeactivate?.children.map((child) => (
                <li key={child.id_child} className="flex justify-between items-center w-full h-20">
                  <img src={child.photo == "" ? Profile : child.photo} alt="Foto de perfil da criança."
                    className="object-cover object-center w-15 h-15 rounded-full"
                  />
                  <div className="flex flex-col grow justify-center pl-3">
                    <p className="text-accent font-semibold">{child.child_name}</p>
                    <p className="font-semibold text-lilas-dark text-[14px]">{Date.subYearsFormated(child.birth_date)} ano(s)</p>
                  </div>
                  <button onClick={() => reactivateChild(child.id_child)} className="text-accent font-semibold">
                    Reativar
                  </button>
                </li>
              ))}
            </ul>
          }
        </section>
      </div>
      <main className="flex-1 flex flex-col items-center justify-center gap-4 w-full relative py-8 xl:py-0 font-nunito
      xl:space-y-20">
        <div className="hidden xl:flex justify-end items-center w-full absolute top-25 left-0 px-19">
          <button onClick={() => {
            const answer = confirm("Você deseja sair de sua conta?")
            if (answer) {
              localStorage.clear()
              navigate("/")
            }
          }}>
            <img src={logoutIcon} alt="Sair" className="w-8 h-8" />
          </button>
        </div>

        <div className="w-full max-w-[90%] xl:max-w-2xl bg-lilas rounded-4xl px-6 py-8 md:max-w-[90%] md:py-12 relative shadow-purple-md mx-auto">
          <button
            className="xl:hidden absolute top-4 right-4 text-purple-600 hover:text-purple-800 transition-colors"
            onClick={() => {
              const answer = confirm("Você deseja sair de sua conta?")
              if (answer) {
                localStorage.clear()
                navigate("/")
              }
            }}
          >
            <img src={logoutIcon} alt="Sair" className="w-6 h-6" />
          </button>

          <div className="flex justify-center xl:hidden mb-3">
            <div className="w-32 h-32 rounded-full border-2 border-purple-300 bg-white relative overflow-hidden md:w-34 md:h-34 xl:w-60 xl:h-60">
              <label htmlFor={isEditing ? "imgUser" : ""} className="w-full h-full rounded-full flex items-center justify-center">
                <img
                  src={preview == "null" || preview == "" || preview == undefined ? cameraIcon : preview}
                  alt="Mudar foto"
                  className={`object-cover object-center md:w-full md:h-full xl:w-25 xl:h-25 ${preview == "null" || preview == "" ? "w-10 h-10 opacity-60 " : "w-full h-full"}`}
                />
              </label>
              <input onChange={(e) => onChangePreview(e)} id="imgUser" type="file" className="hidden" />
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
                className={`${labelClassName}`}
              >
                Senha atual
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

            <div className="flex flex-col">
              <label
                htmlFor="newPassword"
                className={`${labelClassName}`}
              >
                Nova senha
              </label>
              <InputDefault
                id="newPassword"
                type="password"
                placeholder="***********"
                className={`${inputClassName} bg-white xl:py-4 xl:text-lg rounded-xl`}
                disabled={!isEditing}
                {...register("new_password")}
              />
            </div>

            {/* Container dos Botões */}
            <div className="flex flex-col gap-2 mt-4 md:gap-5 md:mt-6 xl:justify-center xl:gap-8 xl:mt-8 xl:flex-row-reverse">
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
        <div className="flex justify-center items-center w-full h-15
        xl:-mb-30">
          <div className="flex h-15 gap-2 items-center">
            <img aria-hidden="true" src={DisableChild} alt="" className="w-auto h-10" />
            <button onClick={() => setOPenModal(true)} className="underline text-black text-[16px] font-semibold">Filhos desativados</button>
          </div>
        </div>
      </main>
      <div className="xl:hidden">
        <NavigationBar listIcons={listIcons} />
      </div>
    </div>
  );
}

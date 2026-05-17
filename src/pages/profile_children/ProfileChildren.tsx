import Header from "../../layouts/Header";
import Perfil from "../../layouts/Perfil";

import { InputDefault } from "../../components/InputDefault";

import Date from "../../utils/Date";
import ConvertImg from "../../utils/DownloadImg"

import ProfilePicture from "../../assets/profileChildren/profilePicture.svg";
import EditIcon from "../../assets/editIcon.svg";
import Cancel from "../../assets/profileChildren/cancel.svg";
import Confirm from "../../assets/profileChildren/confirm.svg";
import exportIcon from "../../assets/exportIcon.svg";
import DateBirth from "../../assets/profileChildren/date.svg";
import Weight from "../../assets/profileChildren/weight.svg";
import Height from "../../assets/profileChildren/height.svg";
import Vaccine from "../../assets/profileChildren/vaccine.svg";
import Sick from "../../assets/profileChildren/sick.svg";
import Blood from "../../assets/profileChildren/blood.svg";
import Male from "../../assets/profileChildren/male.svg";
import Fem from "../../assets/profileChildren/fem.svg";
import AtributesProfile from "./components/AtributesProfile";
import NavigationBar from "../../layouts/NavigationBar";
import Trash from "../../assets/routines/trashPurple.svg"

import { listIcons } from "../../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import BtnPrimary from "../../components/BtnPrimary";

import { useGetChild } from "../../services/hooks/children/getChild";
import { useUpdateChild } from "../../services/hooks/children/updateChild";
import type { Children } from "../../services/children/children.service";
import type { UpdateChild } from "../../services/children/children.service";

import { useDeactivateChild } from "../../services/hooks/children/deactivateChild";
import type { VerifyDesactivate } from "../../services/children/children.service";

export interface ListDescription {
  title: string;
  img: string;
  value?: string;
  aria?: string;
  path?: string;
}

interface FormChild {
  child_name: string;
  gender: string;
  birth_date: string;
  blood_type: string;
}

export interface DataChild {
  id_child: number
  child_name: string
  height: number
  weight: number
  birth_date: string
  BMI: null | number
  blood_type: string
  gender: string
  photo: string
  active: number
  fk_id_guardian: number
  vaccine?: string
  sick?: string
}

function ProfileChildren() {
  const { mutate: onDeleteChild } = useDeactivateChild()

  const idChild: number = Number(localStorage.getItem("select_child"))
  const { data: childData } = useGetChild(idChild)
  const { mutate: updateChild } = useUpdateChild()
  const refProfile = useRef<HTMLDivElement | null>(null)

  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [preview, setPreview] = useState<string>("")
  const [descriptionItems, setDescriptionItems] = useState<ListDescription[]>([
    {
      title: "Data de nascimento:",
      img: DateBirth,
    },
    {
      title: "Peso:",
      img: Weight,
      aria: "Redireciona para a tela de registro de peso.",
      path: "/update-measures",
    },
    {
      title: "Altura:",
      img: Height,
      aria: "Redireciona para a tela de registro de altura.",
      path: "/update-measures",
    },
    {
      title: "Vacinação:",
      img: Vaccine,
      aria: "Redireciona para a tela de vacinação.",
      path: "/vaccines",
    },
    {
      title: "Enfermidades:",
      img: Sick,
      aria: "Redireciona para a tela de enfermidades.",
      path: "/health",
    },
    {
      title: "Tipo sanguíneo:",
      img: Blood,
    },
  ]);
  const [dataChildren, setDataChildren] = useState<Children>({
    child_name: "",
    gender: "",
    BMI: 0,
    birth_date: "",
    weight: 0,
    height: 0,
    blood_type: "",
    active: 0,
    fk_id_guardian: 0,
    id_child: 0,
    photo: ""
  });
  const [onlyRead, setOnlyRead] = useState<boolean>(true);
  const [genderSelected, setGenderSelected] = useState<string>(
    dataChildren.gender
  );

  const { register, handleSubmit, setValue, getValues, reset } = useForm<FormChild>({
    defaultValues: {
      child_name: "",
      birth_date: "",
      blood_type: "",
    }
  });

  const { register: deleteRegister, handleSubmit: deleteSubmit, formState: { errors } } = useForm<VerifyDesactivate>({

  });

  useEffect(() => {
    if (childData?.children && childData.children.length > 0) {
      const newData: Children = {
        ...childData.children[0],
        birth_date: childData.children[0].birth_date.split("T")[0],
        height: Math.round(childData.children[0].height)
      }

      setGenderSelected(newData.gender);
      setDataChildren(newData);
      setArrayData(newData);

      reset({
        child_name: newData.child_name,
        birth_date: newData.birth_date,
        blood_type: newData.blood_type,
      });
      setPreview(newData.photo)
    }
  }, [childData, reset])

  if (!childData?.children || childData.children.length === 0) {
    return (
      <div></div>
    )
  }

  function setArrayData(data: Children) {
    const newData: DataChild = data
    const newArray: ListDescription[] = descriptionItems.map((it) => {
      if (it.title == "Data de nascimento:") {
        it.value = Date.formatedDate(newData.birth_date);
      } else if (it.title == "Peso:") {
        it.value = `${newData.weight} Kg`;
      } else if (it.title == "Altura:") {
        it.value = `${newData.height} cm`;
      } else if (it.title == "Vacinação:") {
        if (newData.vaccine != null || newData.vaccine != undefined) {
          it.value = newData.vaccine;
        } else {
          it.value = "Nenhuma vacina aplicada";
        }
      } else if (it.title == "Enfermidades:") {
        if (newData.sick != null || newData.sick != undefined) {
          it.value = newData.sick;
        } else {
          it.value = "Nenhuma enfermidade";
        }
      } else if (it.title == "Tipo sanguíneo:") {
        it.value = newData.blood_type;
      }
      return it;
    });
    setDescriptionItems(newArray);
  }

  function sendDatas(data: FormChild) {
    const newObject: UpdateChild = { ...data, gender: genderSelected, id_child: idChild, photo: preview };
    updateChild(
      newObject,
      {
        onSuccess: (response) => {
          alert("Alterações salvas!")
          const newData: UpdateChild = response.response
          const newChildren: Children = {
            child_name: newData.child_name,
            gender: newData.gender,
            BMI: dataChildren.BMI,
            birth_date: newData.birth_date,
            weight: dataChildren.weight,
            height: dataChildren.height,
            blood_type: newData.blood_type,
            active: dataChildren.active,
            fk_id_guardian: dataChildren.fk_id_guardian,
            id_child: newData.id_child,
            photo: preview
          }
          setDataChildren(newChildren)
        }
      }
    )
  }

  function previewImg(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  function cancelChanges() {
    setValue("child_name", dataChildren.child_name);
    setValue("birth_date", dataChildren.birth_date);
    setValue("blood_type", dataChildren.blood_type);
    setGenderSelected(dataChildren.gender);
    setOnlyRead(true);
  }

  function deleteChild(data: VerifyDesactivate) {
    if (getValues("child_name") != data.child_name) {
      alert("Nome incorreto. Tente novamente!")

    } else {
      onDeleteChild(
        { child_name: data.child_name, id_child: idChild },
        {
          onSuccess: (response) => {
            alert("Criança desativada!")
          },
          onError: (error) => {
            console.log(error)
          }
        }
      )
    }

  }

  return (
    <div
      className="flex w-screen h-screen pt-24 pb-22
        md:pb-28
        xl:pt-0 xl:pb-0 xl:relative"
    >
      <div className="xl:">
        <Header />
      </div>
      <Perfil
        register_name={register("child_name")}
        genderSelected={genderSelected}
        setGenderSelected={setGenderSelected}
        readonly={onlyRead}
        child={dataChildren}
      />

      <form
        onSubmit={deleteSubmit(deleteChild)}
        className={`absolute flex justify-center items-center top-[calc(50%-110px)] z-60 w-full h-50 ${deleteModal ? 'flex' : 'hidden'}`}>
        <div className="flex flex-col items-center w-[90%] bg-lilas-bg h-full rounded-xl justify-evenly font-poppins">
          <span className="text-primary-text font-semibold">Deseja desativar esta criança?</span>
          <span className="text-[14px] text-primary-darker">Ela poderá ser reativada no menu de filhos</span>
          <InputDefault {...deleteRegister("child_name", { required: "Campo obrigatório!" })} placeholder="Digite o nome da criança..." className="pl-2 text-primary bg-white rounded-sm w-[80%] h-8" />
          {errors.child_name &&
            <p className="text-red-600/70 text-sm font-nunito">{errors.child_name.message}</p>}
          <div className="w-full flex justify-center gap-12">
            <BtnPrimary onClick={() => setDeleteModal(false)} type="button" text="Cancelar" className="bg-white" />
            <BtnPrimary type="submit" text="Confirmar" className="bg-accent text-white" />
          </div>
        </div>
      </form>

      <div
        className="flex w-full h-full relative
            xl:justify-center xl:items-center xl:pt-10 bg-light"
      >
        <div className={`absolute bg-black/50 backdrop-blur-sm w-full h-full z-40 ${deleteModal ? "block" : "hidden"}`}></div>
        <form
          onSubmit={handleSubmit(sendDatas)}
          className="flex flex-col w-full h-full pb-2 overflow-y-auto px-6
                md:px-14
                xl:bg-lilas xl:w-[85%] xl:h-[80%] xl:max-w-340 xl:max-h-250 xl:py-6 xl:space-y-0 xl:rounded-2xl xl:shadow-purple-md"
        >
          <h2 className="hidden xl:block xl:-ml-7 xl:font-poppins xl:text-darker-purple xl:font-extrabold xl:text-[3.3rem]">
            Seus Dados
          </h2>
          <div className="flex justify-between items-start
          xl:hidden">
            <button type="button" onClick={() => ConvertImg.DownloadElement(refProfile.current!, 'profile-child')}>
              <img
                src={exportIcon}
                alt="Gera um arquivo com os dados da criança."
                className="mt-2 w-auto h-5"
              />
            </button>
            <label htmlFor={onlyRead ? "" : "img"} className="rounded-full w-40 h-40 border-2 border-lilas-dark">
              <img src={preview == "" ? ProfilePicture : preview} alt="Foto de perfil da criança." className=" object-cover object-center rounded-full w-full h-full" />
            </label>
            <input onChange={(e) => previewImg(e)} type="file" id="img" className="hidden" />
            <div className="relative flex w-4 h-6">
              <button
                onClick={cancelChanges}
                type="button"
                className={`absolute top-2 right-9 w-4 h-4 scale-140 ${onlyRead ? "hidden" : "block"}`}
              >
                <img
                  src={Cancel}
                  alt="Cancela as alterações no modo editar."
                  className="w-full h-full"
                />
              </button>
              <button
                onClick={() => setOnlyRead(!onlyRead)}
                type={onlyRead ? "submit" : "button"}
                className="absolute"
              >
                <img
                  src={onlyRead ? EditIcon : Confirm}
                  alt="Habilita a edição dos dados da criança."
                  className="mt-2 w-auto h-4"
                />
              </button>
            </div>
          </div>
          <div ref={refProfile} className="flex flex-col justify-between grow gap-4">
            <div
              className="w-full
                      xl:hidden"
            >
              <div className="relative">
                <h3 className="flex justify-center items-center font-poppins text-primary-text font-bold text-3xl w-full h-20">
                  <InputDefault
                    readOnly={onlyRead}
                    {...register("child_name")}
                    className={`w-[75%] text-center ${onlyRead ? "" : "border-2 border-primary rounded-lg"}`}
                  />
                </h3>
                <button onClick={() => setDeleteModal(true)} type="button" className="absolute top-[calc(50%-13px)] right-0">
                  <img src={Trash} alt="" className="w-auto h-6" />
                </button>
              </div>
              <section className="flex items-center w-full h-20 font-poppins font-semibold text-primary-text border rounded-lg bg-white border-primary shadow-purple-sm">
                <div className="flex justify-center items-center gap-3 w-1/3 h-[70%]">
                  <button
                    onClick={() => setGenderSelected("male")}
                    type="button"
                    className={`flex justify-center items-center w-12 h-12 rounded-lg ${genderSelected == "male" && !onlyRead ? "bg-lilas/80 border border-primary" : ""} ${dataChildren.gender == "male" || !onlyRead ? "flex" : "hidden"}`}
                  >
                    <img
                      src={Male}
                      alt="Gênero masculino."
                      className="w-auto h-7"
                    />
                  </button>
                  <button
                    onClick={() => setGenderSelected("female")}
                    type="button"
                    className={`flex justify-center items-center w-12 h-12 rounded-lg ${genderSelected == "female" && !onlyRead ? "bg-lilas/80 border border-primary" : ""} ${dataChildren.gender == "female" || !onlyRead ? "flex" : "hidden"}`}
                  >
                    <img
                      src={Fem}
                      alt="Gênero feminino."
                      className="w-auto h-8.5"
                    />
                  </button>
                </div>
                <span className="flex justify-center items-center w-1/3 h-[70%] text-lg border-x border-primary">{`${Date.subYearsFormated(dataChildren.birth_date)} anos`}</span>
                <span className="flex justify-center items-center w-1/3 h-[70%] text-lg">
                  IMC: {dataChildren.BMI}
                </span>
              </section>
            </div>
            <dl className="flex flex-col justify-center gap-2 w-full grow">
              {descriptionItems.map((it) => (
                <AtributesProfile
                  key={it.title}
                  date_birth={register("birth_date")}
                  blood_type={register("blood_type")}
                  listDescription={it}
                  onlyRead={onlyRead}
                />
              ))}
            </dl>
          </div>
          <div className="hidden xl:flex xl:justify-between xl:w-full">
            <BtnPrimary
              onClick={cancelChanges}
              type="button"
              text="Cancelar"
              className="xl:bg-white xl:w-2/5 xl:max-w-90 xl:h-12 xl:font-semibold xl:-ml-7 xl:shadow-purple-md"
            />
            <BtnPrimary
              onClick={() => setOnlyRead(!onlyRead)}
              type={onlyRead ? "submit" : "button"}
              text={onlyRead ? "Editar" : "Salvar"}
              className={`xl:w-1/3 xl:max-w-76 xl:h-12 xl:font-semibold xl:text-white xl:shadow-purple-md ${onlyRead ? "xl:bg-primary" : "xl:bg-primary-darker"}`}
            />
          </div>
        </form>
      </div>
      <div className="fixed xl:hidden">
        <NavigationBar listIcons={listIcons} />
      </div>
      <button type="button" onClick={() => ConvertImg.DownloadElement(refProfile.current!, 'profile-child')}>
        <img src={exportIcon} alt="" className="hidden xl:block xl:absolute xl:bottom-2 xl:right-11 xl:w-14 xl:h-14 xl:z-40" />
      </button>
    </div>
  );
}

export default ProfileChildren;

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

import { listIcons } from "../../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import BtnPrimary from "../../components/BtnPrimary";

export interface ListDescription {
  title: string;
  img: string;
  value?: string;
  aria?: string;
  path?: string;
}

interface FormChild {
  name: string;
  genre: string;
  date_birth: string;
  blood_type: string;
}

export interface DataChild {
  name: string;
  gender: string;
  age: number;
  imc: number;
  date_birth: string;
  weight: number;
  height: number;
  vaccine: string;
  sick: string | null;
  blood_type: string;
}

function ProfileChildren() {
  const refProfile = useRef<HTMLDivElement | null>(null)

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
  const [dataChildren, setDataChildren] = useState<DataChild>({
    name: "João Pedro",
    gender: "masculino",
    age: 1.2,
    imc: 3.1,
    date_birth: "2019-08-21",
    weight: 7.1,
    height: 123,
    vaccine: "Hepatite B",
    sick: null,
    blood_type: "A",
  });
  const [onlyRead, setOnlyRead] = useState<boolean>(true);
  const [genderSelected, setGenderSelected] = useState<string>(
    dataChildren.gender,
  );

  function setArrayData(data: DataChild) {
    const newArray: ListDescription[] = descriptionItems.map((it) => {
      if (it.title == "Data de nascimento:") {
        it.value = Date.formatedDate(data.date_birth);
      } else if (it.title == "Peso:") {
        it.value = `${data.weight} Kg`;
      } else if (it.title == "Altura:") {
        it.value = `${data.height} cm`;
      } else if (it.title == "Vacinação:") {
        if (data.vaccine != null || data.vaccine != undefined) {
          it.value = data.vaccine;
        } else {
          it.value = "Nenhuma vacina aplicada";
        }
      } else if (it.title == "Enfermidades:") {
        if (data.sick != null || data.sick != undefined) {
          it.value = data.sick;
        } else {
          it.value = "Nenhuma enfermidade";
        }
      } else if (it.title == "Tipo sanguíneo:") {
        it.value = data.blood_type;
      }
      return it;
    });

    setDescriptionItems(newArray);
  }

  function sendDatas(data: FormChild) {
    console.log(data);
    const newObject: DataChild = { ...dataChildren, gender: genderSelected };
    setDataChildren(newObject);
  }

  function cancelChanges() {
    setValue("name", dataChildren.name);
    setValue("date_birth", dataChildren.date_birth);
    setValue("blood_type", dataChildren.blood_type);
    setGenderSelected(dataChildren.gender);
    setOnlyRead(true);
  }

  useEffect(() => {
    setArrayData(dataChildren);
  }, []);

  const { register, handleSubmit, setValue } = useForm<FormChild>({
    defaultValues: {
      name: dataChildren.name,
      date_birth: dataChildren.date_birth,
      blood_type: dataChildren.blood_type,
    }
  });

  return (
    <div
      className="flex w-screen h-screen pt-24 pb-22
        md:pb-28
        xl:pt-0 xl:pb-0"
    >
      <div className="xl:">
        <Header />
      </div>
      <Perfil
        register_name={register("name")}
        genderSelected={genderSelected}
        setGenderSelected={setGenderSelected}
        readonly={onlyRead}
        child={dataChildren}
      />
      <div ref={refProfile}
        className="flex w-full h-full
            xl:justify-center xl:items-center xl:pt-10 bg-light"
      >
        <form
          onSubmit={handleSubmit(sendDatas)}
          className="flex flex-col space-y-[10%] w-full h-full pb-2 overflow-y-auto px-6
                md:px-14
                xl:bg-lilas xl:w-[85%] xl:h-[80%] xl:max-w-340 xl:max-h-250 xl:py-6 xl:space-y-0 xl:rounded-2xl xl:shadow-purple-md"
        >
          <h2 className="hidden xl:block xl:-ml-7 xl:font-poppins xl:text-darker-purple xl:font-extrabold xl:text-[3.3rem]">
            Seus Dados
          </h2>
          <div
            className="w-full
                    xl:hidden"
          >
            <div className="flex justify-between items-start">
              <button type="button" onClick={() => ConvertImg.DownloadElement(refProfile.current!!, 'profile-child')}>
                <img
                  src={exportIcon}
                  alt="Gera um arquivo com os dados da criança."
                  className="mt-2 w-auto h-5"
                />
              </button>
              <img src={ProfilePicture} alt="Foto de perfil da criança." />
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
            <h3 className="flex justify-center items-center font-poppins text-primary-text font-bold text-3xl w-full h-20">
              <InputDefault
                readOnly={onlyRead}
                {...register("name")}
                className={`w-[75%] text-center ${onlyRead ? "" : "border-2 border-primary rounded-lg"}`}
              />
            </h3>
            <section className="flex items-center w-full h-20 font-poppins font-semibold text-primary-text border rounded-lg bg-white border-primary shadow-purple-sm">
              <div className="flex justify-center items-center gap-3 w-1/3 h-[70%]">
                <button
                  onClick={() => setGenderSelected("masculino")}
                  type="button"
                  className={`flex justify-center items-center w-12 h-12 rounded-lg ${genderSelected == "masculino" && !onlyRead ? "bg-lilas/80 border border-primary" : ""} ${dataChildren.gender == "masculino" || !onlyRead ? "flex" : "hidden"}`}
                >
                  <img
                    src={Male}
                    alt="Gênero masculino."
                    className="w-auto h-7"
                  />
                </button>
                <button
                  onClick={() => setGenderSelected("feminino")}
                  type="button"
                  className={`flex justify-center items-center w-12 h-12 rounded-lg ${genderSelected == "feminino" && !onlyRead ? "bg-lilas/80 border border-primary" : ""} ${dataChildren.gender == "feminino" || !onlyRead ? "flex" : "hidden"}`}
                >
                  <img
                    src={Fem}
                    alt="Gênero feminino."
                    className="w-auto h-8.5"
                  />
                </button>
              </div>
              <span className="flex justify-center items-center w-1/3 h-[70%] text-lg border-x border-primary">{`${Date.subYearsFormated(dataChildren.date_birth)} anos`}</span>
              <span className="flex justify-center items-center w-1/3 h-[70%] text-lg">
                IMC: {dataChildren.imc}
              </span>
            </section>
          </div>
          <dl className="flex flex-col justify-center gap-2 w-full grow">
            {descriptionItems.map((it) => (
              <AtributesProfile
                key={it.title}
                date_birth={register("date_birth")}
                blood_type={register("blood_type")}
                listDescription={it}
                onlyRead={onlyRead}
              />
            ))}
          </dl>
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
    </div>
  );
}

export default ProfileChildren;

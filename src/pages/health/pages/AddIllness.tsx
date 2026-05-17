import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BtnPrimary from "../../../components/BtnPrimary";
import { InputDefault } from "../../../components/InputDefault";
import {
  inputClassName,
  labelClassName,
  buttonCancel,
  buttonSubmit,
  radioButton,
  labelRadioButton,
} from "../../routines/RoutineFeeding";

import Close from "../../../assets/closeModal.svg"
import setSelector from "../../../assets/setExpandSelector.svg";

import Date from "../../../utils/Date";

import type { InsertIllness } from "../../../services/illness/illness.service";
import { useInsertIllness } from "../../../services/hooks/illness/useInsertIllness";

// interface IllnessData {
//   illness_name: string;
//   illness_type: string;
//   start_time: string;
//   end_time?: string;
//   medication: string;
//   description?: string;
// }

interface IllnessType {
  id: number;
  name: string;
  insert: string
}

export function AddIllness() {
  const { mutate: onRegisterIllness } = useInsertIllness()

  const navigate = useNavigate();

  const [typeExpand, setTypeExpand] = useState<boolean>(false);
  const [typeLabel, setTypeLabel] = useState<string>("Selecione o tipo...");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InsertIllness>();

  const illnessTypes: IllnessType[] = [
    { id: 1, name: "Aguda", insert: "acute" },
    { id: 2, name: "Crônica", insert: "chronic" }
  ];

  function sendDatas(data: InsertIllness) {
    const newData: InsertIllness = { ...data, 
      start_date: Date.convertHourISO(data.start_date),
      end_date: Date.convertHourISO(data.end_date!),
      fk_id_child: Number(localStorage.getItem("select_child")),
      illness_type: data.illness_type == "Aguda" ? "acute" : "chronic"
     }

    onRegisterIllness(
      newData,
      {
        onSuccess: (response) => {
          console.log(response)
          alert("Enfermidade registrada!")
        },
        onError: (error) => {
          alert(error)
        }
      }
    )
  }

  const { onChange: formOnChange, ...restRegister } = register("illness_type", {
    required: "O tipo da enfermidade é obrigatório!",
  });

  return (
    <div
      className="w-full flex flex-col
    xl:flex xl:justify-center xl:items-center z-10"
    >
      <form
        onSubmit={handleSubmit(sendDatas)}
        className="flex flex-col justify-between w-full h-full
        xl:w-[90%] xl:py-4 md:px-6 xl:px-14 md:py-2 md:rounded-2xl md:mt-2 xl:gap-0 md:shadow-purple-md md:bg-lilas"
      >
        <header className="hidden xl:flex xl:justify-between">
          <h2 className="xl:flex xl:w-70 xl:-ml-4 xl:text-darker-purple xl:font-bold xl:text-[22px]">
            Registrar enfermidade
          </h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="xl:-mr-4"
          >
            <img
              src={Close}
              alt="Fecha o registro de enfermidades e retorna a tela anterior."
              className="xl:w-8 xl:h-8"
            />
          </button>
        </header>
        <div className="flex flex-col">
          <label htmlFor="name" className={labelClassName}>
            Nome
          </label>
          <InputDefault
            id="name"
            type="text"
            placeholder="Infecção Urinária"
            className={`${inputClassName} caret-primary-darker bg-white`}
            {...register("illness_name", { required: "O nome é obrigatório!" })}
          />
          {errors.illness_name && (
            <p className="text-red-600/70 text-sm font-nunito mt-1">
              {errors.illness_name.message}
            </p>
          )}
        </div>

        <div className="relative flex flex-col">
          <label htmlFor="type-selector" className={labelClassName}>
            Tipo
          </label>
          <div
            className={`flex justify-between items-center z-30 cursor-pointer bg-white ${inputClassName}`}
            onClick={() => setTypeExpand(!typeExpand)}
          >
            <InputDefault
              id="type-selector"
              readOnly
              value={typeLabel}
              className="w-full h-full bg-transparent outline-none cursor-pointer caret-primary-darker"
            />
            <button type="button" aria-label="Ícone para visualizar os tipos.">
              <img
                src={setSelector}
                alt=""
                className={`w-6 h-6 transition-transform ${typeExpand ? "rotate-180" : ""
                  }`}
              />
            </button>
          </div>

          <fieldset
            className={`absolute top-20 md:top-22 xl:top-20 flex-col w-full rounded-bl-lg rounded-br-lg border-b border-l border-r border-primary-darker overflow-y-auto bg-white z-40 pt-2 pb-2 gap-2 shadow-purple-sm ${typeExpand ? "flex" : "hidden"
              }`}
          >
            {illnessTypes.map((type) => (
              <div
                key={type.id}
                className="flex items-center w-full h-8 pl-4 gap-2"
              >
                <InputDefault
                  type="radio"
                  id={`type${type.id}`}
                  value={type.name}
                  className={radioButton}
                  {...restRegister}
                  onChange={(e) => {
                    formOnChange(e);
                    setTypeLabel(type.name);
                    setTypeExpand(false);
                  }}
                />
                <label htmlFor={`type${type.id}`} className={labelRadioButton}>
                  {type.name}
                </label>
              </div>
            ))}
          </fieldset>
          {errors.illness_type && (
            <p className="text-red-600/70 text-sm font-nunito mt-1">
              {errors.illness_type.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="start_date" className={labelClassName}>
            Data de início
          </label>
          <InputDefault
            id="start_date"
            type="date"
            className={`${inputClassName} caret-primary-darker bg-white`}
            {...register("start_date", {
              required: "A data de início é obrigatória!",
            })}
          />
          {errors.start_date && (
            <p className="text-red-600/70 text-sm font-nunito mt-1">
              {errors.start_date.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="end_date" className={labelClassName}>
            Data de término
          </label>
          <InputDefault
            id="end_date"
            type="date"
            className={`${inputClassName} caret-primary-darker bg-white`}
            {...register("end_date")}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="medication" className={labelClassName}>
            Medicação
          </label>
          <InputDefault
            id="medication"
            type="text"
            placeholder="Cefuroxima"
            className={`${inputClassName} caret-primary-darker bg-white`}
            {...register("medication", {
              required: "A medicação é obrigatória!",
            })}
          />
          {errors.medication && (
            <p className="text-red-600/70 text-sm font-nunito mt-1">
              {errors.medication.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className={`${labelClassName}`}>
            Descrição
          </label>
          <textarea
            id="description"
            placeholder="Sintomas registrados durante o tempo da doença."
            className={`h-32 md:h-24 p-2 mt-1 border border-primary-darker rounded-lg shadow-purple-sm text-lilas-dark font-semibold text-lg outline-none resize-none caret-primary-darker bg-white`}
            {...register("description")}
          />
        </div>

        <div
          className="flex justify-between w-full h-10 mt-4 md:mb-10
                        md:justify-center md:gap-10 md:h-12
                        xl:h-10 xl:gap-20 xl:mt-3 xl:mb-0"
        >
          <BtnPrimary
            onClick={() => navigate(-1)}
            type="button"
            text="Cancelar"
            className={buttonCancel}
          />
          <BtnPrimary type="submit" text="Registrar" className={buttonSubmit} />
        </div>
      </form>
    </div>
  );
}

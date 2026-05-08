import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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

import setSelector from "../../../assets/setExpandSelector.svg";

interface IllnessData {
  name: string;
  type: string;
  start_date: string;
  end_date?: string;
  medication: string;
  description?: string;
}

interface IllnessType {
  id: number;
  name: string;
}

export function EditIllness() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [typeExpand, setTypeExpand] = useState<boolean>(false);
  const [typeLabel, setTypeLabel] = useState<string>("Selecione o tipo...");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IllnessData>();

  const illnessTypes: IllnessType[] = [
    { id: 1, name: "Aguda (não crônica)" },
    { id: 2, name: "Crônica" },
    { id: 3, name: "Infecciosa" },
    { id: 4, name: "Alergia" },
  ];

  useEffect(() => {
    async function fetchIllness() {
      if (id) {
        const data = await new Promise<IllnessData>((resolve) => {
          setTimeout(() => {
            resolve({
              name: "Gripe",
              type: "Aguda (não crônica)",
              start_date: "2026-03-10",
              end_date: "2026-03-15",
              medication: "Antigripal comum",
              description: "Sintomas leves de resfriado.",
            });
          }, 100);
        });

        reset(data);
        setTypeLabel(data.type);
      }
    }

    fetchIllness();
  }, [id, reset]);

  async function updateDatas() {
    navigate(-1);
  }

  const { onChange: formOnChange, ...restRegister } = register("type", {
    required: "O tipo da enfermidade é obrigatório!",
  });

  return (
    <div
      className="w-full flex flex-col
    xl:flex xl:justify-center xl:items-center z-10"
    >
      <form
        onSubmit={handleSubmit(updateDatas)}
        className="flex flex-col justify-between w-full h-full
        md:px-6 md:py-2 md:rounded-2xl md:mt-2 md:gap-0 md:shadow-purple-md md:bg-lilas
        xl:w-[90%]"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className={labelClassName}>
            Nome
          </label>
          <InputDefault
            id="name"
            type="text"
            placeholder="Infecção Urinária"
            className={`${inputClassName} bg-white  caret-primary-darker`}
            {...register("name", { required: "O nome é obrigatório!" })}
          />
          {errors.name && (
            <p className="text-red-600/70 text-sm font-nunito mt-1">
              {errors.name.message}
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
                className={`w-6 h-6 transition-transform ${
                  typeExpand ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <fieldset
            className={`absolute top-20 md:top-22 xl:top-20 flex-col w-full rounded-bl-lg rounded-br-lg border-b border-l border-r border-primary-darker overflow-y-auto bg-white z-40 pt-2 pb-2 gap-2 shadow-purple-sm ${
              typeExpand ? "flex" : "hidden"
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
                  // Opcional: checar visualmente se é o selecionado
                  checked={typeLabel === type.name}
                />
                <label htmlFor={`type${type.id}`} className={labelRadioButton}>
                  {type.name}
                </label>
              </div>
            ))}
          </fieldset>
          {errors.type && (
            <p className="text-red-600/70 text-sm font-nunito mt-1">
              {errors.type.message}
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
            className={`${inputClassName} bg-white  caret-primary-darker`}
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
            className={`${inputClassName} bg-white  caret-primary-darker`}
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
            className={`${inputClassName} bg-white  caret-primary-darker`}
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
          <label htmlFor="description" className={labelClassName}>
            Descrição
          </label>
          <textarea
            id="description"
            placeholder="Sintomas registrados durante o tempo da doença."
            className={`h-32 md:h-24 p-2 mt-1 border border-primary-darker bg-white  rounded-lg shadow-purple-sm text-lilas-dark font-semibold text-lg outline-none resize-none caret-primary-darker xl:bg-white`}
            {...register("description")}
          />
        </div>

        <div
          className="flex justify-between w-full h-10 mt-4 md:mb-10
                        md:justify-center md:gap-10 md:h-12
                        xl:h-10 xl:gap-20 xl:mt-3"
        >
          <BtnPrimary
            onClick={() => navigate(-1)}
            type="button"
            text="Cancelar"
            className={buttonCancel}
          />
          <BtnPrimary type="submit" text="Salvar" className={buttonSubmit} />
        </div>
      </form>
    </div>
  );
}

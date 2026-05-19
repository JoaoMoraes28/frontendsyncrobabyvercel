import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useUpdateProfessional } from "../../../services/hooks/professional/updateProfessional";
import { useGetSpecialties } from "../../../services/hooks/specialty/getSpecialty";

interface PediatricianData {
  name: string;
  profession: string;
  address: string;
  last_appointment_date: string;
  phone: string;
  description?: string;
}

export function EditPediatrician() {
  const navigate = useNavigate();
  const location = useLocation();

  const childId = Number(localStorage.getItem("select_child"));
  const professionalData = location.state?.professional;

  const { mutateAsync: updateProfessionalMutation } = useUpdateProfessional();
  const { data: specialtiesResponse } = useGetSpecialties();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [professionExpand, setProfessionExpand] = useState<boolean>(false);
  const [professionLabel, setProfessionLabel] = useState<string>(
    professionalData?.specialty || "Selecione a profissão...",
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PediatricianData>({
    defaultValues: {
      name: professionalData?.professional_name || "",
      profession: professionalData?.specialty || "",
      address: professionalData?.address || "",
      phone: professionalData?.phone || "",
      last_appointment_date: professionalData?.last_consultation
        ? professionalData.last_consultation.split("T")[0]
        : "",
      description: "",
    },
  });

  const specialtiesList = specialtiesResponse?.specialty || [];

  useEffect(() => {
    if (!professionalData) {
      navigate(-1);
    }
  }, [professionalData, navigate]);

  async function sendDatas(data: PediatricianData) {
    const selectedSpecialty = specialtiesList.find(
      (spec) => spec.specialization_name === data.profession,
    );
    const specialtyId = selectedSpecialty
      ? selectedSpecialty.id_specialization
      : professionalData.fk_id_specialization;

    const payload = {
      professional_name: data.name,
      phone: data.phone,
      last_consultation: data.last_appointment_date,
      address: data.address,
      fk_id_child: childId,
      fk_id_specialization: specialtyId,
    };

    try {
      await updateProfessionalMutation({
        data: payload,
        idProfessional: professionalData.id_professional,
      });
      navigate(-1);
    } catch {
      return;
    }
  }

  const { onChange: formOnChange, ...restRegister } = register("profession", {
    required: "A profissão é obrigatória!",
  });

  return (
    <div className="w-full flex flex-col xl:flex xl:justify-center xl:items-center z-10">
      <form
        onSubmit={
          isEditing ? handleSubmit(sendDatas) : (e) => e.preventDefault()
        }
        className="flex flex-col justify-between w-full h-full xl:w-[90%] xl:px-14 xl:py-2 xl:rounded-2xl xl:mt-2 xl:gap-0 xl:shadow-purple-md xl:bg-lilas"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className={labelClassName}>
            Nome
          </label>
          <InputDefault
            id="name"
            type="text"
            disabled={!isEditing}
            className={`${inputClassName} caret-primary-darker ${!isEditing ? "opacity-70 bg-gray-100" : ""}`}
            {...register("name", { required: "O nome é obrigatório!" })}
          />
          {errors.name && isEditing && (
            <p className="text-red-600/70 text-sm font-runs mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="relative flex flex-col">
          <label htmlFor="profession-selector" className={labelClassName}>
            Profissão
          </label>
          <div
            className={`flex justify-between items-center z-30 ${
              isEditing
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-70 bg-gray-100"
            } ${inputClassName}`}
            onClick={() => isEditing && setProfessionExpand(!professionExpand)}
          >
            <InputDefault
              id="profession-selector"
              readOnly
              disabled={!isEditing}
              value={professionLabel}
              className={`w-full h-full bg-transparent outline-none caret-primary-darker ${
                isEditing ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            />
            <button
              type="button"
              disabled={!isEditing}
              aria-label="Ícone para visualizar as profissões."
            >
              <img
                src={setSelector}
                alt=""
                className={`w-6 h-6 transition-transform ${
                  professionExpand ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <fieldset
            className={`absolute top-20 md:top-22 xl:top-20 flex-col w-full rounded-bl-lg rounded-br-lg border-b border-l border-r border-primary-darker overflow-y-auto max-h-48 bg-white z-40 pt-2 pb-2 gap-2 shadow-purple-sm ${
              professionExpand ? "flex" : "hidden"
            }`}
          >
            {specialtiesList.map((spec) => (
              <div
                key={spec.id_specialization}
                className="flex items-center w-full h-8 pl-4 gap-2"
              >
                <InputDefault
                  type="radio"
                  id={`spec${spec.id_specialization}`}
                  value={spec.specialization_name}
                  className={radioButton}
                  {...restRegister}
                  onChange={(e) => {
                    formOnChange(e);
                    setProfessionLabel(spec.specialization_name);
                    setProfessionExpand(false);
                  }}
                />
                <label
                  htmlFor={`spec${spec.id_specialization}`}
                  className={labelRadioButton}
                >
                  {spec.specialization_name}
                </label>
              </div>
            ))}
          </fieldset>
          {errors.profession && isEditing && (
            <p className="text-red-600/70 text-sm font-nunito mt-1">
              {errors.profession.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className={labelClassName}>
            Endereço
          </label>
          <InputDefault
            id="address"
            type="text"
            disabled={!isEditing}
            className={`${inputClassName} caret-primary-darker ${!isEditing ? "opacity-70 bg-gray-100" : ""}`}
            {...register("address", { required: "O endereço é obrigatório!" })}
          />
          {errors.address && isEditing && (
            <p className="text-red-600/70 text-sm font-nunito mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="last_appointment_date" className={labelClassName}>
            Data da última consulta
          </label>
          <InputDefault
            id="last_appointment_date"
            type="date"
            disabled={!isEditing}
            className={`${inputClassName} caret-primary-darker ${!isEditing ? "opacity-70 bg-gray-100" : ""}`}
            {...register("last_appointment_date", {
              required: "A data da última consulta é obrigatória!",
            })}
          />
          {errors.last_appointment_date && isEditing && (
            <p className="text-red-600/70 text-sm font-nunito mt-1">
              {errors.last_appointment_date.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className={labelClassName}>
            Número de telefone
          </label>
          <InputDefault
            id="phone"
            type="tel"
            disabled={!isEditing}
            className={`${inputClassName} caret-primary-darker ${!isEditing ? "opacity-70 bg-gray-100" : ""}`}
            {...register("phone", {
              required: "O número de telefone é obrigatório!",
            })}
          />
          {errors.phone && isEditing && (
            <p className="text-red-600/70 text-sm font-nunito mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className={labelClassName}>
            Descrição
          </label>
          <textarea
            id="description"
            disabled={!isEditing}
            className={`h-32 md:h-40 p-2 mt-1 border border-primary-darker rounded-lg shadow-purple-sm text-lilas-dark font-semibold text-lg outline-none resize-none caret-primary-darker ${
              !isEditing ? "opacity-70 bg-gray-100 cursor-not-allowed" : ""
            }`}
            {...register("description")}
          />
        </div>

        <div className="flex justify-between w-full h-10 mt-4 md:mb-10 md:justify-center md:gap-10 md:h-12 xl:h-10 xl:gap-20">
          <BtnPrimary
            onClick={() => navigate(-1)}
            type="button"
            text="Voltar"
            className={buttonCancel}
          />
          <BtnPrimary
            type={isEditing ? "submit" : "button"}
            onClick={!isEditing ? () => setIsEditing(true) : undefined}
            text={isEditing ? "Registrar edição" : "Editar"}
            className={buttonSubmit}
          />
        </div>
      </form>
    </div>
  );
}

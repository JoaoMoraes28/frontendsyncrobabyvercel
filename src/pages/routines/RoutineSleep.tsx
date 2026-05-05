import { useState } from "react"
import { useNavigate } from "react-router-dom";

import Date from "../../utils/Date"

import BtnPrimary from "../../components/BtnPrimary"
import ChildrenSelect from "../../layouts/ChildrenSelect";
import { InputDefault } from "../../components/InputDefault"
import { inputClassName, labelClassName, buttonCancel, buttonSubmit } from "./RoutineFeeding"
import { useForm } from "react-hook-form"

import Close from "../../assets/closeModal.svg"

interface SleepData {
    date: string
    start_time: string
    end_time: string
    time: string
    description?: string
}

function RoutineSleep() {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors }
    } = useForm<SleepData>()

    const navigate = useNavigate()
    const [childrenSelected, setChildSelected] = useState<number>(1)

    function setSleepTimeInput() {
        const { start_time, end_time } = getValues()

        const resultTime: string | boolean = Date.subHoursFormated(start_time, end_time)

        if (resultTime != 'NaNh:NaNmin' && resultTime != false) {
            setValue('time', resultTime)

        } else {
            setValue('time', "Datas inválidas!")

        }

    }

    function sendDatas(datas: SleepData) {
        console.log(datas)
    }

    return (
        <div className="w-full min-h-full
        md:flex md:items-center
        xl:flex xl:flex-col xl:items-center xl:h-[calc(100%-85px)]">
            <div className="flex w-full">
                <ChildrenSelect idChild={childrenSelected} setChild={setChildSelected} />
            </div>
            <form onSubmit={handleSubmit(sendDatas)} className="flex flex-col justify-between min-w-full h-full
            md:h-[90%]
            xl:justify-around xl:max-w-[90%] xl:min-w-[90%] xl:h-full xl:bg-lilas xl:mt-5 xl:rounded-2xl xl:px-14 xl:py-4 xl:shadow-purple-md">
                <header className="hidden xl:flex xl:justify-between">
                    <h2 className="xl:flex xl:-ml-6 xl:w-70 xl:text-darker-purple xl:font-bold xl:text-[22px]">Registrar sono</h2>
                    <button type="button" onClick={() => navigate(-1)} className="xl:-mr-6">
                        <img src={Close} alt="Fecha o registro de sono e retorna a tela anterior." className="xl:w-8 xl:h-8" />
                    </button>
                </header>
                <div className="flex flex-col">
                    <label htmlFor="startTime" className={labelClassName}>Hora de início</label>
                    <InputDefault {...register('start_time', { onBlur: setSleepTimeInput, required: "Selecione a hora de início!" })} id="startTime" type="time" className={inputClassName} />
                    {errors.start_time && <p className="text-red-600/70 text-sm font-nunito">{errors.start_time.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="endTime" className={labelClassName}>Hora de término</label>
                    <InputDefault {...register('end_time', { onBlur: setSleepTimeInput, required: "Selecione a hora de término!" })} id="endTime" type="time" className={inputClassName} />
                    {errors.end_time && <p className="text-red-600/70 text-sm font-nunito">{errors.end_time.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="sleepTime" className={labelClassName}>Tempo de soneca</label>
                    <InputDefault {...register('time')} readOnly id="sleepTime" type="text" className={inputClassName} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className={labelClassName}>Descrição</label>
                    <textarea id="description" className={`h-40 md:h-80 ${inputClassName} outline-0`} />
                </div>
                <div className="flex justify-between w-full h-10 mb-1
                        md:justify-center md:gap-10 md:h-12
                        xl:h-10 xl:gap-20">
                    <BtnPrimary onClick={() => navigate(-1)} type="button" text="Cancelar" className={buttonCancel} />
                    <BtnPrimary type="submit" text="Registrar" className={buttonSubmit} />
                </div>
            </form>
        </div>
    )
}

export default RoutineSleep
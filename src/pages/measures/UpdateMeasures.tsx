import MeasuresIcon from "../../assets/measureAccent.svg"
import CalcIcon from "../../assets/calcAccent.svg"

import { useForm } from "react-hook-form"
import { useState } from "react"

import { InputDefault } from "../../components/InputDefault"
import BtnPrimary from "../../components/BtnPrimary"
import ChildrenSelect from "../../layouts/ChildrenSelect"
import { useNavigate } from "react-router-dom"

interface DataMeasures {
    weight: number
    height: number
    head_circumference: number
    description: string
}

const inputClass: string = 'text-primary w-full h-8'
const labelClass: string = 'text-primary-darker font-semibold h-6 flex items-center md:text-[18px]'
const containerInput: string = 'flex border border-primary-darker px-1 rounded-sm'

function UpdateMeasures() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<DataMeasures>()

    const navigate = useNavigate()
    const [childSelected, setChildSelected] = useState<number>(1)

    function sendData(data: DataMeasures) {
        const height: string = data.height.toString()
        const weight: string = data.weight.toString()
        const head: string = data.head_circumference.toString()

        if (height == '' && weight == '' && head == '') {
            alert("Preencha ao menos um campo de medidas!")

        }
        console.log(data)
    }

    return (
        <div className="flex flex-col w-full min-h-full
        xl:justify-around">
            <div className="hidden xl:w-full xl:flex">
                <ChildrenSelect idChild={childSelected} setChild={setChildSelected} />
            </div>

            <form onSubmit={handleSubmit(sendData)}
                className="flex flex-col gap-3 w-full h-full shadow-purple-md pt-4 px-4 rounded-md
                md:justify-around md:gap-0 md:pt-0
                xl:h-[90%]">
                <header className="flex flex-col gap-5
                md:items-center">
                    <div className="flex flex-col items-center gap-0.5">
                        <div className="flex justify-center items-center w-8 h-8 rounded-full shadow-purple-md
                        md:w-10 md:h-10">
                            <img aria-hidden="true" src={MeasuresIcon} alt="" className="w-auto h-4.5
                            md:h-5.5" />
                        </div>
                        <h3 className="font-poppins text-darker-purple font-bold
                        md:text-[22px]">Registrar Medidas</h3>
                        <p className="font-nunito text-gray-dark w-[90%] text-[16px]
                        md:w-full md:text-[20px]">Acompanhe de perto o desenvolvimento do seu bebê</p>
                    </div>
                    <div className="flex font-poppins w-full h-40 px-4 justify-center items-center gap-6 border-2 border-dotted border-accent rounded-2xl
                    md:h-52
                    xl:h-40">
                        <div className="flex justify-center items-center w-8 h-8 rounded-full shadow-purple-md
                        md:w-10 md:h-10">
                            <img aria-hidden="true" src={CalcIcon} alt="" className="w-auto h-4.5
                            md:h-5.5" />
                        </div>
                        <div className="flex flex-col gap-3 w-[85%]">
                            <p className="text-darker-purple text-xl font-semibold
                            md:text-2xl">Cálculo Automático de IMC</p>
                            <p className="text-gray-medium text-[12px] font-semibold
                            md:text-[16px]">O Índice de Massa Corporal (IMC) será calculado e atualizado automaticamente nos gráficos com base no peso e na altura inseridos abaixo.</p>
                        </div>
                    </div>
                </header>
                <div className="font-poppins flex justify-between">
                    <div className="w-[30%] h-18 flex flex-col">
                        <label htmlFor="weight" className={`text-[15px] ${labelClass}`}>Peso</label>
                        <div className={containerInput}>
                            <InputDefault {...register("weight", { maxLength: { value: 4, message: "Até 3 caracteres!" } })} id="weight" type="number" step="any" inputMode="decimal" className={inputClass} />
                            <span className="flex items-center text-primary font-semibold">KG</span>
                        </div>
                        <span className={`text-gray-light h-4 text-[12px]
                            md:text-[16px]`}>{errors.weight ? errors.weight.message : 'Ultima: 7,2'}</span>
                    </div>
                    <div className="w-[30%] h-18 flex flex-col">
                        <label htmlFor="height" className={`text-[15px] ${labelClass}`}>Altura</label>
                        <div className={containerInput}>
                            <InputDefault {...register("height", { maxLength: { value: 4, message: "Até 4 caracteres!" } })} id="height" type="number" step="any" inputMode="decimal" className={inputClass} />
                            <span className="flex items-center text-primary font-semibold">CM</span>
                        </div>
                        <span className={`text-gray-light h-4 text-[12px]
                            md:text-[16px]`}>{errors.height ? errors.height.message : 'Ultima: 7,2'}</span>
                    </div>
                    <div className="w-[30%] h-18 flex flex-col">
                        <label htmlFor="perimeter" className={`text-[11px] ${labelClass}`}>Perímetro Cefálico</label>
                        <div className={containerInput}>
                            <InputDefault {...register("head_circumference", { maxLength: { value: 4, message: "Até 4 caracteres!" } })} id="perimeter" type="number" step="any" inputMode="decimal" className={inputClass} />
                            <span className="flex items-center text-primary font-semibold">CM</span>
                        </div>
                        <span className={`text-gray-light text-[12px] h-4
                            md:text-[16px]`}>{errors.head_circumference ? errors.head_circumference.message : 'Ultima: 7,2'}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className={`text-[15px] ${labelClass}`}>Descrição</label>
                    <textarea {...register("description")} id="description" className={`h-35 outline-none ${containerInput} ${inputClass}
                    md:h-45
                    xl:h-30`}></textarea>
                </div>
                <div className="flex justify-center gap-8 mt-7 w-full font-poppins
                md:gap-20 md:mt-0">
                    <BtnPrimary onClick={() => navigate(-1)} type="button" text="Cancelar" className="flex justify-center items-center w-26 h-10 rounded-md bg-white shadow-purple-sm text-dark-purple font-semibold
                    md:w-38 md:h-12 md:text-[18px]" />
                    <BtnPrimary type="submit" text="Registrar" className="flex justify-center items-center w-26 h-10 rounded-md bg-accent shadow-purple-sm text-white font-semibold
                    md:w-38 md:h-12 md:text-[18px]" />
                </div>
            </form>
        </div>
    )
}

export default UpdateMeasures
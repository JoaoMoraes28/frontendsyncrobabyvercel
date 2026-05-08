import MeasuresIcon from "../../assets/measureAccent.svg"
import CalcIcon from "../../assets/calcAccent.svg"

import { useForm } from "react-hook-form"

import { InputDefault } from "../../components/InputDefault"
import BtnPrimary from "../../components/BtnPrimary"

interface DataMeasures {
    weight: number
    height: number
    head_circumference: number
}

const inputClass: string = 'text-primary w-full h-8'
const labelClass: string = 'text-primary-darker font-semibold h-6 flex items-center'
const containerInput: string = 'flex border border-primary-darker px-1 rounded-lg shadow-purple-sm'

function UpdateMeasures() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<DataMeasures>()

    function sendData(data: DataMeasures) {
        console.log(data)
    }

    return (
        <div className="flex flex-col w-full min-h-full">
            <form onSubmit={handleSubmit(sendData)}
                className="w-full h-full shadow-purple-md rounded-2xl pt-2 px-4">
                <header className="flex flex-col gap-5">
                    <div className="flex flex-col items-center gap-0.5">
                        <div className="flex justify-center items-center w-8 h-8 rounded-full shadow-purple-md">
                            <img aria-hidden="true" src={MeasuresIcon} alt="" className="w-auto h-4.5" />
                        </div>
                        <h3 className="font-poppins text-darker-purple font-bold">Registrar Medidas</h3>
                        <p className="font-nunito text-gray-dark w-[90%] text-[16px]">Acompanhe de perto o desenvolvimento do seu bebê</p>
                    </div>
                    <div className="flex font-poppins h-40 px-4 justify-center items-center gap-6 border-2 border-dotted border-accent rounded-2xl">
                        <div className="flex justify-center items-center w-8 h-8 rounded-full shadow-purple-md">
                            <img aria-hidden="true" src={CalcIcon} alt="" className="w-auto h-4.5" />
                        </div>
                        <div className="flex flex-col gap-3 w-[85%]">
                            <p className="text-darker-purple text-xl font-semibold">Cálculo Automático de IMC</p>
                            <p className="text-gray-medium text-[12px] font-semibold">O Índice de Massa Corporal (IMC) será calculado e atualizado automaticamente nos gráficos com base no peso e na altura inseridos abaixo.</p>
                        </div>
                    </div>
                </header>
                <div className="font-poppins flex justify-between">
                    <div className="w-[30%] h-18 flex flex-col">
                        <label htmlFor="weight" className={`text-[15px] ${labelClass}`}>Peso</label>
                        <div className={containerInput}>
                            <InputDefault {...register("weight", { maxLength: { value: 4, message: "Até 4 caracteres!" } })} id="weight" type="number" className={inputClass} />
                            <span className="flex items-center text-primary font-semibold">KG</span>
                        </div>
                        <span className={`text-gray-light h-4 text-[12px]`}>{errors.weight ? errors.weight.message : 'Ultima: 7,2'}</span>
                    </div>
                    <div className="w-[30%] h-18 flex flex-col">
                        <label htmlFor="height" className={`text-[15px] ${labelClass}`}>Altura</label>
                        <div className={containerInput}>
                            <InputDefault {...register("height", { maxLength: { value: 3, message: "Até 3 caracteres!" } })} id="height" type="number" className={inputClass} />
                            <span className="flex items-center text-primary font-semibold">CM</span>
                        </div>
                        <span className={`text-gray-light h-4 text-[12px]`}>{errors.height ? errors.height.message : 'Ultima: 7,2'}</span>
                    </div>
                    <div className="w-[30%] h-18 flex flex-col">
                        <label htmlFor="perimeter" className={`text-[11px] ${labelClass}`}>Perímetro Cefálico</label>
                        <div className={containerInput}>
                            <InputDefault {...register("head_circumference", { maxLength: { value: 3, message: "Até 3 caracteres!" } })} id="perimeter" type="number" className={inputClass} />
                            <span className="flex items-center text-primary font-semibold">CM</span>
                        </div>
                        <span className={`text-gray-light text-[12px] h-4`}>{errors.head_circumference ? errors.head_circumference.message : 'Ultima: 7,2'}</span>
                    </div>
                </div>
                <div className="mt-20">
                    <BtnPrimary type="button" text="Cancelar" />
                    <BtnPrimary type="submit" text="Registrar" />
                </div>
            </form>
        </div>
    )
}

export default UpdateMeasures
import { useForm } from "react-hook-form"

import type { Register } from "./components/Card"

import { colors } from "./Anotation"

import CloudPurple from "../../assets/cloudPurple.svg"

import { useState } from "react"

import Date from "../../utils/Date"

import { InputDefault } from "../../components/InputDefault"
import BtnPrimary from "../../components/BtnPrimary"

import { useNavigate } from "react-router-dom"

const labelClass: string = 'font-poppins text-primary-darker font-semibold text-[14px] md:text-[16px]'
const inputClass: string = 'font-poppins text-primary text-[16px] border border-primary-darker rounded-sm w-full h-10 pl-2 md:text-[18px]'

function NewAnotation() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Register>({
        defaultValues: {
            creation_date: Date.getTodayFormated()
        }
    })

    const navigate = useNavigate()

    const [colorLabel, setColorLabel] = useState<string>("")
    const [preview, setPreview] = useState<string | null>(null)

    function sendData(data: Register) {
        const fullData: Register = {
            id: 0,
            title: data.title,
            midia:  preview != null ? preview : "",
            creation_date: data.creation_date,
            label_color: colorLabel,
            text_content: data.text_content
        }
        console.log(fullData)
    }

    function changePreview(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <div className="w-full min-h-full
        xl:flex xl:justify-center">
            <form onSubmit={handleSubmit(sendData)} className="flex flex-col items-center w-full h-full rounded-md shadow-purple-sm gap-1.5
            xl:w-[85%]">
                <div className="flex flex-col items-center bg-linear-to-l from-[#f4ebfb] to-[#ffefef] w-full rounded-t-md">
                    <div className="flex justify-center items-center w-8 h-8 rounded-full shadow-purple-md">
                        <img aria-hidden="true" src={CloudPurple} alt="" className="w-auto h-5" />
                    </div>
                    <h3 className="font-poppins text-darker-purple font-semibold text-xl
                    md:text-2xl">Nova Lembrança</h3>
                    <p className="font-nunito text-gray-dark
                    md:text-xl">Guarde os momentos mais preciosos do seu bebê</p>
                </div>
                <div className="flex flex-col w-full h-grow items-center px-4 h-full">
                    <label htmlFor="image" className="flex flex-col justify-center items-center w-full h-50 font-poppins font-semibold border-2 border-dotted border-accent rounded-2xl
                    md:min-h-[40%]">
                        <p className={`text-darker-purple ${preview == null ? 'block' : 'hidden'}`}>Clique para enviar ou arraste os ficheiros</p>
                        <span className={`text-gray-medium text-sm ${preview == null ? 'block' : 'hidden'}`}>Suporta JPG ou PNG</span>
                        <img src={preview == null ? "*" : preview} alt="Imagem escolhida para registro." className={`w-full h-full object-cover object-center rounded-2xl ${preview == null ? 'hidden' : 'block'}`} />
                    </label>
                    <input onChange={(e) => changePreview(e)} type="file" id="image" accept="JPG, PNG" className="hidden" />
                    <div className="flex flex-col w-full">
                        <label htmlFor="title" className={labelClass}>Título da Lembrança</label>
                        <InputDefault {...register("title", { required: "Campo obrigatório" })} type="text" id="title" maxLength={120} className={inputClass} />
                        {errors.title && <p className="text-red-600/70 text-sm font-nunito">{errors.title.message}</p>}
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                            <label htmlFor="colors" className={labelClass}>Etiqueta</label>
                            <ul id="colors" className="flex">
                                {colors.map((color) => (
                                    <li key={color.color} style={{ backgroundColor: color.color }} className={`w-10 h-10 ${colorLabel == color.color ? 'border border-accent' : ''}`}>
                                        <button onClick={() => setColorLabel(color.color)} type="button" className="w-full h-full"></button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="data" className={labelClass}>Data</label>
                            <InputDefault {...register("creation_date")} type="date" id="data" className={inputClass} />
                            {errors.creation_date && <p className="text-red-600/70 text-sm font-nunito">{errors.creation_date.message}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col w-full grow">
                        <label htmlFor="description" className={labelClass}>Descrição</label>
                        <textarea {...register("text_content", { required: "Campo obrogatório" })} id="description" maxLength={760} className={` h-[95%] outline-none ${inputClass}`}></textarea>
                        {errors.text_content && <p className="text-red-600/70 text-sm font-nunito">{errors.text_content.message}</p>}
                    </div>
                    <div className="flex gap-10 h-15 items-center">
                        <BtnPrimary onClick={() => navigate(-1)} type="button" text="Cancelar" className="w-25 h-10 text-dark-purple shadow-purple-sm
                        md:w-30"/>
                        <BtnPrimary type="submit" text="Registrar" className="h-10 bg-accent text-white font-semibold
                        md:w-30" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewAnotation
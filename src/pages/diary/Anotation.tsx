import { useNavigate, useSearchParams } from "react-router-dom"

import { useState } from "react"

import { InputDefault } from "../../components/InputDefault"
import BtnPrimary from "../../components/BtnPrimary"

import type { Register } from "./components/Card"

import Date from "../../utils/Date"

import Image from "../../assets/imageExDiary.png"
import Trash from "../../assets/routines/trashPurple.svg"

import { useForm } from "react-hook-form"

export interface Color {
    id: number
    color: string
}

function Anotation() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const edit = params.get('edit')

    const [colorSelected, setColorSelected] = useState<number>(0)
    const [anotation] = useState<Register>(
        {
            "id": 1,
            "title": "Os primeiros passos da Maya",
            "creation_date": "2026-03-12T10:30:00Z",
            "label_color": "#9D87D2",
            "text_content": "Hoje estávamos na sala e ele soltou do sofá de repente! Deu três passinhos na minha direção antes de cair sentado rindo muito. Eu juro, foi como assistir um pequeno milagre acontecendo em câmera lenta — aqueles passinhos meio tortinhos, cheios de coragem e desequilíbrio, como se o mundo inteiro fosse grande demais pra ele e, ainda assim, eleHoje estávamos na sala e ele soltou do sofá de repente! Deu três passinhos na minha direção antes de cair sentado rindo muito. Eu juro, foi como assistir um pequeno milagre acontecendo em câmera lenta — aqueles passinhos meio tortinhos, cheios de coragem e desequilíbrio, como se o mundo inteiro fosse grande demais pra ele e, ainda assim, elHoje estávamos na sala e ele soltou do sofá de repente! Deu três passinhos na minha direção antes de cair sentado rindo muito. Eu juro, foi como assistir um pequeno milagre acontecendo em câmera lenta — aqueles passinhos meio tortinhos, cheios de coragem e desequilíbrio, como se o mundo inteiro fosse grande demais pra ele e, ainda assim, elHoje estávamos na sala e ele soltou do sofá de repente! Deu três passinhos na minha direção antes de cair sentado rindo muito. Eu juro, foi como assistir um pequeno milagre acontecendo em câmera lenta — aqueles passinhos meio tortinhos, cheios de coragem e desequilíbrio, como se o mundo inteiro fosse grande demais pra ele e, ainda assim, elHoje estávamos na sala e ele soltou do sofá de repente! Deu três passinhos na minha direção antes de cair sentado rindo muito. Eu juro, foi como assistir um pequeno milagre acontecendo em câmera lenta — aqueles passinhos meio tortinhos, cheios de coragem e desequilíbrio, como se o mundo inteiro fosse grande demais pra ele e, ainda assim, el estivesse disposto a conquistar cada centímetro. Fiquei tão surpresa que nem consegui reagir na hora, só abri um sorriso bobo enquanto ele ria, como se tivesse contado a melhor piada do universo. Depois ele bateu as mãozinhas no chão, todo orgulhoso de si mesmo, e tentou levantar de novo — claro que sem muito sucesso, mas com uma determinação que parecia maior que ele.",
            "midia": Image
        }
    )
    const [colors] = useState<Color[]>([
        {
            "id": 1,
            "color": "#9D87D2"
        },
        {
            "id": 2,
            "color": "#68CADB"
        },
        {
            "id": 3,
            "color": "#8DDB68"
        }
    ])
    const [previewImg, setPreviewImg] = useState<string | undefined>(anotation.midia)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Register>({
        defaultValues: {
            title: anotation.title,
            text_content: anotation.text_content,
            creation_date: anotation.creation_date.split("T")[0]
        }
    })

    function changePreview(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setPreviewImg(URL.createObjectURL(e.target.files[0]))
        }
    }

    function sendData(data: Register) {
        const idColor: Color[] = colors.filter(it => it.color == anotation.label_color)

        const fullData: Register = {
            id: anotation.id,
            title: data.title,
            midia: previewImg,
            creation_date: data.creation_date,
            text_content: data.text_content,
            label_color_update: colorSelected != 0 ? colorSelected : idColor[0].id
        }

        console.log(fullData)
    }

    return (
        <div className={`relative w-full text-primary-text
        xl:flex xl:justify-center`}>
            <form onSubmit={handleSubmit(sendData)} className={`flex flex-col w-full min-h-full gap-2 ${edit == "true" ? 'pb-28' : 'pb-0'}
            xl:w-[80%]`}>
                <div className="relative">
                    <button className={`absolute right-2 top-2 ${edit == "false" ? 'hidden' : 'block'}`}>
                        <img src={Trash} alt="Exclui o registro." className="w-auto h-5" />
                    </button>
                    <h3 className="w-full h-15 font-poppins font-bold text-xl
                    xl:text-3xl">
                        <InputDefault {...register("title", { required: "Título inválido!" })} readOnly={edit == "false"} className={`w-full h-full text-center pl-2 pr-6 ${edit == "true" ? 'border-2 border-primary rounded-sm' : ''}`} />
                    </h3>
                </div>
                {errors.title && <p className="flex justify-center text-red-600/70 text-sm font-nunito">{errors.title.message}</p>}
                <label htmlFor={edit == "true" ? 'image' : 'none'} className="relative flex flex-col items-end w-full h-58
                md:h-[60%]">
                    <img src={previewImg} alt="Imagem do registro." className={`w-full h-50 object-cover object-center md:h-[calc(100%-36px)] ${edit == "true" ? 'opacity-70' : ''}`} />
                    <div className="flex justify-between items-center w-full h-8 font-nunito text-primary italic">
                        <InputDefault {...register("creation_date", { required: "Data inválida!" })} readOnly={edit == "false"} type="date" className={`h-7 mt-1 font-semibold ${edit == "true" ? 'border-2 border-primary rounded-sm w-28 text-center' : ''}`} />
                        {errors.creation_date && <p className="text-red-600/70 text-sm font-nunito">{errors.creation_date.message}</p>}
                        <span>{Date.subDaysFormated(anotation.creation_date)}</span>
                    </div>
                    <span className={`absolute top-[calc(50%-40px)] w-full justify-center font-semibold text-2xl ${edit == "true" ? 'flex' : 'hidden'}`}>Clique para Alterar imagem</span>
                </label>
                <input onChange={(e) => changePreview(e)} type="file" id="image" accept="JPG, PNG" className="hidden" />
                {errors.text_content && <p className="text-red-600/70 text-sm font-nunito">{errors.text_content.message}</p>}
                <textarea {...register("text_content", { required: "Descrição inválida!" })} readOnly={edit == "false"} className={`w-full h-full grow font-nunito outline-none text-justify ${edit == "true" ? 'rounded-sm border-2 border-primary p-2' : ''}
                xl:text-lg`}></textarea>
                <div className={`absolute  flex flex-col w-full justify-end items-center h-26 bottom-0 ${edit == "true" ? 'flex' : 'hidden'}
                xl:w-[80%]`}>
                    <div className="flex justify-between w-full h-[calc(100%-48px)]">
                        <ul className="flex justify-end w-full h-full py-1">
                            {colors.map((color) => (
                                <li key={color.id} className={`${colorSelected == color.id ? 'border border-accent' : ''}`}>
                                    <button type="button" onClick={() => setColorSelected(color.id)} style={{ backgroundColor: color.color }} className="w-10 h-full"></button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex w-full h-12 gap-12 justify-between items-center">
                        <BtnPrimary onClick={() => navigate(-1)} type="button" text="Cancelar" className="bg-lilas text-primary-text w-28 h-9
                        md:h-12" />
                        <BtnPrimary type="submit" text="Salvar" className="bg-accent text-white w-30 h-9
                        md:h-12" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Anotation
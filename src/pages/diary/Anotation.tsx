import { useNavigate, useParams, useSearchParams } from "react-router-dom"

import { useEffect, useState } from "react"

import { InputDefault } from "../../components/InputDefault"
import BtnPrimary from "../../components/BtnPrimary"

import Date from "../../utils/Date.ts"

import Trash from "../../assets/routines/trashPurple.svg"
import SetBack from "../../assets/navigation/setBack.svg"
import { useGetDiaryId } from "../../services/hooks/diary/useGetDiaryId.ts"
import type { ModelDiary } from "../../services/diary/diary.service.ts"
import type { InsertDiary } from "../../services/diary/diary.service.ts"
import { useForm } from "react-hook-form"

export interface Color {
    color: string
}

interface ResponseForm {
    title: string
    content: string
    date: string
}

export const colors: Color[] = [
    {
        "color": "#FFA9DD"
    },
    {
        "color": "#68DBCE"
    },
    {
        "color": "#F3DC82"
    },
    {
        "color": "#FF9193"
    }
]

function Anotation() {
    const { id } = useParams()
    const { data: onGetDiaryId } = useGetDiaryId(Number(id))
    const idChild: number = Number(localStorage.getItem("select_child"))
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const edit = params.get('edit')

    const [colorSelected, setColorSelected] = useState<string>("")
    const [anotation, setAnotation] = useState<ModelDiary>({
        id_diary_note: 0,
        title: "",
        content: "",
        media: "",
        date: "",
        color: "",
        fk_id_child: 0
    })

    const [previewImg, setPreviewImg] = useState<string | null>(anotation?.media == undefined || anotation?.media == null ? null : anotation.media)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ResponseForm>({
        defaultValues: {
            title: anotation?.title,
            content: anotation?.content,
            date: anotation?.date.split("T")[0]
        }
    })

    function changePreview(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setPreviewImg(URL.createObjectURL(e.target.files[0]))
        }
    }

    function sendData(data: ResponseForm) {
        const idColor: Color[] = colors.filter(it => it.color == anotation?.color)

        const fullData: InsertDiary = {
            title: data.title,
            media: previewImg,
            date: data.date,
            fk_id_child: idChild,
            content: data.content,
            color: colorSelected != "" ? colorSelected : idColor[0].color
        }

        console.log(fullData)
    }

    useEffect(() => {
        if (!onGetDiaryId)
            return
        if (onGetDiaryId)
            console.log(onGetDiaryId)
            setAnotation(onGetDiaryId.diary[0])
        
    }, [onGetDiaryId])

    return (
        <div className={`relative w-full text-primary-text
        xl:flex xl:justify-center xl:flex-col xl:items-center`}>
            <div className="hidden xl:flex xl:justify-start xl:w-full">
                <button onClick={() => navigate(-1)}>
                    <img src={SetBack} alt="Retorna a tela anterior." className="xl:w-auto xl:h-9" />
                </button>
            </div>
            <form onSubmit={handleSubmit(sendData)} className={`flex flex-col w-full min-h-[calc(100%-36px)] gap-2 ${edit == "true" ? 'pb-28' : 'pb-0'}
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
                    <img src={previewImg!} alt="Imagem do registro." className={`w-full h-50 object-cover object-center md:h-[calc(100%-36px)] ${edit == "true" ? 'opacity-70' : ''}`} />
                    <div className="flex justify-between items-center w-full h-8 font-nunito text-primary italic">
                        <InputDefault {...register("date", { required: "Data inválida!" })} readOnly={edit == "false"} type="date" className={`h-7 mt-1 font-semibold ${edit == "true" ? 'border-2 border-primary rounded-sm w-28 text-center' : ''}`} />
                        {errors.date && <p className="text-red-600/70 text-sm font-nunito">{errors.date.message}</p>}
                        <span>{Date.subDaysFormated(anotation!.date)}</span>
                    </div>
                    <span className={`absolute top-[calc(50%-40px)] w-full justify-center font-semibold text-2xl ${edit == "true" ? 'flex' : 'hidden'}`}>Clique para Alterar imagem</span>
                </label>
                <input onChange={(e) => changePreview(e)} type="file" id="image" accept="JPG, PNG" className="hidden" />
                {errors.content && <p className="text-red-600/70 text-sm font-nunito">{errors.content.message}</p>}
                <textarea {...register("content", { required: "Descrição inválida!" })} readOnly={edit == "false"} className={`w-full h-full grow font-nunito outline-none text-justify ${edit == "true" ? 'rounded-sm border-2 border-primary p-2' : ''}
                xl:text-lg`}></textarea>
                <div className={`absolute  flex flex-col w-full justify-end items-center h-26 bottom-0 ${edit == "true" ? 'flex' : 'hidden'}
                xl:w-[80%]`}>
                    <div className="flex justify-between w-full h-[calc(100%-48px)]">
                        <ul className="flex justify-end w-full h-full py-1">
                            {colors.map((color) => (
                                <li key={color.color} className={`${colorSelected == color.color ? 'border border-accent' : ''}`}>
                                    <button type="button" onClick={() => setColorSelected(color.color)} style={{ backgroundColor: color.color }} className="w-10 h-full"></button>
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
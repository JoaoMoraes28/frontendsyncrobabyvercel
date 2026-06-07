import { useNavigate } from "react-router-dom"

import SetPurple from "../../../assets/setPupleDirection.svg"
import Edit from "../../../assets/editIcon.svg"

import Date from "../../../utils/Date.ts"
import { useState } from "react"
import type { ModelDiary } from "../../../services/diary/diary.service.ts"

interface Props {
    card: ModelDiary
}

export interface Register {
    id: number
    title: string
    creation_date: string
    label_color?: string
    midia?: string
    text_content: string
}

function Card({ card }: Props) {
    const navigate = useNavigate()

    const [cardHover, setCardHover] = useState<number>(0)

    function handleAnotationPage(id: number, e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        navigate(`/anotation-diary/${id}?edit=true`)
    }

    return (
        <li onMouseEnter={() => setCardHover(card.id_diary_note)} onMouseLeave={() => setCardHover(0)} className="relative w-full h-28 flex rounded-sm bg-white shadow-purple-sm
        xl:relative xl:h-82 xl:rounded-lg xl:bg-cover xl:bg-no-repeat xl:bg-center xl:hover:scale-101 xl:hover:shadow-purple-md xl:transition xl:duration-300">
            <div className="xl:absolute xl:w-full xl:h-full xl:bg-cover xl:opacity-60 xl:rounded-lg xl:bg-no-repeat xl:bg-center z-10" style={{backgroundImage: `url(${card.media})`}}></div>
            <div className="z-20 w-15 h-full rounded-l-sm
            xl:absolute xl:w-full xl:h-12 xl:flex xl:items-center xl:justify-end xl:rounded-tr-sm xl:rounded-l-none xl:rounded-tl-sm xl:px-4">
                <div style={{ backgroundColor: card.color }} className="h-full w-15 rounded-l-lg xl:hidden"></div>
                <div style={{ backgroundColor: card.color }} className="hidden xl:flex xl:px-2 xl:w-auto xl:h-[85%] xl:rounded-lg xl:text-[#A49B9B] xl:font-semibold xl:justify-center xl:items-center">
                    <span className="xl:w-full xl:text-center xl:text-[18px]">{Date.formatedDayYear(card.date)}</span>
                </div>
            </div>
            <div className="z-20 flex flex-col w-[calc(100%-60px)] px-2 pt-2
            xl:pt-14 xl:w-full xl:h-full xl:px-4"> 
                <header className="w-full h-4 flex justify-end
                xl:h-[10%]">
                    <button onClick={(e) => handleAnotationPage(card.id_diary_note, e)}>
                        <img src={Edit} alt="Edita o registro do diário." className="w-auto h-3
                        xl:h-4.5" />
                    </button>
                </header>
                <div className="flex flex-col w-full xl:gap-4 h-16 justify-center items-center mt-1
                xl:h-[calc(80%-16px)] xl:items-start xl:mt-0">
                    <h4 className="font-poppins text-darker-purple font-semibold text-[14px] text-center
                    xl:text-start xl:text-xl">{card.title}</h4>
                    <span className="font-nunito text-primary italic text-[14px]
                    xl:hidden">{Date.formatedDate(card.date)}</span>
                    <p className="hidden xl:block xl:font-nunito xl:w-full xl:h-22 xl:text-black xl:overflow-hidden xl:text-[16px] xl:font-semibold">{card.content}</p>
                </div>
                <footer className="flex justify-end items-center h-[20%]">
                    <span className="font-nunito text-primary italic text-[12px] xl:hidden">{`${Date.subDaysFormated(card.date)}`}</span>
                    <img src={SetPurple} alt="Redireciona para página com o registro selecionado." className={`${cardHover == card.id_diary_note ? 'block' : 'hidden'}`} />
                </footer>
            </div>
        </li>
    )
}

export default Card
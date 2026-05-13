import { useNavigate } from "react-router-dom"

import SetPurple from "../../../assets/setPupleDirection.svg"
import Edit from "../../../assets/editIcon.svg"

import Date from "../../../utils/Date"
import { useState } from "react"

interface Props {
    card: Register
}

export interface Register {
    id: number
    title: string
    creation_date: string
    label_color?: string
    midia?: string
    text_content?: string
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
        <li onMouseEnter={() => setCardHover(card.id)} onMouseLeave={() => setCardHover(0)} className="w-full h-28 flex rounded-sm bg-white shadow-purple-sm
        xl:relative xl:h-62">
            <div style={{ backgroundColor: card.label_color }} className="w-15 h-full rounded-l-sm
            xl:absolute xl:w-full xl:h-8 xl:flex xl:items-center xl:pl-2 xl:rounded-tr-sm xl:rounded-l-none xl:rounded-tl-sm">
                <div className="hidden xl:flex xl:pl-3 xl:w-full xl:h-[85%] xl:text-white xl:font-semibold xl:justify-center xl:items-center">
                    <span className="xl:w-full xl:text-[18px]">{Date.formatedDayYear(card.creation_date)}</span>
                </div>
            </div>
            <div className="flex flex-col w-[calc(100%-60px)] px-2 pt-2
            xl:pt-9 xl:w-full xl:h-full xl:px-4"> 
                <header className="w-full h-4 flex justify-end
                xl:h-[10%]">
                    <button onClick={(e) => handleAnotationPage(card.id, e)}>
                        <img src={Edit} alt="Edita o registro do diário." className="w-auto h-3
                        xl:h-4.5" />
                    </button>
                </header>
                <div className="flex flex-col w-full h-16 justify-center items-center mt-1
                xl:h-[70%] xl:justify-between xl:items-start">
                    <h4 className="font-poppins text-primary-text font-semibold text-[14px] text-center
                    xl:text-start xl:text-xl">{card.title}</h4>
                    <span className="font-nunito text-primary italic text-[14px]
                    xl:hidden">{Date.formatedDate(card.creation_date)}</span>
                    <p className="hidden xl:block xl:font-nunito xl:w-full xl:h-22 xl:overflow-hidden xl:text-[14px]">{card.text_content}</p>
                </div>
                <footer className="flex justify-end items-center h-[20%]">
                    <span className="font-nunito text-primary italic text-[12px] xl:hidden">{`${Date.subDaysFormated(card.creation_date)}`}</span>
                    <img src={SetPurple} alt="Redireciona para página com o registro selecionado." className={`${cardHover == card.id ? 'block' : 'hidden'}`} />
                </footer>
            </div>
        </li>
    )
}

export default Card
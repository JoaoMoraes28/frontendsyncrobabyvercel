import { InputDefault } from "../../components/InputDefault.tsx"

import Search from "../../assets/search.svg"
import Plus from "../../assets/plusWhite.svg"
import { useEffect, useState } from "react"
import Card from "./components/Card.tsx"

import { Link } from "react-router-dom"
import ChildrenSelect from "../../layouts/ChildrenSelect.tsx"
import { useGetDiary } from "../../services/hooks/diary/useGetDiary.ts"
import type { ModelDiary } from "../../services/diary/diary.service.ts"

function Diary() {
    const idChild:number = Number(localStorage.getItem("select_child"))
    const {data: onGetDiary} = useGetDiary(idChild)

    const [childSelected, setChildSelected] = useState<number>(1)

    const [registerMain, setRegisterMain] = useState<ModelDiary[]>([])
    const [register, setRegister] = useState<ModelDiary[]>([])

    function filterRegister(text: string) {
        const newData: ModelDiary[] = registerMain.filter(it => it.title.toLowerCase().includes(text.toLowerCase()))
        setRegister(newData)
    }

    useEffect(() => {
        setRegister(registerMain)
    }, [])

    useEffect(() => {
        console.log(onGetDiary)
        if(!onGetDiary)
            return 
        if(onGetDiary){
            setRegisterMain(onGetDiary.diary)
            setRegister(onGetDiary.diary)
        }
    }, [onGetDiary])

    return (
        <div className="relative flex flex-col items-center w-full min-h-full pb-8">
            <div className="hidden xl:w-full xl:h-14 xl:flex xl:justify-between xl:items-center xl:bg-light">
                <div className="xl:flex">
                    <ChildrenSelect idChild={childSelected} setChild={setChildSelected} />
                </div>
                <Link
                    to="/new-anotation"
                    className="xl:flex xl:justify-center xl:items-center xl:w-[30%] xl:max-w-90 xl:h-10 xl:bg-accent xl:rounded-sm xl:text-white xl:font-poppins xl:font-semibold xl:relative">
                    <img aria-hidden="true" src={Plus} alt="" className="xl:absolute xl:left-5" />
                    Adicionar novo registro
                </Link>
            </div>
            <div
                className="flex w-full h-9 rounded-2xl bg-lilas shadow-purple-sm px-2
                    md:hidden
                    xl:w-2/3"
            >
                <img aria-hidden="true" src={Search} alt="" className="w-4 h-auto" />
                <InputDefault onChange={(e) => filterRegister(e.target.value)} className="w-full pl-2 font-poppins text-primary-text" />
            </div>
            <ul className="flex flex-col w-full gap-4 py-8 overflow-y-scroll
            xl:grid xl:grid-cols-2 xl:justify-items-center">
                {register.map((it) => (
                    <Link to={`/anotation-diary/${it.id_diary_note}?edit=false`}
                        key={it.id_diary_note}
                        className="xl:w-[85%] xl:h-full">
                        <Card card={it} />
                    </Link>
                ))}
            </ul>
            <div className="fixed bottom-22 w-full h-14 flex justify-center items-center bg-light
            md:bottom-28
            xl:hidden">
                <Link
                    to="/new-anotation"
                    className="flex justify-center items-center w-2/3 h-10 bg-accent rounded-sm text-white font-poppins font-semibold">
                    Adicionar novo registro
                </Link>
            </div>
        </div>
    )
}

export default Diary
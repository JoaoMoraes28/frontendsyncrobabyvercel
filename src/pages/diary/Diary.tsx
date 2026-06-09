import { InputDefault } from "../../components/InputDefault.tsx"

import Search from "../../assets/search.svg"
import Plus from "../../assets/plusWhite.svg"
import { useEffect, useState } from "react"
import Card from "./components/Card.tsx"

import { Link, useNavigate } from "react-router-dom"
import { useGetDiary } from "../../services/hooks/diary/useGetDiary.ts"
import type { ModelDiary } from "../../services/diary/diary.service.ts"
import { LoadingBaby } from "../../components/LoadingBaby.tsx"
import { EmptyState } from "../../components/EmptyState.tsx"

function Diary() {
    const idChild: number = Number(localStorage.getItem("select_child"))
    const { data: onGetDiary, isLoading, isError } = useGetDiary(idChild)

    const [registerMain, setRegisterMain] = useState<ModelDiary[]>([])
    const [register, setRegister] = useState<ModelDiary[]>([])
    const navigate = useNavigate()

    function filterRegister(text: string) {
        const newData: ModelDiary[] = registerMain.filter(it => it.title.toLowerCase().includes(text.toLowerCase()))
        setRegister(newData)
    }

    useEffect(() => {
        if (!onGetDiary) {
            setRegisterMain([])
            setRegister([])
        }
        
        if (onGetDiary) {
            setRegisterMain(onGetDiary.diary)
            setRegister(onGetDiary.diary)
        }
    }, [onGetDiary])

    return (
        <div className="relative flex flex-col items-center w-full min-h-full pb-8">
            <div className="hidden xl:w-full xl:h-14 xl:flex xl:justify-end xl:items-center xl:bg-light">
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
                {isLoading && !isError && <LoadingBaby text="Buscando lembranças" />}

                {!isLoading && isError && <p className="text-red-500 font-poppins col-span-full text-center mt-4">
                    Erro ao buscar lembranças. Tente novamente mais tarde.
                </p>}

                {!isLoading && !isError && register.length == 0 &&
                    <EmptyState
                        buttonText="Adicionar lembrança"
                        onButtonClick={() => navigate("/new-anotation")}
                        description="Pareçe que nenhum lembrança foi criada..."
                        title="Sem registros no diário"
                        show404Background={false}
                        isFullPage={false}
                    />
                }

                {!isLoading && !isError && register.length > 0 &&
                    register.map((it) => {
                        return (
                            <Link to={`/anotation-diary/${it.id_diary_note}?edit=false`}
                                key={it.id_diary_note}
                                className="xl:w-[85%] xl:h-full">
                                <Card card={it} />
                            </Link>
                        )
                    })
                }

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
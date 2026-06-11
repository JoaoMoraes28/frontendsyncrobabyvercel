import { InputDefault } from "../../components/InputDefault"
import { addDays, isSameDay, subDays } from 'date-fns';
import { useEffect, useState } from "react"

import Card from './components/HourCard'
import DateUtils from '../../utils/Date.ts'
import { LoadingBaby } from "../../components/LoadingBaby.tsx";

import IconFeeding from '../../assets/routines/iconRoutineFood.svg'
import IconSleep from '../../assets/routines/iconRoutineSleep.svg'
import IconDiaper from '../../assets/routines/iconRoutineDiaper.svg'
import IconShower from '../../assets/routines/iconRoutineShower.svg'
import IconMedicine from '../../assets/routines/iconRoutineMedicine.svg'
import IconFeedingDesktop from '../../assets/routines/foodingDesktopIcon.svg'
import IconSleepDesktop from '../../assets/routines/sleepDesktopIcon.svg'
import IconDiaperDesktop from '../../assets/routines/diaperDesktopIcon.svg'
import IconShowerDesktop from '../../assets/routines/showerDesktopIcon.svg'
import IconMedicineDesktop from '../../assets/routines/medicineDesktopIcon.svg'
import SetBlack from '../../assets/routines/setBlack.svg'
import Search from '../../assets/searchLight.svg'
import { Link } from "react-router-dom";

import { useGetRoutinesByChild } from "../../services/hooks/routines/useGetRoutines.ts";
import { useDeleteRoutines } from "../../services/hooks/routines/useDeleteRoutines.ts";
import type { Routine } from "../../services/routines/routines.service.ts";
import { EmptyState } from "../../components/EmptyState.tsx";

interface IconsRoutine {
    id: number
    name: string
    image: string
    imageDesktop: string
    description: string
    path: string
}

export interface RoutineData {
    child: number
    time: string
    date: string
    duration: string
    description: string | null
    title: string
    log_type: string
    id: number
}

const iconsRoutine: IconsRoutine[] = [
    {
        "id": 1,
        "name": "Alimentação",
        "image": IconFeeding,
        "imageDesktop": IconFeedingDesktop,
        "description": "Icone que redireciona para a página de rotina de alimentação.",
        "path": "/feeding"
    },
    {
        "id": 2,
        "name": "Sono",
        "image": IconSleep,
        "imageDesktop": IconSleepDesktop,
        "description": "Icone que redireciona para a página de rotina de sono.",
        "path": "/sleep"
    },
    {
        "id": 3,
        "name": "Fraldas",
        "image": IconDiaper,
        "imageDesktop": IconDiaperDesktop,
        "description": "Icone que redireciona para a página de rotina de troca de fraldas.",
        "path": "/diaper"
    },
    {
        "id": 4,
        "name": "Banho",
        "image": IconShower,
        "imageDesktop": IconShowerDesktop,
        "description": "Icone que redireciona para a página de rotina de banho.",
        "path": "/shower"
    },
    {
        "id": 5,
        "name": "Medicamentos",
        "image": IconMedicine,
        "imageDesktop": IconMedicineDesktop,
        "description": "Icone que redireciona para a página de rotina de medicação.",
        "path": "/medicine"
    }
]

function Routines() {
    const idChild: number = Number(localStorage.getItem("select_child"))
    const [searchDateRoutine, setSearchDateRoutine] = useState<string>(DateUtils.getDateUTC().split("T")[0])
    const { mutate: onDeleteRoutines } = useDeleteRoutines()

    const { data: onGetRoutines, isLoading, isError } = useGetRoutinesByChild(idChild, searchDateRoutine)

    const [routineData, setRoutineData] = useState<Routine[]>([])
    const [hourRoutine, setHourRoutine] = useState<string>("")
    const [visibilityTrash, setVisibilityTrash] = useState<boolean>(true)
    const [dayFunction, setDayFunction] = useState<Date>()
    const [dayFilterRotine, setDayFilterRotine] = useState<string>("")
    const [countFooding, setCountFooding] = useState<number>(0)
    const [countSleep, setCountSleep] = useState<string>("")
    const [countShower, setCountShower] = useState<number>(0)
    const [countDiaper, setCountDiaper] = useState<number>(0)

    function addClickedArray(routine: Routine[]) {
        const newRoutine: RoutineData[] = routine.map((it) => {
            it.asClicked = false

            return it
        })

        addIconArray(newRoutine)

    }

    function addIconArray(routine: Routine[]) {
        const newRoutine: Routine[] = routine.map((it) => {
            if (it.log_type == "banho") {
                it.imageDesk = IconShowerDesktop
                return it

            } else if (it.log_type == "fralda") {
                it.imageDesk = IconDiaperDesktop
                return it

            } else if (it.log_type == "alimentacao") {
                it.imageDesk = IconFeedingDesktop
                return it

            } else if (it.log_type == "medicacao") {
                it.imageDesk = IconMedicineDesktop
                return it

            } else if (it.log_type == "sono") {
                it.imageDesk = IconSleepDesktop
                return it

            }

            return it
        })

        setRoutineData(newRoutine)
    }

    function onClickedCard(id: string) {
        const newRoutine: Routine[] = routineData.map((it) => {
            if (`${it.log_type}${it.id}` == id) {
                it.asClicked = !it.asClicked
            }

            return it
        })

        setRoutineData(newRoutine)
    }

    function countRoutineResume(routines: RoutineData[]) {
        let sleepCount: number = 0
        const counts = { alimentacao: 0, fralda: 0, banho: 0 }

        routines.forEach((routine) => {
            if (routine.log_type == "alimentacao") {
                counts.alimentacao++

            } else if (routine.log_type == "fralda") {
                counts.fralda++

            } else if (routine.log_type == "banho") {
                counts.banho++

            } else if (routine.log_type == "sono") {
                if (routine.duration != null || routine.duration != undefined) {
                    let [h, m, s] = routine.duration.split(":").map(Number)

                    h = h * 3600
                    m = m * 60

                    sleepCount = sleepCount + h + m + s

                }
            }
        })

        const hours = Math.floor(sleepCount / 3600)
        const minutes = Math.floor((sleepCount % 3600) / 60)
        const seconds = Math.floor(sleepCount % 60)

        const format = (n: number) => String(n).padStart(2, "0")

        const sleepTime: string = `${format(hours)}:${format(minutes)}:${format(seconds)}`

        setCountFooding(counts.alimentacao)
        setCountDiaper(counts.fralda)
        setCountShower(counts.banho)
        setCountSleep(sleepTime)
    }

    function dateRoutine(operator: 'more' | 'less') {
        if (dayFunction) {
            if (operator == 'more' && !isSameDay(DateUtils.date, dayFunction)) {
                setSearchDateRoutine(addDays(searchDateRoutine, 1).toISOString())
                setHourRoutine(addDays(searchDateRoutine, 1).toISOString().split("T")[0])

                setDayFunction(addDays(dayFunction, 1))

                setDayFilterRotine(DateUtils.calculateDaysFormated(dayFunction, operator))

            } else if (operator == 'less') {
                setSearchDateRoutine(subDays(searchDateRoutine, 1).toISOString())
                setHourRoutine(subDays(searchDateRoutine, 1).toISOString().split("T")[0])

                setDayFunction(subDays(dayFunction, 1))

                setDayFilterRotine(DateUtils.calculateDaysFormated(dayFunction, operator))

            }

        }

    }

    function valideVisibilityTrash() {
        const today: string[] = DateUtils.getDateUTC().split("T")

        today[0] == hourRoutine ? setVisibilityTrash(true) : setVisibilityTrash(false)

        changeDayInput()
    }

    function changeDayInput() {
        const dateParse: string[] = hourRoutine.split("-")
        const date: Date = new Date(Number(dateParse[0]), Number(dateParse[1]) - 1, Number(dateParse[2]))

        setDayFilterRotine(DateUtils.calculateDaysFormated(hourRoutine, 'none'))
        setDayFunction(date)
        setSearchDateRoutine(hourRoutine)
    }

    function onDeleteCard(id: string) {
        const values: string[] = id.split("/")

        let type: string = ""

        if (values[0] == "sono") {
            type = "sleep"

        } else if (values[0] == "banho") {
            type = "bath"

        } else if (values[0] == "alimentacao") {
            type = "feeding"

        } else if (values[0] == "fralda") {
            type = "diaper"

        } else if (values[0] == "medicacao") {
            type = "medication"

        }

        onDeleteRoutines(
            {
                id_register: Number(values[1]),
                type: type
            },
            {
                onSuccess: () => {
                    const newRoutine: Routine[] = routineData.filter((it: RoutineData) => `${it.log_type}/${it.id}` != id)

                    setRoutineData(newRoutine)
                    countRoutineResume(newRoutine)
                }, onError: () => {
                    alert("Erro ao deletar rotina!")
                }
            }
        )
    }

    useEffect(() => {
        setDayFunction(DateUtils.date)
        setDayFilterRotine(DateUtils.getDateFormated())
    }, [])

    useEffect(() => {
        if (dayFunction) {
            if (!isSameDay(DateUtils.date, dayFunction)) {

                setVisibilityTrash(false)

            } else {
                setVisibilityTrash(true)

            }
        }
    }, [dayFunction])

    useEffect(() => {
        if (!onGetRoutines) {
            return
        }

        if (onGetRoutines) {
            countRoutineResume(onGetRoutines.routines)
            addClickedArray(onGetRoutines.routines)
        }
    }, [onGetRoutines])

    return (
        <div className="flex flex-col w-screen
            xl:w-full">
            <div className="w-full h-11
                xl:flex xl:justify-end xl:h-15">
                <div className="relative flex gap-1 w-full h-14 text-lilas-dark rounded-2xl border-2 shadow-purple-sm border-primary-darker
                    xl:w-67 xl:h- xl:border-0 xl:justify-center">
                    <div className="hidden xl:absolute xl:flex xl:justify-around xl:items-center xl:w-full xl:h-full xl:rounded-2xl xl:bg-white">
                        <button onClick={() => dateRoutine('less')}>
                            <img src={SetBlack} alt="Icone para voltar um dia na rotina." />
                        </button>
                        <p className="xl:flex xl:justify-center xl:items-center xl:w-52 xl:h-full xl:text-black xl:font-bold xl:text-[14px]">{dayFilterRotine}</p>
                        <button onClick={() => dateRoutine('more')}>
                            <img src={SetBlack} alt="Icone para avançar um dia na rotina." className="rotate-180" />
                        </button>
                    </div>
                    <InputDefault onChange={(e) => setHourRoutine(e.target.value)} value={hourRoutine} type="date" className="w-[calc(100%-30px)] pl-2
                        xl:w-[55%] xl:font-bold" />
                    <button onClick={valideVisibilityTrash}>
                        <img src={Search} alt="Icone de busca para pesquisar uma rotina específica pela data." className="w-4 h-auto xl:hidden" />
                    </button>
                </div>
            </div>
            <div className="flex flex-col
                xl:flex-row-reverse xl:justify-between xl:w-full xl:h-[calc(100%-60px)] xl:pt-5">
                <div className="flex flex-col
                    xl:w-[45%] xl:justify-between">
                    <section className="mt-8
                        md:mt-5
                        xl:flex xl:flex-col xl:justify-evenly xl:w-full xl:h-[45%] xl:rounded-sm xl:bg-primary xl:font-poppins">
                        <h3 className="hidden xl:flex xl:justify-center xl:w-full xl:text-white xl:font-bold xl:text-[2rem]">Novo Registro</h3>
                        <ul className="flex justify-between w-full h-22
                                xl:w-full xl:h-2/3 xl:flex-wrap xl:flex-row xl:justify-center xl:gap-2 xl:px-3">
                            {iconsRoutine.map((icon) => (
                                <Link key={icon.id} to={icon.path} className="w-15 h-15 bg-primary rounded-lg
                                                md:h-22 md:w-22
                                                xl:w-[30%] xl:h-[34%] xl:bg-lilas xl:rounded-2xl xl:hover:bg-white xl:hover:scale-103 xl:transition xl:duration-300">
                                    <li className="flex w-full h-full justify-center items-center
                                            xl:flex xl:flex-col xl:text-black xl:font-semibold xl:justify-evenly" >
                                        <picture>
                                            <source media="(min-width: 1280px)" srcSet={icon.imageDesktop} />

                                            <img src={icon.image} alt={icon.description} className="md:w-auto h-11
                                                    xl:h-[110%]" />
                                        </picture>
                                        <span className="hidden xl:flex xl:justify-center xl:w-full xl:text-[80%] xl:font-semibold">{icon.name}</span>

                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </section>
                    <section className="hidden
                    xl:flex xl:flex-col xl:justify-between xl:w-full xl:h-[40%] xl:p-3 xl:bg-white xl:shadow-purple-md xl:rounded-2xl">
                        <h3 className="xl:text-2xl xl:font-semibold xl:font-poppins">Resumo diário</h3>
                        <div className="xl:flex xl:flex-col xl:h-[80%] xl:justify-around">
                            <div className="xl:flex xl:items-center xl:font-nunito xl:font-semibold xl:text-lg">
                                <img aria-hidden="true" src={IconFeedingDesktop} alt="" className="xl:w-auto xl:h-8" />
                                <dt className="xl:ml-3 xl:text-[16px]">Alimentação: </dt>
                                <dd className="xl:ml-1 xl:font-extralight xl:text-[14px]">Comeu {countFooding} vez(es)</dd>
                            </div>
                            <div className="xl:flex xl:items-center xl:font-nunito xl:font-semibold xl:text-lg">
                                <img aria-hidden="true" src={IconSleepDesktop} alt="" className="xl:w-auto xl:h-7" />
                                <dt className="xl:ml-3 xl:text-[16px]">Sono: </dt>
                                <dd className="xl:ml-1 xl:font-extralight xl:text-[14px]">Dormiu por {countSleep}</dd>
                            </div>
                            <div className="xl:flex xl:items-center xl:font-nunito xl:font-semibold xl:text-lg">
                                <img aria-hidden="true" src={IconShowerDesktop} alt="" className="xl:w-auto xl:h-7" />
                                <dt className="xl:ml-3 xl:text-[16px]">Banho: </dt>
                                <dd className="xl:ml-1 xl:font-extralight xl:text-[14px]">Tomou banho {countShower} vez(es)</dd>
                            </div>
                            <div className="xl:flex xl:items-center xl:font-nunito xl:font-semibold xl:text-lg">
                                <img aria-hidden="true" src={IconDiaperDesktop} alt="" className="xl:w-auto xl:h-6" />
                                <dt className="xl:ml-3 xl:text-[16px]">Troca de fraldas: </dt>
                                <dd className="xl:ml-1 xl:font-extralight xl:text-[14px]">Trocou a fralda {countDiaper} vez(es)</dd>
                            </div>
                        </div>
                    </section>
                </div>
                <section className="relative pb-39
                md:mt-4
                xl:w-[45%] xl:bg-lilas xl:rounded-sm xl:pb-0 xl:overflow-y-auto">
                    <ul className="flex flex-col w-full gap-4 py-4 pb-8
                    xl:items-end xl:px-4 xl:py-6 xl:relative xl:gap-6 xl:min-h-full">
                        {isLoading && <LoadingBaby text="Buscando rotinas" />}

                        {!isLoading && isError &&
                            <p className="text-red-500 font-poppins col-span-full text-center mt-4">
                                Erro ao carregar a API
                            </p>
                        }

                        {!isLoading && !isError && onGetRoutines?.routines.length == 0 &&
                            <EmptyState
                                title="Está tudo tão calmo..."
                                description="Pareçe que nenhuma rotina foi cadastrada nesse dia."
                                buttonText="Registre uma rotina ao lado"
                                isFullPage={false}
                                show404Background={false}
                                onButtonClick={() => { }}
                            ></EmptyState>
                        }

                        {!isLoading && !isError && onGetRoutines!.routines.length > 0 &&
                            (
                                <>
                                    <div className="absolute top-0 left-26 w-1 min-h-[55dvh] h-full bg-primary
                                        md:min-h-[70dvh] md:left-38
                                        xl:min-h-full xl:bg-white xl:left-[calc(9%+20px)]"></div>
                                    {routineData.map((routine) => (
                                        <Card key={`${routine.log_type}${routine.id}`} routineData={routine} visibilityTrash={visibilityTrash} onClick={onClickedCard} onDelete={onDeleteCard} />
                                    ))}
                                </>
                            )
                        }
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default Routines
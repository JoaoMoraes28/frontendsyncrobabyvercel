import { InputDefault } from "../../components/InputDefault"
import { addDays, isSameDay, subDays } from 'date-fns';
import { useEffect, useState } from "react"

import Card from './components/HourCard'
import Date from '../../utils/Date'

import ChildrenSelect from "../../layouts/ChildrenSelect"
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

interface IconsRoutine {
    id: number
    name: string
    image: string
    imageDesktop: string
    description: string
    path: string
}

export interface RoutineData {
    id: number
    date: string
    hours?: string
    type: string
    title?: string
    description: string | null
    asClicked?: boolean
    imageDesk?: string
    end_time?: string
    start_time?: string
    time?: string
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
    const [childrenSelected, setChildSelected] = useState<number>(1)
    const [routineData, setRoutineData] = useState<RoutineData[]>([
        {
            "id": 1,
            "date": "2026-04-01",
            "hours": "11:36",
            "type": "alimentacao",
            "title": "Alimento sólido(Maçã)",
            "description": null
        },
        {
            "id": 2,
            "date": "2026-04-01",
            "hours": "14:36",
            "type": "fralda",
            "title": "Fralda(Xixi)",
            "description": null
        },
        {
            "id": 3,
            "date": "2026-04-01",
            "hours": "19:36",
            "type": "alimentacao",
            "title": "Leite e derivados",
            "description": "Nova fórmula utilizada na alimentação. O bebê se adaptou sem dificuldades ou resistências."
        },
        {
            "id": 4,
            "title": "Hora da soneca",
            "date": "2026-08-09",
            "hours": "11:38",
            "type": "sono",
            "end_time": "12:56",
            "time": "01:18:00",
            "description": null
        },
        {
            "id": 5,
            "title": "Hora da soneca",
            "date": "2026-08-09",
            "hours": "15:38",
            "type": "sono",
            "end_time": "16:06",
            "time": "01:28:00",
            "description": "Acordou algumas vezes chorando"
        }
    ])
    const [hourRoutine, setHourRoutine] = useState<string>("")
    const [visibilityTrash, setVisibilityTrash] = useState<boolean>(true)
    const [dayFunction, setDayFunction] = useState<Date>()
    const [dayFilterRotine, setDayFilterRotine] = useState<string>("")
    const [countFooding, setCountFooding] = useState<number>(0)
    const [countSleep, setCountSleep] = useState<string>("")
    const [countShower, setCountShower] = useState<number>(0)
    const [countDiaper, setCountDiaper] = useState<number>(0)

    function addClickedArray(routine: RoutineData[]) {
        const newRoutine: RoutineData[] = routine.map((it) => {
            it.asClicked = false

            return it
        })

        addIconArray(newRoutine)

    }

    function addIconArray(routine: RoutineData[]) {
        const newRoutine: RoutineData[] = routine.map((it) => {
            if (it.type == "banho") {
                it.imageDesk = IconShowerDesktop
                return it

            } else if (it.type == "fralda") {
                it.imageDesk = IconDiaperDesktop
                return it

            } else if (it.type == "alimentacao") {
                it.imageDesk = IconFeedingDesktop
                return it

            } else if (it.type == "remedio") {
                it.imageDesk = IconMedicineDesktop
                return it

            } else if (it.type == "sono") {
                it.imageDesk = IconSleepDesktop
                return it

            }

            return it
        })

        setRoutineData(newRoutine)
    }

    function onClickedCard(id: number) {
        const newRoutine: RoutineData[] = routineData.map((it) => {
            if (it.id == id) {
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
            if (routine.type == "alimentacao") {
                counts.alimentacao++

            } else if (routine.type == "fralda") {
                counts.fralda++

            } else if (routine.type == "banho") {
                counts.banho++

            } else if (routine.type == "sono") {
                if (routine.time != null || routine.time != undefined) {
                    let [h, m, s] = routine.time.split(":").map(Number)

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
            if (operator == 'more' && !isSameDay(Date.date, dayFunction)) {
                setDayFunction(addDays(dayFunction, 1))

                setDayFilterRotine(Date.calculateDaysFormated(dayFunction, operator))

            } else if (operator == 'less') {
                setDayFunction(subDays(dayFunction, 1))

                setDayFilterRotine(Date.calculateDaysFormated(dayFunction, operator))

            }

        }

    }

    function onDeleteCard(id: number) {
        const newRoutine: RoutineData[] = routineData.filter((it: RoutineData) => it.id != id)

        setRoutineData(newRoutine)
        countRoutineResume(newRoutine)
    }

    function valideVisibilityTrash() {
        const today: string[] = Date.getDateUTC().split("T")

        today[0] == hourRoutine ? setVisibilityTrash(true) : setVisibilityTrash(false)
    }

    useEffect(() => {
        addClickedArray(routineData)
        countRoutineResume(routineData)
        setDayFunction(Date.date)
        setDayFilterRotine(Date.getDateFormated())
    }, [])

    useEffect(() => {
        if (dayFunction) {
            if (!isSameDay(Date.date, dayFunction)) {

                setVisibilityTrash(false)

            } else {
                setVisibilityTrash(true)

            }
        }
    }, [dayFunction])

    return (
        <div className="flex flex-col w-screen
            xl:w-full">
            <div className="w-full h-11
                xl:flex xl:justify-between xl:h-15">
                <ChildrenSelect idChild={childrenSelected} setChild={setChildSelected} />

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
                    <button onClick={() => valideVisibilityTrash()}>
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
                        xl:flex xl:flex-col xl:justify-evenly xl:w-full xl:h-[45%] xl:rounded-2xl xl:bg-primary xl:font-poppins">
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
                xl:w-[45%] xl:bg-lilas xl:rounded-2xl xl:shadow-purple-sm xl:pb-0 xl:overflow-y-auto">
                    <ul className="flex flex-col w-full gap-4 py-4 pb-8
                    xl:items-end xl:px-4 xl:py-6 xl:relative xl:gap-6 xl:min-h-full">
                        <div className="absolute top-0 left-26 w-1 min-h-[55dvh] h-full bg-primary
                        md:min-h-[70dvh] md:left-38
                        xl:min-h-full xl:bg-white xl:left-[calc(9%+20px)]"></div>
                        {routineData.map((routine) => (
                            <Card key={routine.id} routineData={routine} visibilityTrash={visibilityTrash} onClick={onClickedCard} onDelete={onDeleteCard} />
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default Routines
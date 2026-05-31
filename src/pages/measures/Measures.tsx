import { useEffect, useState } from "react"

import { DropdownFilter, type FilterOption } from "../../components/DropDownFilter"

import Alert from "../../assets/alertAccent.svg"
import Plus from "../../assets/plusWhite.svg"

import Chart from "./components/Chart"
import ChildrenSelect from "../../layouts/ChildrenSelect"
import { Link } from "react-router-dom"

import { useGetHeightMeasures } from "../../services/hooks/measures/useGetHeightMeasures"
import { useGetWeightMeasures } from "../../services/hooks/measures/useGetWeightMeasures"
import { useGetHeadMeasures } from "../../services/hooks/measures/useGetHeadMeasures"
import { useGetBmiMeasures } from "../../services/hooks/measures/useGetBmiMeasures"

import type { ResponseMeasuresHeight } from "../../services/measures/measures.service"
import type { Height } from "../../services/measures/measures.service"
import type { Weight } from "../../services/measures/measures.service"
import type { Bmi } from "../../services/measures/measures.service"
import type { Head } from "../../services/measures/measures.service"

interface LabelDescription {
    label: string
    description: string
}

interface ResultDevelopment {
    id: number
    result: string
}

const filterOptions: FilterOption[] = [
    {
        id: "perimetro-cefalico",
        label: "Perímetro cefálico",
    },
    {
        id: "peso",
        label: "Peso"
    },
    {
        id: "altura",
        label: "Altura"
    },
    {
        id: "imc",
        label: "IMC"
    }
]

const descriptionMeasure: LabelDescription[] = [
    {
        label: "Perímetro cefálico",
        description: "Registre o perímetro cefálico para acompanhar o desenvolvimento, para isso use uma fita métrica para medir a circunferência da cabeça do seu bebê."
    },
    {
        label: "Peso",
        description: "Registre o peso para acompanhar o desenvolvimento, para isso pese um adulto segurando o bebê e depois pese o adulto sozinho; a diferença entre os dois valores será o peso do bebê."
    },
    {
        label: "Altura",
        description: "Registre a altura para acompanhar o desenvolvimento, para isso deite o bebê em uma superfície reta, estique suavemente as pernas e meça da cabeça aos pés com uma fita métrica."
    },
    {
        label: "IMC",
        description: "Registre o IMC para acompanhar o desenvolvimento, para isso atualize as medidas periodicamente (mensalmente ou a cada 2 meses)."
    },
]

function Measures() {
    const idChild: number = Number(localStorage.getItem("select_child"))
    const { data: onGetHeighMeasures, refetch: refetcHeight, isFetched: fetchHeigh } = useGetHeightMeasures(idChild)
    const { data: onGetWeighMeasures, refetch: refetchWeight, isFetched: fetchWeigh } = useGetWeightMeasures(idChild)
    const { data: onGetHeadMeasures } = useGetHeadMeasures(idChild)
    const { data: onGetBmiMeasures, refetch: refetchBMI, isFetched: fetchBmi } = useGetBmiMeasures(idChild)

    const [idChildSelected, setIdChild] = useState<number>(idChild)
    const [filterSelected, setFilterSelected] = useState<string>("Perímetro cefálico")
    const [dataChart, setDataChart] = useState<(Height | Weight | Bmi | Head)[]>([])
    const [lastRegister, setLastRegister] = useState<string>("Nenhum registro")
    const [beforeRegister, setBeforeRegister] = useState<string>("Nenhum registro")
    const [valueChart, setValueChart] = useState<string>("")
    const [developmentResult] = useState<ResultDevelopment>(
        {
            id: 1,
            result: "Desenvolvimento dentro do esperado para a idade"
        }
    )

    function setDescriptionForMeasure() {
        if (filterSelected == "Perímetro cefálico") {
            return descriptionMeasure[0].description

        } else if (filterSelected == "Peso") {
            return descriptionMeasure[1].description

        } else if (filterSelected == "Altura") {
            return descriptionMeasure[2].description

        } else if (filterSelected == "IMC") {
            return descriptionMeasure[3].description
        }
    }

    function getLastRegister(data: (Height | Head | Weight | Bmi)[]) {
        interface Value {
            value: string | null
        }

        if (data.length > 0) {
            const newArray: Value[] = data.map((it) => {
                let numberValue: number

                if ("height" in it) {
                    numberValue = Math.round(it.height! * 10) / 10
                    return {
                        value: `${numberValue}cm`
                    }

                } else if ("weight" in it) {
                    numberValue = Math.round(it.weight! * 10) / 10
                    return {
                        value: `${numberValue}kg`
                    }

                } else if ("head_circumference" in it) {
                    numberValue = Math.round(it.head_circumference! * 10) / 10
                    return {
                        value: `${numberValue}cm`
                    }

                } else if ("bmi" in it) {
                    numberValue = Math.round(it.bmi! * 10) / 10
                    return {
                        value: `${numberValue}`
                    }

                }

                return {
                    value: null
                }

            })

            setLastRegister(newArray[newArray.length - 1].value!)

            if (data.length > 1) {
                setBeforeRegister(newArray[newArray.length - 2].value!)
                
            }

        }

    }

    function changeDataChart(option: string) {
        if (option == "Peso") {
            setValueChart("weight")
            !fetchWeigh ? refetchWeight() : ''

            if (onGetWeighMeasures && typeof onGetWeighMeasures != 'string') {
                setDataChart(onGetWeighMeasures.weight)
                getLastRegister(onGetWeighMeasures.weight)

            }

        } else if (option == "Altura") {
            setValueChart("height")
            !fetchHeigh ? refetcHeight() : ''

            if (onGetHeighMeasures && typeof onGetHeighMeasures != 'string') {
                setDataChart(onGetHeighMeasures.height)
                getLastRegister(onGetHeighMeasures.height)
            }

        } else if (option == "IMC") {
            setValueChart("bmi")
            !fetchBmi ? refetchBMI() : ''

            if (onGetBmiMeasures && typeof onGetBmiMeasures != 'string') {
                setDataChart(onGetBmiMeasures.bmi)
                getLastRegister(onGetBmiMeasures.bmi)
            }

        } else if (option == "Perímetro cefálico") {
            setValueChart("head_circumference")

            if (onGetHeadMeasures && typeof onGetHeadMeasures != 'string') {
                setDataChart(onGetHeadMeasures.head_circumference)
                getLastRegister(onGetHeadMeasures.head_circumference)
            }

        }
    }

    useEffect(() => {
        if (!onGetHeighMeasures) {
            return
        }

        if (onGetHeighMeasures && typeof onGetHeighMeasures != 'string') {
            getLastRegister(onGetHeighMeasures.height)
            setValueChart("height")
            setDataChart(onGetHeighMeasures.height)
        }
    }, [onGetHeighMeasures])

    useEffect(() => {
        if (!onGetWeighMeasures) {
            return
        }

        if (onGetWeighMeasures && typeof onGetWeighMeasures != 'string') {
            getLastRegister(onGetWeighMeasures.weight)
            setValueChart("weight")
            setDataChart(onGetWeighMeasures.weight)
        }
    }, [onGetWeighMeasures])

    useEffect(() => {
        if (!onGetHeadMeasures) {
            return
        }

        if (onGetHeadMeasures && typeof onGetHeadMeasures != 'string') {
            getLastRegister(onGetHeadMeasures.head_circumference)
            setValueChart("head_circumference")
            setDataChart(onGetHeadMeasures.head_circumference)
        }
    }, [onGetHeadMeasures])

    useEffect(() => {
        if (!onGetBmiMeasures) {
            return
        }

        if (onGetBmiMeasures && typeof onGetBmiMeasures != 'string') {
            getLastRegister(onGetBmiMeasures.bmi)
            setValueChart("bmi")
            setDataChart(onGetBmiMeasures.bmi)
        }
    }, [onGetBmiMeasures])

    return (
        <div className="flex flex-col w-full min-h-full gap-3
        xl:gap-0">
            <div className="xl:flex xl:w-full">
                <ChildrenSelect idChild={idChild} setChild={setIdChild} />
            </div>
            <div className="flex justify-between items-center w-full
            xl:flex-col xl:justify-around xl:items-start xl:h-[23%]">
                <div className="block xl:hidden">
                    <DropdownFilter options={filterOptions} functionExtra={changeDataChart} selectedFilter={filterSelected} onSelect={setFilterSelected} />
                </div>
                <ul className="hidden xl:flex xl:gap-6">
                    {filterOptions.map((option) => (
                        <li key={option.id} className={`xl:flex xl:justify-center xl:items-center xl:font-nunito xl:rounded-lg xl:min-w-19 xl:h-9 xl:border ${filterSelected == option.label ? "bg-accent text-white border-accent shadow-sm"
                            : "bg-white text-gray-500 border-gray-200 hover:border-accent hover:text-accent"}`}>
                            <button onClick={() => {
                                setFilterSelected(option.label)
                                changeDataChart(option.label)
                            }} className="xl:w-full xl:h-full xl:px-4 xl:rounded-sm">
                                <span>{option.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="xl:flex xl:justify-between xl:w-full">
                    <h3 className="hidden xl:block xl:font-poppins xl:text-primary-text xl:font-bold xl:text-2xl">Gráfico de Desenvolvimento</h3>
                    <Link to="/update-measures"
                        className="flex justify-center items-center bg-accent text-white h-8 rounded-sm px-3
                        xl:relative xl:w-[40%] xl:max-w-100 xl:h-13 xl:shadow-purple-md">
                        <img aria-hidden="true" src={Plus} alt="" className="hidden xl:block xl:absolute xl:left-4" />
                        Atualizar dados
                    </Link>
                </div>
            </div>
            <section className="flex flex-col justify-evenly grow
            xl:flex-row-reverse xl:h-[77%] xl:justify-between">
                <section className="px-3 py-2 border border-primary rounded-sm
                xl:flex xl:flex-col-reverse xl:justify-between xl:w-[40%] xl:border-0 xl:shadow-none xl:px-0">
                    <div className="xl:flex xl:flex-col xl:rounded-sm xl:w-full xl:h-[55%] xl:px-3 xl:justify-evenly xl:bg-lilas-bg/60">
                        <div className="hidden xl:flex xl:gap-5 xl:px-2">
                            <img aria-hidden="true" src={Alert} alt="" className="xl:w-auto xl:h-8" />
                            <h4 className="xl:text-darker-purple xl:text-xl xl:font-semibold xl:font-poppins">Como medir</h4>
                        </div>
                        <p className="font-nunito text-primary-text italic text-[13px]
                        md:text-[16px]
                        xl:text-[20px] xl:text-gray-dark xl:px-2">
                            {setDescriptionForMeasure()}
                        </p>
                    </div>
                    <div className="flex flex-col font-poppins mt-2
                    xl:shadow-purple-sm xl:rounded-sm xl:w-full xl:h-[30%] xl:justify-evenly xl:items-center xl:px-3">
                        <dl className="flex flex-col gap-3 p-2 rounded-md
                        xl:w-full xl:gap-3 xl:h-full xl:justify-center">
                            <div className="flex justify-between bg-lilas-bg/70 rounded-md p-1
                            xl:bg-transparent">
                                <dt className="font-semibold text-primary-text">Hoje:</dt>
                                <dd className="flex justify-center items-center min-w-15 h-6 text-accent font-semibold
                                xl:rounded-lg xl:shadow-purple-sm xl:h-7 xl:min-w-17 xl:px-2">{lastRegister}</dd>
                            </div>
                            <div className="flex justify-between bg-lilas-bg/70 rounded-md p-1
                            xl:bg-transparent">
                                <dt className="font-semibold text-primary-text">Registro anterior: </dt>
                                <dd className="flex justify-center items-center min-w-15 h-6 text-accent font-semibold
                                xl:rounded-lg xl:shadow-purple-sm xl:h-7 xl:min-w-17 xl:px-2">{beforeRegister}</dd>
                            </div>
                        </dl>
                    </div>
                </section>
                <h3 className="font-poppins text-primary-text font-bold text-xl
                xl:hidden">Gráfico de desenvolvimento</h3>
                <div className="w-full h-[55%] min-h-80
                xl:w-[55%] xl:h-full">
                    <Chart data={dataChart} value_type={valueChart} />
                </div>
            </section>
        </div>
    )
}

export default Measures
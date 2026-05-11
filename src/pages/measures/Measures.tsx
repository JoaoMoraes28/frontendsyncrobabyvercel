import { useState } from "react"

import { DropdownFilter, type FilterOption } from "../../components/DropDownFilter"

import Alert from "../../assets/alertAccent.svg"
import Plus from "../../assets/plusWhite.svg"

import type { DataChart } from "./components/Chart"
import Chart from "./components/Chart"
import ChildrenSelect from "../../layouts/ChildrenSelect"
import { Link } from "react-router-dom"

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
        label: "Perímetro cefálico"
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
    const [idChild, setIdChild] = useState<number>(1)
    const [filterSelected, setFilterSelected] = useState<string>("Perímetro cefálico")
    const [dataChart] = useState<DataChart[]>([
        {
            month: "january",
            month_index: 1,
            records: [
                {
                    date: "2026-01-09",
                    value: 7
                },
                {
                    date: "2026-01-15",
                    value: 7.5
                },
                {
                    date: "2026-01-25",
                    value: 8.3
                },
                {
                    date: "2026-01-31",
                    value: 9.1
                }
            ]
        },
        {
            month: "february",
            month_index: 2,
            records: [
                {
                    date: "2026-02-09",
                    value: 10.1
                },
                {
                    date: "2026-02-15",
                    value: 11
                },
                {
                    date: "2026-02-25",
                    value: 11.9
                },
                {
                    date: "2026-02-31",
                    value: 13
                }
            ]
        }
    ])
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

    function setResultDevelopment() {
        if (developmentResult.result == "Desenvolvimento dentro do esperado para a idade") {
            return 'bg-green-alert text-green-dark xl:bg-green-result-measures-desk'

        } else if (developmentResult.result == "Desenvolvimento em média com esperado para a idade") {
            return 'bg-yellow-alert text-yellow-dark xl:bg-yellow-result-measures-desk'

        } else if (developmentResult.result == "Desenvolvimento abaixo do esperado para a idade") {
            return 'bg-red-alert text-red-dark xl:bg-red-result-measures-desk'

        }
    }

    return (
        <div className="flex flex-col w-full min-h-full gap-3
        xl:gap-0">
            <div className="xl:flex xl:w-full">
                <ChildrenSelect idChild={idChild} setChild={setIdChild} />
            </div>
            <div className="flex justify-between items-center w-full
            xl:flex-col xl:justify-around xl:items-start xl:h-[23%]">
                <div className="block xl:hidden">
                    <DropdownFilter options={filterOptions} selectedFilter={filterSelected} onSelect={setFilterSelected} />
                </div>
                <ul className="hidden xl:flex xl:gap-6">
                    {filterOptions.map((option) => (
                        <li key={option.id} className={`xl:flex xl:justify-center xl:items-center xl:font-nunito xl:rounded-lg xl:min-w-19 xl:h-9 xl:border ${filterSelected == option.label ? "bg-accent text-white border-accent shadow-sm"
                            : "bg-white text-gray-500 border-gray-200 hover:border-accent hover:text-accent"}`}>
                            <button onClick={() => setFilterSelected(option.label)} className="xl:w-full xl:h-full xl:px-4 xl:rounded-sm">
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
                    <div className="xl:flex xl:flex-col xl:rounded-sm xl:w-full xl:h-[45%] xl:px-3 xl:justify-evenly xl:bg-lilas-bg/60">
                        <div className="hidden xl:flex xl:gap-5 xl:px-2">
                            <img aria-hidden="true" src={Alert} alt="" className="xl:w-auto h-6" />
                            <h4 className="xl:text-darker-purple xl:text-lg xl:font-semibold xl:font-poppins">Como medir</h4>
                        </div>
                        <p className="font-nunito text-primary-text italic text-[13px]
                        md:text-[16px]
                        xl:text-[14px] xl:text-gray-dark xl:px-2">
                            {setDescriptionForMeasure()}
                        </p>
                        <div className="hidden xl:block xl:w-full xl:text-darker-purple xl:font-nunito xl:font-semibold text-[12px]">
                            <dl className="xl:flex xl:flex-col xl:gap-3">
                                <div className="xl:flex xl:justify-between">
                                    <dt>Hoje:</dt>
                                    <dd className="xl:shadow-purple-sm xl:rounded-lg xl:flex xl:justify-center xl:items-center xl:min-w-15 xl:h-6">33.9cm</dd>
                                </div>
                                <div className="xl:flex xl:justify-between">
                                    <dt>Fevereiro: </dt>
                                    <dd className="xl:flex xl:justify-center xl:items-center xl:min-w-15 xl:h-6">32cm</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="flex flex-col font-poppins mt-2
                    xl:shadow-purple-sm xl:rounded-sm xl:w-full xl:h-[50%] xl:justify-evenly xl:items-center xl:px-3">
                        <span className="text-primary-text font-semibold text-[14px]
                        md:text-[17px]
                        xl:hidden">Com base nos dados fornecidos seu bebê está com o:</span>
                        <div className="hidden xl:flex xl:w-full">
                            <div className={`xl:flex xl:justify-center xl:items-center xl:w-10 xl:h-10 xl:rounded-full
                                ${developmentResult.result == "Desenvolvimento dentro do esperado para a idade" ? 'xl:bg-green-measures/40'
                                    : developmentResult.result == "Desenvolvimento em média com esperado para a idade" ? 'xl:bg-yellow-measures/40'
                                        : 'xl:bg-red-measures/40'}`}>
                                <span
                                    className={`xl:w-6 xl:h-6 xl:rounded-full xl:flex xl:items-center xl:justify-center xl:text-white xl:border-2 xl:font-bold
                                        ${developmentResult.result == "Desenvolvimento dentro do esperado para a idade" ? 'xl:bg-green-measures'
                                            : developmentResult.result == "Desenvolvimento em média com esperado para a idade" ? 'xl:bg-yellow-measures'
                                                : 'xl:bg-red-measures'}`}
                                >
                                    {developmentResult.result == "Desenvolvimento dentro do esperado para a idade" ? '✓' : '!'}
                                </span>
                            </div>
                        </div>
                        <h4 className="hidden xl:flex xl:justify-start xl:w-full xl:text-darker-purple xl:text-xl xl:font-semibold">Status Atual</h4>
                        <span className={`${setResultDevelopment()} rounded-lg w-full h-18 font-bold p-2 mt-2 text-[18px]
                        md:text-[22px]
                        xl:text-[18px] xl:w-[90%] xl:shadow-purple-sm xl:pl-4`}>{developmentResult.result}</span>
                    </div>
                </section>
                <h3 className="font-poppins text-primary-text font-bold text-xl
                xl:hidden">Gráfico de desenvolvimento</h3>
                <div className="w-full h-[55%] min-h-80
                xl:w-[55%] xl:h-full">
                    <Chart data={dataChart} />
                </div>
            </section>
        </div>
    )
}

export default Measures
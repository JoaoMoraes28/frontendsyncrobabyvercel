import { useState } from "react"

import { DropdownFilter, type FilterOption } from "../../components/DropDownFilter"
import BtnPrimary from "../../components/BtnPrimary"

import type { DataChart } from "./components/Chart"
import Chart from "./components/Chart"

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
            return 'bg-green-alert text-green-dark'

        } else if (developmentResult.result == "Desenvolvimento em média com esperado para a idade") {
            return 'bg-yellow-alert text-yellow-dark'

        } else if (developmentResult.result == "Desenvolvimento abaixo do esperado para a idade") {
            return 'bg-red-alert text-red-dark'

        }
    }

    return (
        <div className="flex flex-col w-full min-h-full">

            <div className="flex justify-between items-center w-full
            xl:flex-col xl:items-start">
                <DropdownFilter options={filterOptions} selectedFilter={filterSelected} onSelect={setFilterSelected} />
                <div>
                    <h3 className="hidden xl:block xl:font-poppins xl:text-primary-text xl:font-bold xl:text-2xl">Gráfico de Desenvolvimento</h3>
                    <BtnPrimary text="Atualizar dados" className="flex justify-between items-center bg-accent text-white h-8 shadow-purple-sm" />
                </div>
            </div>
            <section className="flex flex-col justify-evenly grow">
                <section className="px-3 py-2 border border-primary shadow-purple-sm rounded-lg">
                    <div>
                        <p className="font-nunito text-primary-text italic text-[13px]
                        md:text-[16px]">
                            {setDescriptionForMeasure()}
                        </p>
                    </div>
                    <div className="flex flex-col font-poppins mt-2">
                        <span className="text-primary-text font-semibold text-[14px]
                        md:text-[17px]">Com base nos dados fornecidos seu bebê está com o:</span>
                        <span className={`${setResultDevelopment()} rounded-lg w-full h-18 font-bold p-2 mt-2 text-[18px]
                        md:text-[22px]`}>{developmentResult.result}</span>
                    </div>
                </section>
                <h3 className="font-poppins text-primary-text font-bold text-xl
                xl:hidden">Gráfico de desenvolvimento</h3>
                <div className="w-full h-[55%] min-h-80">
                    <Chart data={dataChart} />
                </div>
            </section>
        </div>
    )
}

export default Measures
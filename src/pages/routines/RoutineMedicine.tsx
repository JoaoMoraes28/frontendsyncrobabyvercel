import BtnPrimary from "../../components/BtnPrimary"
import { InputDefault } from "../../components/InputDefault"
import ChildrenSelect from "../../layouts/ChildrenSelect";

import { buttonCancel, buttonSubmit, radioButton, labelRadioButton, inputClassName, labelClassName } from "./RoutineFeeding"
import Date from "../../utils/Date"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import Close from "../../assets/closeModal.svg"

import type { Products } from "./RoutineDiaper"

interface DataMedicine {
    hour: string,
    remedy_id: Products,
    description?: string
}

function RoutineMedicine() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<DataMedicine>()

    const navigate = useNavigate()
    const [childrenSelected, setChildSelected] = useState<number>(1)
    const [expandRemedy, setExpandRemedy] = useState<boolean>(false)
    const [remedyListSelected, setRemedyListSelected] = useState<string>("Selecione um medicamento")
    const [idRemedySelected, setIdRemedySelected] = useState<number>(0)
    const [disableInput, setDisableInput] = useState<boolean>(true)
    const [measure, setMeasure] = useState<string>("")
    const remedy: Products[] = [
        {
            "id": 1,
            "type": "Medicamentos",
            "product": "Dipirona(100ml)",
            "measure": "ml"
        },
        {
            "id": 2,
            "type": "Medicamentos",
            "product": "Dipirona(comprimido)",
            "measure": "u"
        },
        {
            "id": 3,
            "type": "Medicamentos",
            "product": "Xarope(100ml)",
            "measure": "ml"
        }
    ]

    function selectRemedy(remedy: Products) {
        setIdRemedySelected(remedy.id)
        setExpandRemedy(false)
        setDisableInput(false)

        if (remedy.product && remedy.measure) {
            setRemedyListSelected(remedy.product)
            setMeasure(remedy.measure)
        }
    }

    function sendDatas(data: DataMedicine) {
        const fullData: DataMedicine = {
            'hour': data.hour,
            'remedy_id': {
                'id': idRemedySelected,
                'quantity_product': Number(data.remedy_id.quantity_product)
            },
            'description': data.description
        }

        console.log(fullData)
    }

    useEffect(() => {
        setValue("hour", Date.getHourFormated())
    }, [])

    return (
        <div className="w-screen min-h-full
        md:flex md:items-center
        xl:flex xl:flex-col xl:items-center xl:h-[calc(100%-85px)]">
            <div className="flex w-full">
                <ChildrenSelect idChild={childrenSelected} setChild={setChildSelected} />
            </div>
            <form onSubmit={handleSubmit(sendDatas)} className="flex justify-between flex-col min-w-full h-full
            md:h-[93%]
            xl:justify-around xl:max-w-[90%] xl:min-w-[90%] xl:h-full xl:bg-lilas xl:mt-5 xl:rounded-2xl xl:px-14 xl:py-4 xl:shadow-purple-md">
                <header className="hidden xl:flex xl:justify-between">
                    <h2 className="xl:flex xl:-ml-6 xl:w-70 xl:text-darker-purple xl:font-bold xl:text-[22px]">Registrar medicamento</h2>
                    <button type="button" onClick={() => navigate(-1)} className="xl:-mr-6">
                        <img src={Close} alt="Fecha o registro de medicamento e retorna a tela anterior." className="xl:w-8 xl:h-8" />
                    </button>
                </header>
                <div className="flex flex-col">
                    <label htmlFor="hour" className={labelClassName}>Horário</label>
                    <InputDefault {...register("hour", { required: "Selecione a hora!" })} type="time" id="hour" className={inputClassName} />
                    {errors.hour && <p className="text-red-600/70 text-sm font-nunito">{errors.hour.message}</p>}
                </div>
                <div className="relative flex flex-col">
                    <label htmlFor="medicine" className={labelClassName}>Medicação</label>
                    <InputDefault onClick={() => setExpandRemedy(!expandRemedy)} aria-label="Clique aqui para visualizar os medicamentos para registro." readOnly type="text" id="medicine" value={remedyListSelected} className={`z-50 ${inputClassName}`} />

                    <fieldset className={`absolute flex-col w-full h-68 top-16 overflow-y-scroll bg-lightest pt-4 gap-2 rounded-bl-lg rounded-br-lg border-b border-l border-r border-primary-darker z-40 ${expandRemedy ? 'flex' : 'hidden'}
                    xl:h-46`}>
                        {remedy.map((it) => (
                            <div key={it.id} className="flex items-center w-full h-8 pl-2 gap-2">
                                <InputDefault onChange={() => selectRemedy(it)} type="radio" id={`remedy${it.id}`} name="remedy" className={radioButton} />
                                <label htmlFor={`remedy${it.id}`} className={labelRadioButton}>{it.product}</label>
                            </div>
                        ))}
                    </fieldset>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="quantity" className={labelClassName}>Dose</label>
                    <div className={`flex items-center ${inputClassName}`}>
                        <InputDefault disabled={disableInput} {...register("remedy_id.quantity_product", { required: "Informe a quantidade do medicamento!" })} type="number" id="quantity" className="w-full h-full" />
                        <span className="flex pl-1 w-7">{measure}</span>
                    </div>
                    {errors.remedy_id?.quantity_product && <p className="text-red-600/70 text-sm font-nunito">{errors.remedy_id.quantity_product.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className={labelClassName}>Descrição</label>
                    <textarea {...register("description")} className={`h-56 outline-0 ${inputClassName}
                    md:h-68`} />
                </div>
                <div className="flex justify-between w-full h-10 mb-1 mt-2
                                        md:justify-center md:gap-10 md:h-12
                                        xl:h-10 xl:gap-20">
                    <BtnPrimary onClick={() => navigate(-1)} type="button" text="Cancelar" className={buttonCancel} />
                    <BtnPrimary type="submit" text="Registrar" className={buttonSubmit} />
                </div>
            </form>
        </div>
    )
}

export default RoutineMedicine
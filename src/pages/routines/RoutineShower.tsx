import BtnPrimary from "../../components/BtnPrimary"
import { InputDefault } from "../../components/InputDefault"
import ChildrenSelect from "../../layouts/ChildrenSelect";

import { buttonCancel, buttonSubmit, radioButton, labelRadioButton, inputMeasureClass, listProductsClass, inputClassName, labelClassName } from "./RoutineFeeding"
import Date from "../../utils/Date"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import Close from "../../assets/closeModal.svg"
import Trash from "../../assets/routines/trashPurple.svg"

import type { Products } from "./RoutineDiaper"

interface DataShower {
    log_date?: string
    start_time: string
    end_time: string
    time: string
    product_id: Products[]
    description?: string
}

function RoutineShower() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm<DataShower>()

    const navigate = useNavigate()
    const [childrenSelected, setChildSelected] = useState<number>(1)
    const [expandSelectorProduct, setExpandSelectorProduct] = useState<boolean>(false)
    const [productSelected, setProductSelected] = useState<string>("Selecione produtos utilizados")
    const [listProductSelected, setListProductSelected] = useState<Products[]>([])
    const products: Products[] = [
        {
            "id": 1,
            "type": "Higiene",
            "product": "Fraldas(M)",
            "measure": "un"
        },
        {
            "id": 2,
            "type": "Higiene",
            "product": "Sabonete neutro",
            "measure": "un"
        },
        {
            "id": 3,
            "type": "Higiene",
            "product": "Xampu",
            "measure": "un"
        }
    ]

    function calculateTimeShower() {
        const { start_time, end_time } = getValues()

        const resultTime: string | boolean = Date.subHoursFormated(start_time, end_time)

        if (resultTime != 'NaNh:NaNmin' && resultTime != false) {
            setValue("time", resultTime)

        } else {
            setValue("time", "Datas inválidas!")

        }
    }

    function setListProducts(product: Products) {
        setExpandSelectorProduct(false)

        if (listProductSelected.some(it => it.id == product.id)) {
            return

        } else {
            setListProductSelected([...listProductSelected, product])

            if (product.product) {
                setProductSelected(product.product)
            }

        }
    }

    function onHandleQuantity(id: number, quantity: string) {
        const newList: Products[] = listProductSelected.map((it) => {
            if (it.id == id) {
                return { ...it, quantity_product: Number(quantity) }

            } else {
                return it

            }
        })

        setListProductSelected(newList)
    }

    function removeItemRegister(id: number) {
        const newData: Products[] = listProductSelected.filter(it => it.id != id)
        setListProductSelected(newData)
    }

    function sendDatas(data: DataShower) {
        const newListProduct: Products[] = listProductSelected.map((it) => {
            const { type, product, measure, ...newProduct } = it
            return newProduct
        })

        const fullDatas: DataShower = {
            "start_time": data.start_time,
            "end_time": data.end_time,
            "time": data.time,
            "product_id": newListProduct,
            "description": data.description
        }

        console.log(fullDatas)
    }

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
                    <h2 className="xl:flex xl:-ml-6 xl:w-70 xl:text-darker-purple xl:font-bold xl:text-[22px]">Registrar banho</h2>
                    <button type="button" onClick={() => navigate(-1)} className="xl:-mr-6">
                        <img src={Close} alt="Fecha o registro de banho e retorna a tela anterior." className="xl:w-8 xl:h-8" />
                    </button>
                </header>
                <div className="flex flex-col">
                    <label htmlFor="start-time" className={labelClassName}>Horário de início</label>
                    <InputDefault {...register("start_time", { required: "Selecione a hora de início!", onBlur: calculateTimeShower })} type="time" id="start-time" className={inputClassName} />
                    {errors.start_time && <p className="text-red-600/70 text-sm font-nunito">{errors.start_time.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="end-time" className={labelClassName}>Horário de término</label>
                    <InputDefault {...register("end_time", { required: "Selecione a hora de término!", onBlur: calculateTimeShower })} type="time" id="end-time" className={inputClassName} />
                    {errors.end_time && <p className="text-red-600/70 text-sm font-nunito">{errors.end_time.message}</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="time-shower" className={labelClassName}>Tempo de banho</label>
                    <InputDefault readOnly {...register("time")} type="text" id="time-shower" className={inputClassName} />
                </div>
                <div className="relative flex flex-col">
                    <label htmlFor="products" className={labelClassName}>Produtos utilizados</label>
                    <InputDefault aria-label="Clique para visualizar os produtos para selecionar no registro." onClick={() => setExpandSelectorProduct(!expandSelectorProduct)} readOnly id="products" value={productSelected} className={`z-50 ${inputClassName}`} />

                    <fieldset className={`absolute flex-col w-full h-68 top-16 overflow-y-scroll bg-lightest pt-4 gap-2 rounded-bl-lg rounded-br-lg border-b border-l border-r border-primary-darker z-40 ${expandSelectorProduct ? 'flex' : 'hidden'}
                    xl:h-46`}>
                        {products.map((product) => (
                            <div key={product.id} className="flex items-center w-full h-8 pl-2 gap-2">
                                <InputDefault onChange={() => setListProducts(product)} type="radio" id={`product${product.id}`} name="product" className={radioButton} />
                                <label htmlFor={`product${product.id}`} className={labelRadioButton}>{product.product}</label>
                            </div>
                        ))}
                    </fieldset>
                </div>
                <ul className={listProductsClass}>
                    {listProductSelected.map((product) => (
                        <li key={product.id} className="flex justify-between items-center">
                            <span className="text-lilas-dark font-semibold text-lg
                                    md:text-xl">{product.product}</span>
                            <div className="flex gap-10">
                                <div className={inputMeasureClass}>
                                    <InputDefault onChange={(e) => onHandleQuantity(product.id, e.target.value)} type="number" className="w-2/3 pl-2 text-center" />
                                    <span className="w-1/3">{product.measure}</span>
                                </div>
                                <button onClick={() => removeItemRegister(product.id)} type="button">
                                    <img src={Trash} alt="Exclui produto do registro." className="w-auto h-4" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-col">
                    <label htmlFor="description" className={labelClassName}>Descrição</label>
                    <InputDefault {...register("description")} type="text" id="description" className={inputClassName} />
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

export default RoutineShower
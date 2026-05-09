import BtnPrimary from "../../components/BtnPrimary"
import { InputDefault } from "../../components/InputDefault"
import ChildrenSelect from "../../layouts/ChildrenSelect";

import { buttonCancel, buttonSubmit, radioButton, labelRadioButton, inputMeasureClass, listProductsClass, inputClassName, labelClassName } from "./RoutineFeeding"
import Date from "../../utils/Date"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import Pee from "../../assets/routines/pee.svg"
import Poop from "../../assets/routines/poop.svg"
import Close from "../../assets/closeModal.svg"
import setSelector from "../../assets/setExpandSelector.svg"
import Trash from "../../assets/routines/trashPurple.svg"

interface DataDiaper {
    hour: string
    type: number
    product_id: Products[]
    descripition?: string
}

interface TypeDiaper {
    id: number
    type: string
    img: string
}

export interface Products {
    id: number
    type?: string
    product?: string
    quantity_product?: number
    measure?: string
}

function RoutineDiaper() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<DataDiaper>()

    const navigate = useNavigate()
    const [childrenSelected, setChildSelected] = useState<number>(1)
    const [expandSelectorProduct, setExpandSelectorProduct] = useState<boolean>(false)
    const [valueProduct, setValueProduct] = useState<string>("Selecione os produtos desejados")
    const [productSelected, setProductSelected] = useState<Products[]>([])
    const [typeSelected, setTypeSelected] = useState<number>(0)
    const [expandTypeSelector, setExpandTypeSelector] = useState<boolean>(false)
    const [valueInputType, setValueInputType] = useState<string>("Selecione o tipo de registro!")
    const type_diaper: TypeDiaper[] = [
        {
            "id": 1,
            "type": "Fezes",
            "img": Poop
        },
        {
            "id": 2,
            "type": "Urina",
            "img": Pee
        }
    ]
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
            "product": "Talco",
            "measure": "un"
        }
    ]

    function addProductList(product: Products) {
        setExpandSelectorProduct(false)
        if (productSelected.some(it => it.id == product.id)) {
            return

        } else if (product.product) {
            setValueProduct(product.product)
            setProductSelected([...productSelected, product])
        }

    }

    function onHandleQuantity(id: number, quantity: string) {
        const newList: Products[] = productSelected.map((it) => {
            if (it.id == id) {
                it.quantity_product = Number(quantity)
                return it

            } else {
                return it

            }
        })

        setProductSelected(newList)
    }

    function sendDatas(datas: DataDiaper) {
        if (typeSelected != 0) {

            const newProductList: Products[] = productSelected.map((it) => {
                const { type, product, measure, ...newProduct } = it
                return newProduct
            })

            const fullDatas: DataDiaper = {
                "hour": datas.hour,
                "type": typeSelected,
                "product_id": newProductList,
                "descripition": datas.descripition
            }
            console.log(fullDatas)
            alert("Registro feito com sucesso!")

        } else {
            alert("Selecione o tipo de registro!")

        }

    }

    useEffect(() => {
        setValue("hour", Date.getHourFormated())
    }, [])

    return (
        <div className="w-full min-h-full
        xl:flex xl:flex-col xl:items-center xl:h-[calc(100%-85px)]">
            <div className="flex w-full">
                <ChildrenSelect idChild={childrenSelected} setChild={setChildSelected} />
            </div>
            <form onSubmit={handleSubmit(sendDatas)} className="flex flex-col justify-between w-full h-full
            xl:justify-around xl:w-[90%] xl:h-full xl:bg-lilas xl:mt-5 xl:rounded-2xl xl:px-14 xl:py-4 xl:shadow-purple-md">
                <header className="hidden xl:flex xl:justify-between">
                    <h2 className="xl:flex xl:-ml-6 xl:w-70 xl:text-darker-purple xl:font-bold xl:text-[22px]">Registrar troca de fraldas</h2>
                    <button type="button" onClick={() => navigate(-1)} className="xl:-mr-6">
                        <img src={Close} alt="Fecha o registro de troca de fralda e retorna a tela anterior." className="xl:w-8 xl:h-8" />
                    </button>
                </header>
                <div className="flex flex-col">
                    <label htmlFor="hour" className={labelClassName}>Horário</label>
                    <InputDefault {...register("hour", { required: "Hora obrigatória!" })} id="hour" type="time" className={inputClassName} />
                    {errors.hour && <p className="text-red-600/70 text-sm font-nunito">{errors.hour.message}</p>}
                </div>
                <div className="flex flex-col
                xl:hidden">
                    <label htmlFor="type-diaper" className={labelClassName}>Tipo</label>
                    <ul className="flex justify-between">
                        {type_diaper.map((type) => (
                            <li key={type.id} className={`w-40 h-38 bg-lilas border border-primary rounded-lg shadow-purple-sm ${typeSelected == type.id ? "shadow-purple-md bg-lilas-dark/10" : ""}
                            md:w-2/5 md:h-56`}>
                                <button onClick={() => setTypeSelected(type.id)} type="button" className="flex flex-col justify-center items-center gap-2 w-full h-full">
                                    <img aria-hidden="true" src={type.img} alt="" className="w-18 h-18" />
                                    <span className="font-nunito text-primary-darker text-xl">{type.type}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="hidden xl:relative xl:flex xl:flex-col">
                    <label htmlFor="typeDiaper" className={labelClassName}>Tipo</label>
                    <div onClick={() => setExpandTypeSelector(!expandTypeSelector)} aria-label="Visualiza os tipos de registro para troca de fralda." className={`xl:flex xl:w-full xl:justify-between xl:items-center xl:z-50 ${inputClassName}`}>
                        <InputDefault readOnly id="typeDiaper" value={valueInputType} className="w-1/2" />
                            <img src={setSelector} alt="" className={`xl:w-6 xl:h-6 ${expandTypeSelector ? "turn-set" : "return-set"}`} />
                    </div>
                    <fieldset className={`xl:absolute xl:top-15 xl:justify-around xl:w-full xl:h-15 xl:z-40 xl:rounded-bl-lg xl:rounded-br-lg xl:border-b xl:border-l xl:border-r xl:border-primary-darker
                        xl:bg-lightest xl:pt-4 xl:gap-2 ${expandTypeSelector ? "xl:flex" : "xl:hidden"}`}>
                        {type_diaper.map((type) => (
                            <div key={type.id} className="xl:flex xl:justify-center xl:items-center xl:h-full xl:pl-2 xl:gap-2">
                                <InputDefault onChange={() => {
                                    setExpandTypeSelector(false)
                                    setTypeSelected(type.id)
                                    setValueInputType(type.type)
                                }
                                } id={`type${type.id}`} type="radio" className={radioButton} name="type-diaper" />
                                <label htmlFor={`type${type.id}`} className={labelRadioButton}>{type.type}</label>
                            </div>
                        ))}
                    </fieldset>
                </div>
                <div className="relative flex flex-col">
                    <label htmlFor="product" className={labelClassName}>Produtos utilizados</label>
                    <InputDefault aria-label="Clique para visualizar os produtos para selecionar no registro." onClick={() => setExpandSelectorProduct(!expandSelectorProduct)} readOnly id="prodict" value={valueProduct} className={`z-50 ${inputClassName}`} />

                    <fieldset className={`absolute flex-col w-full h-70 top-16 overflow-y-scroll bg-lightest pt-4 gap-2 rounded-bl-lg rounded-br-lg border-b border-l border-r border-primary-darker z-40 ${expandSelectorProduct ? 'flex' : 'hidden'}`}>
                        {products.map((product) => (
                            <div key={product.id} className="flex items-center w-full h-8 pl-2 gap-2">
                                <InputDefault onChange={() => {
                                    addProductList(product)
                                }} id={`item${product.id}`} type="radio" value={product.product} className={radioButton} name="product" />
                                <label htmlFor={`item${product.id}`} className={labelRadioButton}>{product.product}</label>
                            </div>
                        ))}
                    </fieldset>
                </div>
                <ul className={`h-30 ${listProductsClass}`}>
                    {productSelected.map((product) => (
                        <li key={product.id} className="flex items-center justify-between">
                            <span className="text-lilas-dark font-semibold text-lg
                                    md:text-xl">{product.product}</span>
                            <div className={inputMeasureClass}>
                                <InputDefault onChange={(e) => onHandleQuantity(product.id, e.target.value)} type="number" className="w-2/3 pl-2 text-center" />
                                <span className="flex items-center w-1/3">{product.measure}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-col">
                    <label htmlFor="description" className={labelClassName}>Descrição</label>
                    <InputDefault {...register("descripition")} className={inputClassName} />
                    {errors.descripition && <p className="text-red-600/70 text-sm font-nunito">{errors.descripition.message}</p>}
                </div>
                <div className="flex justify-between w-full h-10 mb-1 mt-4
                        md:justify-center md:gap-10 md:h-12
                        xl:h-10 xl:gap-20">
                    <BtnPrimary onClick={() => navigate(-1)} type="button" text="Cancelar" className={buttonCancel} />
                    <BtnPrimary type="submit" text="Registrar" className={buttonSubmit} />
                </div>
            </form>
        </div>
    )
}

export default RoutineDiaper
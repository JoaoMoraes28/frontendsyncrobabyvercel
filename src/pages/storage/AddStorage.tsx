import SolidFood from "../../assets/appleBanana.svg"
import Milk from "../../assets/routines/milk.svg"
import BabyFood from "../../assets/routines/baby_food.svg"
import Remedy from "../../assets/iconRemedy.svg"
import Acessory from "../../assets/iconAcessory.svg"
import Hygiene from "../../assets/purpleHygiene.svg"
import Close from "../../assets/closeModal.svg"

import { useForm } from "react-hook-form"

import { useEffect, useState, useRef } from "react"

import { InputDefault } from "../../components/InputDefault"
import BtnPrimary from "../../components/BtnPrimary"

import CloseElement from "../../utils/CloseElementClick.ts"

import { inputClassName, radioButton, labelRadioButton, buttonCancel, buttonSubmit } from "../routines/RoutineFeeding"

import { useNavigate } from "react-router-dom"

import { useGetTypeProduct } from "../../services/hooks/product/useGetType"
import { useGetProductByType } from "../../services/hooks/product/useGetProductType"
import type { ResponseTypeProduct } from "../../services/product/product.service"
import type { TypeProduct } from "../../services/product/product.service"
import type { ProductTypeId } from "../../services/product/product.service"

import { useInsertStorage } from "../../services/hooks/storage/useInsertStorage.ts"
import type { InsertProduct } from "../../services/storage/storage.service.ts"

interface TypeListProduct {
    id_product_type: number
    product_type_name: string
    icon?: string
}

interface Product {
    id: number
    product_name: string
    product_category: number
    quantity: number
    volume: number
    measurement_unit: string
    description: string
    child_id: number
}

const labelClass: string = 'text-primary-darker font-semibold font-poppins text-[16px] md:text-xl'

function AddStorage() {
    const idChild: number = Number(localStorage.getItem("select_child"))
    const { data: onGetType } = useGetTypeProduct()
    const { mutate: onInsertProduct } = useInsertStorage()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<Product>({
        defaultValues: {
            product_name: "Selecione o tipo de produto"
        }
    })

    const navigate = useNavigate()

    const refDiv = useRef<HTMLDivElement | null>(null)
    const refChild = useRef<HTMLInputElement | null>(null)

    const [idProduct, setIdProduct] = useState<number>(0)
    const [typeProduct, setTypeProduct] = useState<number | null>(null)
    const [nameProduct, setNameProduct] = useState<string>("Selecione o tipo do produto")
    const [valueProduct, setValueProduct] = useState<string>("")
    const [typeListProduct, setTypeListProduct] = useState<TypeListProduct[]>([])
    const [selectProduct, setSelectProduct] = useState<boolean>(false)
    const [selectTypeProduct, setSelectTypeProduct] = useState<boolean>(false)
    const [valueInputType, setValueInputType] = useState<string>("Selecione a categoria")
    const [listProducts, setListProducts] = useState<ProductTypeId[]>([])
    const [measureHigh, setMeasureHigh] = useState<string>("")

    const { data: onGetProduct, isError, isLoading } = useGetProductByType(typeProduct)

    useEffect(() => {
        if (!onGetType) {
            return
        }

        if (onGetType) {
            formatedTypeProduct(onGetType)

        }

    }, [onGetType])

    useEffect(() => {
        if (!onGetProduct) {
            return
        }

        console.log(onGetProduct)
        setListProducts(onGetProduct?.product)

    }, [onGetProduct])


    function formatedTypeProduct(data: ResponseTypeProduct) {
        const newDataSplit: TypeProduct[] = data.type.map((it) => {
            const splitName: string[] = it.product_type_name.split("(")
            if (splitName[1]) {
                return { ...it, product_type_name: splitName[1].replace(")", "") }
            }
            return it
        })

        setIconTypeProduct(newDataSplit)
    }

    function setIconTypeProduct(data: TypeListProduct[]) {
        const dataWithIcon: TypeListProduct[] = data.map((it) => {
            if (it.product_type_name.includes("Alimento sólido")) {
                it.icon = SolidFood

            } else if (it.product_type_name.includes("Leite e derivados")) {
                it.icon = Milk

            } else if (it.product_type_name.includes("Papinha ou purê")) {
                it.icon = BabyFood

            } else if (it.product_type_name.includes("Higiene")) {
                it.icon = Hygiene

            } else if (it.product_type_name.includes("Saúde")) {
                it.icon = Remedy

            } else if (it.product_type_name.includes("Acessórios")) {
                it.icon = Acessory

            }
            return it
        })
        setTypeListProduct(dataWithIcon)
    }

    function changeTypeProduct(id: number) {
        if (id != typeProduct) {
            setSelectTypeProduct(false)
            setSelectProduct(false)
            setTypeProduct(id)
            setNameProduct("Selecione o produto")
            setValueProduct("")
            setMeasureHigh("")

            setValue("measurement_unit", "")
            setValue("product_category", id)

            const typeLabel: TypeProduct[] = typeListProduct.filter(it => it.id_product_type == id)
            if (typeLabel) {
                setValueInputType(typeLabel[0].product_type_name)
            }
        }
    }

    function filterProduct(text: string) {
        if (onGetProduct) {
            const newList: ProductTypeId[] = onGetProduct.product.filter(it => it.name.toLowerCase().includes(text.toLowerCase()))
            setListProducts(newList)
        }
    }

    function sendData(data: Product) {
        const fullData: InsertProduct = {
            fk_id_child: idChild,
            fk_id_product: idProduct,
            description: data.description,
            quantity: data.quantity,
            volume: data.volume ? data.volume : 0
        }

        onInsertProduct(
            fullData,
            {
                onSuccess: () => {

                }, onError: () => {

                }
            }
        )
    }

    return (
        <div
            ref={refDiv}
            onClick={(e) => CloseElement.CloseElement(refChild, setSelectProduct, e)}
            className="w-full min-h-full
        xl:flex xl:flex-col xl:items-center xl:h-[calc(100%-85px)]">
            <form onSubmit={handleSubmit(sendData)} className="w-full h-full flex flex-col justify-between
            xl:justify-around xl:w-[90%] xl:bg-lilas xl:mt-5 xl:rounded-2xl xl:px-14 xl:py-4 xl:shadow-purple-md">
                <header className="hidden xl:flex xl:justify-between">
                    <h2 className="xl:flex xl:-ml-6 xl:w-70 xl:text-darker-purple xl:font-bold xl:text-[22px]">
                        Adicionar produto
                    </h2>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="xl:-mr-6"
                    >
                        <img
                            src={Close}
                            alt="Fecha o registro de novo produto e retorna a tela anterior."
                            className="xl:w-8 xl:h-8"
                        />
                    </button>
                </header>
                <div className="flex flex-col w-full h-[40%]
                xl:h-auto">
                    <label htmlFor="typeProduct" className={labelClass}>Tipo de produto</label>
                    <ul id="typeProduct" className="grid grow grid-cols-3 grid-rows-2 justify-items-center items-center
                    xl:hidden">
                        {typeListProduct.map((type) => (
                            <li key={type.id_product_type} className={`w-[90%] h-[85%] bg-lilas border border-primary rounded-sm ${typeProduct == type.id_product_type ? "shadow-purple-sm bg-lilas-dark/10" : ""}`}>
                                <button onClick={() => changeTypeProduct(type.id_product_type)} type="button" className="flex flex-col justify-center items-center font-nunito w-full h-full
                                md:gap-3">
                                    <img aria-hidden="true" src={type.icon} alt="" className="w-auto h-11
                                    md:h-14" />
                                    <span className="text-primary-darker font-nunito font-semibold text-[14.5px]
                                    md:text-[20px]">{type.product_type_name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="hidden xl:relative xl:flex xl:flex-col xl:w-full">
                        <InputDefault readOnly onClick={() => setSelectTypeProduct(!selectTypeProduct)} value={valueInputType} className={`xl:block xl:z-60 ${inputClassName}`} />

                        <fieldset className={`xl:absolute xl:top-10 xl:flex-col xl:w-full xl:h-54 xl:rounded-bl-lg xl:rounded-br-lg xl:border-b xl:border-l xl:border-r xl:border-primary-darker
                        xl:overflow-y-scroll xl:bg-lightest xl:pt-4 xl:gap-2 xl:z-50 ${selectTypeProduct ? 'flex' : 'hidden'}`}>
                            {typeListProduct.map((product) => (
                                <div key={product.id_product_type} className="flex items-center w-full h-8 pl-4 gap-2">
                                    <InputDefault onChange={() => changeTypeProduct(product.id_product_type)} id={`type${product.id_product_type}`} type="radio" className={radioButton} name="type" />
                                    <label htmlFor={`type${product.id_product_type}`} className={labelRadioButton}>{product.product_type_name}</label>
                                </div>
                            ))}
                        </fieldset>
                    </div>
                    <InputDefault {...register("product_category", { required: "Selecione o tipo!" })} className="hidden" />
                    {errors.product_category && (
                        <p className="text-red-600/70 text-sm font-nunito">
                            {errors.product_category.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="product" className={labelClass}>Produto</label>
                    <div className="relative flex flex-col w-full">
                        <input ref={refChild}
                            readOnly={typeProduct == null} onChange={(e) => {
                                filterProduct(e.target.value)
                                setValueProduct(e.target.value)
                            }
                            }
                            onClick={() => setSelectProduct(!selectProduct)}
                            id="product" value={valueProduct} placeholder={nameProduct} className={`z-40 ${inputClassName}`} />
                        {errors.product_name && (
                            <p className="text-red-600/70 text-sm font-nunito">
                                {errors.product_name.message}
                            </p>
                        )}

                        <fieldset className={`absolute top-10 z-30 pb-4 flex-col w-full h-70 rounded-bl-lg rounded-br-lg border-b border-l border-r border-primary-darker
                        overflow-y-scroll bg-lightest pt-4 gap-2 md:top-13 xl:top-10 ${selectProduct && typeProduct != null ? 'flex' : 'hidden'}`}>
                            {isLoading && <p>Carrregando...</p>}
                            {!isLoading && !isError && (
                                listProducts.map((product) => {
                                    return (
                                        <div key={product.id} className="flex items-center w-full h-8 pl-4 gap-2">
                                            <InputDefault onChange={(e) => {
                                                setIdProduct(product.id)
                                                setValueProduct(e.target.value)
                                                setValue("measurement_unit", product.unit)
                                                setMeasureHigh(product.unit)
                                                setSelectProduct(false)
                                            }} type="radio" id={`product${product.id}`} value={product.name} className={radioButton} name="products" />
                                            <label htmlFor={`product${product.id}`} className={labelRadioButton}>{product.name}</label>
                                        </div>
                                    )
                                })
                            )}
                        </fieldset>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col w-[30%]">
                        <label htmlFor="quantity" className={labelClass}>Quantidade</label>
                        <InputDefault readOnly={idProduct == 0} {...register("quantity", { required: "Campo obrigatório!" })} type="number" id="quantity" className={inputClassName} />
                        {errors.quantity && (
                            <p className="text-red-600/70 text-[12px] font-nunito">
                                {errors.quantity.message}
                            </p>
                        )}
                    </div>
                    <div className={`flex flex-col w-[30%] ${measureHigh == 'un' ? "opacity-40" : ""}`}>
                        <label htmlFor="volume" className={labelClass}>Volume</label>
                        <InputDefault readOnly={measureHigh == 'un' || idProduct == 0} {...register("volume", { required: measureHigh == 'un' ? false : "Campo obrigatório!" })} type="number" id="volume" className={inputClassName} />
                        {errors.volume && (
                            <p className="text-red-600/70 text-[12px] font-nunito">
                                {errors.volume.message}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col w-[30%]">
                        <label htmlFor="measure" className={labelClass}>Grandeza</label>
                        <InputDefault readOnly {...register("measurement_unit")} id="measure" className={inputClassName} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className={labelClass}>Descrição</label>
                    <textarea {...register("description")} id="description" className={`h-36 outline-none md:h-50 xl:h-50 ${inputClassName}`}></textarea>
                </div>
                <div className="flex w-full justify-between h-16 items-center
                md:justify-center md:gap-10 md:h-12
                xl:h-10 xl:gap-20">
                    <BtnPrimary onClick={() => navigate(-1)} type="button" text="Cancelar" className={buttonCancel} />
                    <BtnPrimary type="submit" text="Registrar" className={buttonSubmit} />
                </div>
            </form>
        </div>
    )
}

export default AddStorage
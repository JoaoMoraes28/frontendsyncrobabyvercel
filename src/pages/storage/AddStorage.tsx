import SolidFood from "../../assets/appleBanana.svg"
import Milk from "../../assets/routines/milk.svg"
import BabyFood from "../../assets/routines/baby_food.svg"
import Hygiene from "../../assets/purpleHygiene.svg"
import Remedy from "../../assets/iconRemedy.svg"
import Acessory from "../../assets/iconAcessory.svg"
import Close from "../../assets/closeModal.svg"

import { useForm } from "react-hook-form"

import { useEffect, useState } from "react"

import { InputDefault } from "../../components/InputDefault"
import BtnPrimary from "../../components/BtnPrimary"

import { inputClassName, radioButton, labelRadioButton, buttonCancel, buttonSubmit } from "../routines/RoutineFeeding"

import { useNavigate } from "react-router-dom"

interface TypeListProduct {
    id: number
    label: string
    icon: string
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

interface ProductDetails {
    id: number
    label: string
    measure: string
}

const typeListProduct: TypeListProduct[] = [
    {
        id: 1,
        label: "Alimento sólido",
        icon: SolidFood
    },
    {
        id: 2,
        label: "Leite e Derivados",
        icon: Milk
    },
    {
        id: 3,
        label: "Papinha ou Purê",
        icon: BabyFood
    },
    {
        id: 4,
        label: "Higiene",
        icon: Hygiene
    },
    {
        id: 5,
        label: "Medicamentos",
        icon: Remedy
    },
    {
        id: 6,
        label: "Acessórios",
        icon: Acessory
    }
]

const labelClass: string = 'text-primary-darker font-semibold font-poppins text-[16px] md:text-xl'

function AddStorage() {
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

    const [idProduct, setIdProduct] = useState<number>(0)
    const [selectProduct, setSelectProduct] = useState<boolean>(false)
    const [selectTypeProduct, setSelectTypeProduct] = useState<boolean>(false)
    const [valueInputType, setValueInputType] = useState<string>("Selecione a categoria")
    const [typeProduct, setTypeProduct] = useState<number>(0)
    const [listProductsMain] = useState<ProductDetails[]>([
        {
            "id": 1,
            "label": "Maçã",
            "measure": "un"
        },
        {
            "id": 2,
            "label": "Arroz",
            "measure": "kg"
        },
        {
            "id": 3,
            "label": "Feijão Preto",
            "measure": "kg"
        },
        {
            "id": 4,
            "label": "Pão Francês",
            "measure": "un"
        },
        {
            "id": 5,
            "label": "Macarrão Espaguete",
            "measure": "pct"
        },
        {
            "id": 6,
            "label": "Queijo Muçarela",
            "measure": "g"
        },
        {
            "id": 7,
            "label": "Peito de Frango",
            "measure": "kg"
        },
        {
            "id": 8,
            "label": "Biscoito Recheado",
            "measure": "pct"
        },
        {
            "id": 9,
            "label": "Batata Inglesa",
            "measure": "kg"
        },
        {
            "id": 10,
            "label": "Chocolate em Barra",
            "measure": "un"
        }
    ])
    const [listProducts, setListProducts] = useState<ProductDetails[]>([
        {
            "id": 1,
            "label": "Maçã",
            "measure": "un"
        },
        {
            "id": 2,
            "label": "Arroz",
            "measure": "kg"
        },
        {
            "id": 3,
            "label": "Feijão Preto",
            "measure": "kg"
        },
        {
            "id": 4,
            "label": "Pão Francês",
            "measure": "un"
        },
        {
            "id": 5,
            "label": "Macarrão Espaguete",
            "measure": "pct"
        },
        {
            "id": 6,
            "label": "Queijo Muçarela",
            "measure": "g"
        },
        {
            "id": 7,
            "label": "Peito de Frango",
            "measure": "kg"
        },
        {
            "id": 8,
            "label": "Biscoito Recheado",
            "measure": "pct"
        },
        {
            "id": 9,
            "label": "Batata Inglesa",
            "measure": "kg"
        },
        {
            "id": 10,
            "label": "Chocolate em Barra",
            "measure": "un"
        }
    ])

    function changeTypeProduct(id: number) {
        if (id != typeProduct) {
            setSelectTypeProduct(false)
            setSelectProduct(false)
            setTypeProduct(id)
            setValue("product_category", id)
            setValue("product_name", "")
            
            const typeLabel: TypeListProduct[] = typeListProduct.filter(it => it.id == id)
            if (typeLabel) {
              setValueInputType(typeLabel[0].label)  
            }
        }
    }

    function filterProduct(text: string) {
        const newList: ProductDetails[] = listProductsMain.filter(it => it.label.toUpperCase().includes(text.toUpperCase()))
        setListProducts(newList)
    }

    function sendData(data: Product) {
        const fullData: Product = {
            id: idProduct,
            product_name: data.product_name,
            product_category: Number(data.product_category),
            quantity: Number(data.volume),
            volume: Number(data.volume),
            measurement_unit: data.measurement_unit,
            description: data.description,
            child_id: 1
        }
        console.log(fullData)
    }

    useEffect(() => {
        setListProducts(listProductsMain)
    }, [])

    return (
        <div className="w-full min-h-full
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
                            <li key={type.id} className={`w-[90%] h-[85%] bg-lilas border border-primary rounded-sm ${typeProduct == type.id ? "shadow-purple-sm bg-lilas-dark/10" : ""}`}>
                                <button onClick={() => changeTypeProduct(type.id)} type="button" className="flex flex-col justify-center items-center font-nunito w-full h-full
                                md:gap-3">
                                    <img aria-hidden="true" src={type.icon} alt="" className="w-auto h-11
                                    md:h-14" />
                                    <span className="text-primary-darker font-nunito font-semibold text-[14.5px]
                                    md:text-[20px]">{type.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="hidden xl:relative xl:flex xl:flex-col xl:w-full">
                        <InputDefault readOnly onClick={() => setSelectTypeProduct(!selectTypeProduct)} value={valueInputType} className={`xl:block xl:z-60 ${inputClassName}`} />

                        <fieldset className={`xl:absolute xl:top-10 xl:flex-col xl:w-full xl:h-54 xl:rounded-bl-lg xl:rounded-br-lg xl:border-b xl:border-l xl:border-r xl:border-primary-darker
                        xl:overflow-y-scroll xl:bg-lightest xl:pt-4 xl:gap-2 xl:z-50 ${selectTypeProduct ? 'flex' : 'hidden'}`}>
                            {typeListProduct.map((product) => (
                                <div key={product.id} className="flex items-center w-full h-8 pl-4 gap-2">
                                    <InputDefault onChange={() => changeTypeProduct(product.id)} id={`type${product.id}`} type="radio" className={radioButton} name="type" />
                                    <label htmlFor={`type${product.id}`} className={labelRadioButton}>{product.label}</label>
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
                        <InputDefault readOnly={typeProduct == 0} {...register("product_name", { required: "Campo obrigatório!", onChange: (e) => filterProduct(e.target.value) })} onClick={() => setSelectProduct(!selectProduct)} id="product" className={`z-40 ${inputClassName}`} />
                        {errors.product_name && (
                            <p className="text-red-600/70 text-sm font-nunito">
                                {errors.product_name.message}
                            </p>
                        )}

                        <fieldset className={`absolute top-10 pb-4 flex-col w-full h-70 rounded-bl-lg rounded-br-lg border-b border-l border-r border-primary-darker
                        overflow-y-scroll bg-lightest pt-4 gap-2 md:top-13 ${selectProduct && typeProduct != 0 ? 'flex' : 'hidden'}`}>
                            {listProducts.map((product) => (
                                <div key={product.id} className="flex items-center w-full h-8 pl-4 gap-2">
                                    <InputDefault onChange={(e) => {
                                        setIdProduct(product.id)
                                        setValue("product_name", e.target.value)
                                        setValue("measurement_unit", product.measure)
                                        setSelectProduct(false)
                                    }} type="radio" id={`product${product.id}`} value={product.label} className={radioButton} name="products" />
                                    <label htmlFor={`product${product.id}`} className={labelRadioButton}>{product.label}</label>
                                </div>
                            ))}
                        </fieldset>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col w-[30%]">
                        <label htmlFor="quantity" className={labelClass}>Quantidade</label>
                        <InputDefault {...register("quantity", { required: "Campo obrigatório!" })} type="number" id="quantity" className={inputClassName} />
                        {errors.quantity && (
                            <p className="text-red-600/70 text-[12px] font-nunito">
                                {errors.quantity.message}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col w-[30%]">
                        <label htmlFor="volume" className={labelClass}>Volume</label>
                        <InputDefault {...register("volume", { required: "Campo obrigatório!" })} type="number" id="volume" className={inputClassName} />
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
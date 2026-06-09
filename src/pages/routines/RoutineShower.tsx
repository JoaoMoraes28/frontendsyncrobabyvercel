import BtnPrimary from "../../components/BtnPrimary"
import { InputDefault } from "../../components/InputDefault"

import { buttonCancel, buttonSubmit, radioButton, labelRadioButton, inputMeasureClass, listProductsClass, inputClassName, labelClassName } from "./RoutineFeeding"

import Date from "../../utils/Date.ts"
import CloseElement from "../../utils/CloseElementClick.ts"

import { useEffect, useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, Link, useParams } from "react-router-dom"

import Close from "../../assets/closeModal.svg"
import Trash from "../../assets/routines/trashPurple.svg"
import setSelector from "../../assets/setExpandSelector.svg";

import type { Products } from "./RoutineDiaper"

import { useRegisterBath } from "../../services/hooks/routines/useRegisterBath.ts";
import type { RegisterBath } from "../../services/routines/routines.service.ts";
import { useGetProductByTypeStorage } from "../../services/hooks/storage/useGetProductByTypeStorage.ts";
import type { ProductStorage } from "../../services/storage/storage.service.ts";
import type { ProductId } from "../../services/routines/routines.service.ts";

interface DataShower {
    start_time: string
    end_time: string
    time: string
    product_id: Products[]
    description: string | null
}

function RoutineShower() {
    const idChild: number = Number(localStorage.getItem("select_child"))
    const { mutate: onRegisterBath } = useRegisterBath()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm<DataShower>()

    const navigate = useNavigate()

    const refDiv = useRef<HTMLDivElement | null>(null)
    const refChild = useRef<HTMLInputElement | null>(null)

    const { data: onGeteProducts } = useGetProductByTypeStorage(4, idChild)

    const [expandSelectorProduct, setExpandSelectorProduct] = useState<boolean>(false)
    const [productSelected, setProductSelected] = useState<string>("")
    const [listProductSelected, setListProductSelected] = useState<ProductStorage[]>([])
    const [productsMain, setProductsMain] = useState<ProductStorage[]>([])
    const [products, setProducts] = useState<ProductStorage[]>([])

    function calculateTimeShower() {
        const { start_time, end_time } = getValues()

        const resultTime: string | boolean = Date.subHoursFormated(start_time, end_time)

        if (resultTime != 'NaNh:NaNmin' && resultTime != false) {
            setValue("time", resultTime)

        } else {
            setValue("time", "Datas inválidas!")

        }
    }

    function setListProducts(product: ProductStorage) {
        setExpandSelectorProduct(false)

        if (listProductSelected.some(it => it.id == product.id)) {
            return

        } else {
            setListProductSelected([...listProductSelected, product])

            if (product.product_name) {
                setProductSelected(product.product_name)
            }

        }
    }

    function onHandleQuantity(id: number, quantity: string) {
        const newList: ProductStorage[] = listProductSelected.map((it) => {
            if (it.id == id) {
                return { ...it, quantity: Number(quantity) }

            } else {
                return it

            }
        })

        setListProductSelected(newList)
    }

    function removeItemRegister(id: number) {
        const newData: ProductStorage[] = listProductSelected.filter(it => it.id != id)
        setListProductSelected(newData)
    }

    function sendDatas(data: DataShower) {
        const newListProduct: ProductId[] = listProductSelected.map((it) => {
            return {
                id: it.id,
                quantity_product: it.quantity
            }
        })

        if (getValues("time") != "Datas inválidas!") {
            const fullDatas: RegisterBath = {
                "start_time": Date.convertISO(data.start_time),
                "end_time": Date.convertISO(data.end_time),
                "product_id": newListProduct,
                "description": data.description,
                "fk_id_child": idChild
            }

            onRegisterBath(
                fullDatas,
                {
                    onSuccess: () => {

                    }, onError: () => {

                    }
                }
            )

        } else {
            alert("Data inválida!")

        }

    }

    function filterProducts(text: string) {
        const newData: ProductStorage[] = productsMain.filter(it => it.product_name.toLowerCase().includes(text.toLowerCase()))
        setProducts(newData)
    }

    useEffect(() => {
        if (!onGeteProducts) {
            return
        }

        if (onGeteProducts) {
            setProducts(onGeteProducts.stock)
            setProductsMain(onGeteProducts.stock)
        }
    }, [onGeteProducts])

    return (
        <div onClick={(e) => CloseElement.CloseElement(refChild, setExpandSelectorProduct, e)}
            ref={refDiv}
            className="w-screen min-h-full
        md:flex md:items-center
        xl:flex xl:flex-col xl:items-center xl:h-[calc(100%-85px)]">
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
                    <label htmlFor="products" className={labelClassName}>Produtos utilizados <span className="italic text-[12px]">(Registre apenas items que esgotaram por completo!)</span></label>
                    <div className={`z-50 flex justify-between items-center ${inputClassName}`}>
                        <input
                            ref={refChild}
                            aria-label="Clique para visualizar os produtos para selecionar no registro." onChange={(e) => {
                                setProductSelected(e.target.value)
                                filterProducts(e.target.value)
                            }}
                            onClick={() => setExpandSelectorProduct(true)}
                            placeholder="Selecione produtos utilizados" id="products" value={productSelected}
                            className="w-full"
                        />
                        <img
                            src={setSelector}
                            alt=""
                            className={`xl:w-6 xl:h-6 ${expandSelectorProduct ? "turn-set" : "return-set"}`}
                        />
                    </div>

                    <fieldset className={`absolute flex-col w-full h-68 top-21 overflow-y-scroll bg-lightest pt-4 gap-2 rounded-bl-lg rounded-br-lg border-b border-l border-r border-primary-darker z-40 ${expandSelectorProduct ? 'flex' : 'hidden'}
                    xl:h-46 xl:top-17`}>
                        {products.length == 0 &&
                            <div className="flex flex-col w-full h-full pt-10 gap-5 items-center">
                                <span className="text-[15px] font-semibold text-primary-text">Parece que não há nenhum produto deste tipo...</span>
                                <Link to="/add-storage"
                                    className="bg-accent rounded-md text-white font-semibold w-40 h-9 flex justify-center items-center"
                                >Registrar Produto</Link>
                            </div>
                        }

                        {products.map((product) => (
                            <div key={product.id} className="flex items-center w-full h-8 pl-2 gap-2">
                                <InputDefault onChange={() => setListProducts(product)} type="radio" id={`product${product.id}`} name="product" className={radioButton} />
                                <label htmlFor={`product${product.id}`} className={labelRadioButton}>{product.product_name}</label>
                            </div>
                        ))}
                    </fieldset>
                </div>
                <ul className={listProductsClass}>

                    {listProductSelected.map((product) => (
                        <li key={product.id} className="flex justify-between items-center">
                            <span className="text-lilas-dark font-semibold text-lg
                                    md:text-xl">{product.product_name}</span>
                            <div className="flex gap-10">
                                <div className={inputMeasureClass}>
                                    <InputDefault onChange={(e) => onHandleQuantity(product.id, e.target.value)} type="number" className="w-2/3 pl-2 text-center" />
                                    <span className="w-1/3">un</span>
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
                    <InputDefault {...register("description")} type="text" id="description" className={`py-2 ${inputClassName}`} />
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
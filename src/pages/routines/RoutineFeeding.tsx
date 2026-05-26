import { useForm } from "react-hook-form";
import { InputDefault } from "../../components/InputDefault";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Date from "../../utils/Date.ts";
import CloseElement from "../../utils/CloseElementClick.ts"

import ChildrenSelect from "../../layouts/ChildrenSelect";

import Milk from "../../assets/routines/milk.svg";
import BabyFood from "../../assets/routines/baby_food.svg";
import SolidFood from "../../assets/routines/solidFood.svg";
import BtnPrimary from "../../components/BtnPrimary";
import Close from "../../assets/closeModal.svg";
import setSelector from "../../assets/setExpandSelector.svg";
import Trash from "../../assets/routines/trashPurple.svg"

import { useRegisterFeeding } from "../../services/hooks/routines/useRegisterFeeding";
import type { RegisterFeeding } from "../../services/routines/routines.service";
import { useGetTypeProduct } from "../../services/hooks/product/useGetType.ts";
import type { TypeProduct } from "../../services/storage/storage.service.ts";
import { useGetProductByTypeStorage } from "../../services/hooks/storage/useGetProductByTypeStorage.ts";
import type { ProductStorage } from "../../services/storage/storage.service.ts";

interface DataFeeding {
  date_time: string;
  food?: string
  fk_id_product_type: number;
  product_id: {
    id: number;
    quantity_product: number;
  };
  description: string | null;
}

interface ListFood {
  id: number;
  type_id?: number;
  food_name?: string;
  measure?: string;
  quantity_product: number;
}

export const inputClassName: string =
  'className="w-full h-11 mt-1 border border-primary-darker bg-white rounded-sm px-2 text-lilas-dark font-semibold text-lg md:h-14 xl:bg-white xl:h-11 xl:px-4 caret-primary-darker';
export const labelClassName: string =
  "font-poppins text-primary-darker font-bold md:text-xl";
export const buttonSubmit: string =
  "w-[45%] h-10 bg-accent text-white md:w-[40%] md:h-12 xl:w-[25%] xl:h-10";
export const buttonCancel: string =
  "w-[45%] h-10 text-dark-purple font-semibold bg-white shadow-purple-sm md:w-[35%] md:h-12 xl:w-[25%] xl:h-10";
export const radioButton: string =
  "appearance-none w-3 h-3 border-2 border-accent rounded-full checked:border-accent checked:border-[6px]";
export const labelRadioButton: string =
  "font-nunito text-primary-darker font-semibold";
export const inputMeasureClass: string =
  "flex w-18 h-6 bg-lilas border border-primary-darker text-primary-darker shadow-purple-sm rounded-lg md:w-20 md:h-7";
export const listProductsClass: string =
  "flex flex-col w-full min-h-34 border border-primary-darker bg-white rounded-lg px-4 py-3 gap-2 overflow-y-auto md:gap-4 xl:bg-white xl:min-h-24 xl:max-h-24 xl:px-6";

function RoutineFeeding() {
  const idChild: number = Number(localStorage.getItem("select_child"))
  const { data: onGetType } = useGetTypeProduct()
  const { mutate: onInsertFeeding } = useRegisterFeeding()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataFeeding>({
    defaultValues: {
      date_time: Date.getHourFormated(),
    },
  });

  const navigate = useNavigate();

  const refDiv = useRef<HTMLDivElement | null>(null)
  const refChild = useRef<HTMLInputElement | null>(null)

  const [childrenSelected, setChildSelected] = useState<number>(1);
  const [dateUTC, setDateUTC] = useState<string>("");
  const [typeFood, setTypeFood] = useState<number | null>(null);
  const [foodSelected, setFoodSelected] = useState<string>("");
  const [listFood, setListFood] = useState<ProductStorage[]>([]);
  const [foodExpandSelector, setFoodExpandSelector] = useState<boolean>(false);
  const [typeFoodExpandSelector, setTypeFoodExpandSelector] =
    useState<boolean>(false);
  const [valueInputTypeFood, setValueInputTypeFood] = useState<string>(
    "Escolha o tipo de alimento deste registro",
  );
  const [food_type, setFoodType] = useState<TypeProduct[]>([]);
  const [foodsMain, setFoodsMain] = useState<ProductStorage[]>([]);
  const [foods, setFoods] = useState<ProductStorage[]>([])

  const { data: onGetProduct } = useGetProductByTypeStorage(typeFood, idChild)

  function removeItemRegister(id: number) {
    const newData: ProductStorage[] = listFood.filter(it => it.id != id)
    setListFood(newData)
  }

  function filterDataTypeProduct(data: TypeProduct[]) {
    const finalData: TypeProduct[] = data.filter(it => it.product_type_name.includes("Alimentação"))

    const formatNameType: TypeProduct[] = finalData.map((type) => {
      const newName: string = type.product_type_name.split("(")[1].replace(")", "")
      return { ...type, product_type_name: newName }
    })
    setFoodType(formatNameType)
  }

  function addImageFoodType(type: string) {
    if (type == "Leite e derivados") {
      return Milk;
    } else if (type == "Alimento sólido") {
      return SolidFood;
    } else if (type == "Papinha ou purê") {
      return BabyFood;
    }

    return;
  }

  function changeFoodSelected(food: ProductStorage) {
    setFoodExpandSelector(false);

    if (listFood.some((it) => it.id == food.id)) {
      return;
    } else {
      setFoodSelected(food.product_name);

      setListFood([...listFood, food]);
    }
  }

  function clearListFood(food_id: number) {
    setTypeFood(food_id);
    setTypeFoodExpandSelector(false);

    setValueInputTypeFood(food_type[food_id - 1].product_type_name);

    if (food_id != typeFood) {
      setListFood([]);
    }
  }

  function changeQuantityFood(id: number, quantity: string) {
    const newListFood: ProductStorage[] = listFood.map((food) => {
      if (food.id == id) {
        return { ...food, quantity: parseInt(quantity) };
      } else {
        return food;
      }
    });

    setListFood(newListFood);
  }

  function sendDatas(datas: DataFeeding) {
    let newListFood: ListFood[] = []

    if (listFood.length > 0 && !listFood.some((it) => it.quantity == 0)) {
      newListFood = listFood.map((food) => {
        return { id: food.id, quantity_product: food.quantity };
      });

    }

    if (typeFood != 0) {
      const fullDatas: RegisterFeeding = {
        fk_id_child: Number(localStorage.getItem("select_child")),
        date_time: Date.convertISO(datas.date_time),
        fk_id_product_type: typeFood!,
        description: datas.description,
        product_id: newListFood
      };
      console.log(fullDatas)
      onInsertFeeding(
        fullDatas,
        {
          onSuccess: (response) => {

          },
          onError: (error) => {
            alert("Ih deu errado hein...")
          }
        }
      )

    } else {

      alert("Selecione o tipo d registro!")
    }


  }

  function filterFood(text: string) {
    const newData: ProductStorage[] = foodsMain.filter(it => it.product_name.toLowerCase().includes(text.toLowerCase()))
    setFoods(newData)
  }

  useEffect(() => {
    setFoodSelected("");
  }, [typeFood]);

  useEffect(() => {
    if (!onGetType) {
      return

    }

    if (onGetType) {
      filterDataTypeProduct(onGetType.type)
    }
  }, [onGetType])

  useEffect(() => {
    if (!onGetProduct) {
      setFoodsMain([])
      setFoods([])
      return

    }

    if (onGetProduct) {
      setFoodsMain(onGetProduct.stock)
      setFoods(onGetProduct.stock)
    }
  }, [onGetProduct])

  return (
    <div
      onClick={(e) => CloseElement.CloseElement(refChild, setFoodExpandSelector, e)}
      ref={refDiv}
      className="w-screen min-h-full
                xl:flex xl:flex-col xl:items-center xl:h-[calc(100%-85px)]"
    >
      <div className="flex w-full">
        <ChildrenSelect
          idChild={childrenSelected}
          setChild={setChildSelected}
        />
      </div>
      <form
        onSubmit={handleSubmit(sendDatas)}
        className="relative flex justify-between flex-col gap-2.5 w-full h-full
            md:gap-0
            xl:justify-around xl:w-[90%] xl:bg-lilas xl:mt-5 xl:rounded-2xl xl:px-14 xl:py-4 xl:shadow-purple-md"
      >
        <header className="hidden xl:flex xl:justify-between">
          <h2 className="xl:flex xl:-ml-6 xl:w-70 xl:text-darker-purple xl:font-bold xl:text-[22px]">
            Registrar alimentação
          </h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="xl:-mr-6"
          >
            <img
              src={Close}
              alt="Fecha o registro de alimentação e retorna a tela anterior."
              className="xl:w-8 xl:h-8"
            />
          </button>
        </header>
        <div className="flex flex-col">
          <label htmlFor="hour" className={labelClassName}>
            Horário
          </label>
          <InputDefault
            {...register("date_time", { required: "Hora obrigatória" })}
            id="hour"
            type="time"
            className={inputClassName}
          />
          {errors.date_time && (
            <p className="text-red-600/70 text-sm font-nunito">
              {errors.date_time.message}
            </p>
          )}
        </div>
        <div className="xl:hidden">
          <label htmlFor="type-food" className={labelClassName}>
            Tipo de alimento
          </label>
          <ul id="type-food" className="flex justify-between mt-2">
            {food_type.map((food) => (
              <li
                key={food.id_product_type}
                className={`w-28 h-26 rounded-lg bg-lilas border border-primary ${typeFood == food.id_product_type ? "shadow-purple-sm bg-lilas-dark/10" : ""}
                                                md:w-42 md:h-42`}
              >
                <button
                  onClick={() => {
                    clearListFood(food.id_product_type);
                    setFoodExpandSelector(false);
                  }}
                  type="button"
                  className="flex w-full h-full"
                >
                  <div className="w-full flex flex-col justify-center items-center">
                    <img
                      aria-hidden="true"
                      src={addImageFoodType(food.product_type_name)}
                      alt=""
                      className="w-15 h-15
                      md:w-23 md:h-23"
                    />
                    <span
                      className="w-[90%] text-center font-nunito text-primary text-sm font-semibold
                                                md:text-lg"
                    >
                      {food.product_type_name}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden xl:relative xl:flex xl:flex-col">
          <div className="flex flex-col">
            <label htmlFor="type-foodXl" className={labelClassName}>
              Tipo de alimento
            </label>
            <div onClick={() =>
              setTypeFoodExpandSelector(!typeFoodExpandSelector)
            }
              aria-label="Icone para visualizar os tipos de alimento."
              className={`xl:flex xl:justify-between xl:items-center xl:z-50 ${inputClassName}`}
            >
              <InputDefault readOnly value={valueInputTypeFood} className="w-full" />
              <img
                src={setSelector}
                alt=""
                className={`xl:w-6 xl:h-6 ${typeFoodExpandSelector ? "turn-set" : "return-set"}`}
              />
            </div>
            <fieldset
              className={`xl:absolute xl:top-15 xl:justify-around xl:w-full xl:h-12 xl:z-40 xl:rounded-bl-lg xl:rounded-br-lg xl:border-b xl:border-l xl:border-r xl:border-primary-darker
                        xl:bg-lightest xl:pt-4 xl:gap-2 ${typeFoodExpandSelector ? "xl:flex" : "xl:hidden"}`}
            >
              {food_type.map((food) => (
                <div
                  key={food.id_product_type}
                  className="xl:flex xl:justify-center xl:items-center xl:h-full xl:pl-2 xl:gap-2"
                >
                  <InputDefault
                    onChange={() => clearListFood(food.id_product_type)}
                    type="radio"
                    id={`TypeFood${food.id_product_type}`}
                    value={food.id_product_type}
                    name="food"
                    className={radioButton}
                  />
                  <label
                    htmlFor={`TypeFood${food.id_product_type}`}
                    className={labelRadioButton}
                  >
                    {food.product_type_name}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>
        </div>
        <div className="relative flex flex-col">
          <label htmlFor="food" className={labelClassName}>
            Alimento <span className="italic text-[12px]">(Registre apenas items que esgotaram por completo!)</span>
          </label>
          <input
            ref={refChild}
            readOnly={typeFood == null}
            onChange={(e) => {
              setFoodSelected(e.target.value)
              filterFood(e.target.value)
            }}
            aria-label="Clique aqui para exibir os alimentos cadastrados e selecioná-los."
            value={
              typeFood == null ? "Selecione um tipo de alimento!" : foodSelected
            }
            onClick={() => setFoodExpandSelector(true)}
            id="food"
            className={`z-30 ${inputClassName}`}
          />

          <fieldset
            className={`absolute top-21 flex-col w-full h-70 rounded-bl-lg rounded-br-lg border-b border-l border-r border-primary-darker
                        overflow-y-scroll bg-lightest pt-4 gap-2 ${foodExpandSelector && typeFood != null ? "flex" : "hidden"}
                        md:top-20 md:h-76
                        xl:top-15 xl:h-54`}
          >
            {foods.length == 0 &&
              <div className="flex flex-col w-full h-full pt-10 gap-5 items-center">
                <span className="text-[15px] font-semibold text-primary-text">Parece que não há nenhum produto deste tipo...</span>
                <Link to="/add-storage"
                  className="bg-accent rounded-md text-white font-semibold w-40 h-9 flex justify-center items-center"
                >Registrar Produto</Link>
              </div>
            }

            {foods.length > 0 && foods.map((food) => {
              return (
                <div
                  key={food.id}
                  className="flex items-center w-full h-8 pl-2 gap-2"
                >
                  <InputDefault
                    onChange={() => changeFoodSelected(food)}
                    type="radio"
                    id={`food${food.id}`}
                    value={food.product_name}
                    name="food"
                    className={radioButton}
                  />
                  <label htmlFor={`food${food.id}`} className={labelRadioButton}>
                    {food.product_name}
                  </label>
                </div>
              )
            })}
          </fieldset>
        </div>
        <ul className={listProductsClass}>
          {listFood.map((food) => (
            <li key={food.id} className="flex justify-between items-center">
              <span
                className="text-lilas-dark font-semibold text-lg
                                    md:text-xl"
              >
                {`${food.product_name} (${food.volume}${food.measure})`}
              </span>
              <div className="flex gap-10">
                <div className={inputMeasureClass}>
                  <InputDefault
                    onChange={(e) => changeQuantityFood(food.id, e.target.value)}
                    type="number"
                    value={`${food.quantity}`}
                    className="w-2/3 pl-2 text-center"
                  />
                  <span className="w-1/3">un</span>
                </div>
                <button onClick={() => removeItemRegister(food.id)} type="button">
                  <img src={Trash} alt="Exclui o item do registro." className="w-auto h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="font-poppins text-primary-darker font-bold
                                                            md:text-xl"
          >
            Descrição
          </label>
          <InputDefault
            {...register("description", { required: false })}
            id="description"
            maxLength={160}
            className={inputClassName}
          />
        </div>
        <div
          className="flex justify-between w-full h-10 mb-1
                        md:justify-center md:gap-10 md:h-12
                        xl:h-10 xl:gap-20"
        >
          <BtnPrimary
            onClick={() => navigate(-1)}
            text="Cancelar"
            className={buttonCancel}
          />
          <BtnPrimary type="submit" text="Registrar" className={buttonSubmit} />
        </div>
      </form>
    </div>
  );
}

export default RoutineFeeding;

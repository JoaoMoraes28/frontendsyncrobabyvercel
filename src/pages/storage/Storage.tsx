import exportIcon from "../../assets/exportIcon.svg";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { InputDefault } from "../../components/InputDefault";
import Search from "../../assets/search.svg";
import HygieneIcon from "../../assets/hygieneIcon.svg?react";
import SolidFood from "../../assets/appleBananaGB.svg?react"
import Milk from "../../assets/milkGB.svg?react"
import BabyFood from "../../assets/baby_foodGB.svg?react"
import Remedy from "../../assets/iconRemedyGB.svg?react"
import Acessory from "../../assets/iconAcessoryGB.svg?react"
import { SummaryCard } from "./components/SummaryCard";
import { ProductCard } from "./components/ProductCard";

import { Link, useNavigate } from "react-router-dom";

import ConvertImg from "../../utils/DownloadImg.ts";

import { useGetStorage } from "../../services/hooks/storage/useGetStorage.ts";
import { usePatchStorage } from "../../services/hooks/storage/usePatchQuantityStorage.ts";
import { useDeleteStorage } from "../../services/hooks/storage/useDeleteProduct.ts";
import type { PatchQuantity } from "../../services/storage/storage.service.ts";
import type { ProductStorage } from "../../services/storage/storage.service.ts";

import { LoadingBaby } from "../../components/LoadingBaby.tsx";
import { EmptyState } from "../../components/EmptyState.tsx";

export interface InventoryItem {
  id: number;
  category: string;
  name: string;
  quantity: number;
  unitType: string;
  daysRemaining: number;
  description: string | null;
  themeColor: string;
}

const getCategoryIcon = (category: string): React.ElementType => {
  const icons: Record<string, React.ElementType> = {
    Acessórios: Acessory,
    "Alimentação (Papinha ou purê)": BabyFood,
    Higiene: HygieneIcon,
    "Alimentação (Alimento sólido)": SolidFood,
    "Alimentação (Leite e derivados)": Milk,
    Saúde: Remedy,
  };
  return icons[category] ?? HygieneIcon;
};

export function Storage() {
  const navigate = useNavigate()

  const idChild: number = Number(localStorage.getItem("select_child"))
  const { data: onGetStorage, isError, isLoading, refetch } = useGetStorage(idChild, true)
  const { mutate: onPatchQuantity } = usePatchStorage()
  const { mutate: onDeleteStorage } = useDeleteStorage()

  const refProducts = useRef<HTMLDivElement | null>(null);

  const [inventoryItems, setInventoryItems] = useState<ProductStorage[] | undefined>([]);
  const [inventoryItemsFilter, setInventoryItemsFilter] = useState<ProductStorage[] | undefined>([]);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [userInput, setUserInput] = useState("");

  const getStatusColor = (quantity: number) => {
    if (quantity <= 1) return "var(--color-red-light)";
    if (quantity <= 3) return "var(--color-yellow-warning)";
    return "var(--color-green-success)";
  };

  const getStatusLabel = (quantity: number): string => {
    if (quantity <= 1) return "Estoque baixo";
    if (quantity <= 3) return "Estoque em alerta";
    return "Estoque em dia";
  };

  const stats = useMemo(() => {
    return {
      healthy: inventoryItems!.filter(
        (i) => getStatusColor(i.quantity) === "var(--color-green-success)",
      ).length,
      warning: inventoryItems!.filter(
        (i) => getStatusColor(i.quantity) === "var(--color-yellow-warning)",
      ).length,
      danger: inventoryItems!.filter(
        (i) => getStatusColor(i.quantity) === "var(--color-red-light)",
      ).length,
    };
  }, [inventoryItems]);

  function filteredItems(text: string) {
    const productFilter: ProductStorage[] | undefined = inventoryItemsFilter?.filter(it => it.product_name.toLowerCase().includes(text.toLowerCase()))
    setInventoryItems(productFilter)
  }

  const updateItemQuantity = (id: number, delta: number) => {
    const product: ProductStorage[] | undefined = inventoryItems?.filter(it => it.id == id)

    if ((product![0].quantity > 0 || delta == 1) && product![0].quantity < 99) {
      const newQuantity: PatchQuantity = {
        new_quantity: product![0].quantity + delta
      }

      onPatchQuantity(
        {
          data: newQuantity,
          id_product: id
        },
        {
          onSuccess: () => {
            const newData: ProductStorage[] | undefined = inventoryItems?.map((it) => {
              if (it.id == id) {
                return { ...it, quantity: newQuantity.new_quantity }
              }
              return it
            })
            setInventoryItems(newData)

          }, onError: () => {

          }
        }
      )
    }

    return

  };

  const toggleCard = (id: number) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const handleDeleteItem = (itemId: number) => {
    onDeleteStorage(
      itemId,
      {
        onSuccess: () => {
          refetch()
          const newProducts: ProductStorage[] = inventoryItems!.filter(it => it.id != itemId)
          setInventoryItems(newProducts)
        }, onError: () => {

        }
      }
    )
  };

  useEffect(() => {
    if (!onGetStorage) {
      return
    }

    if (onGetStorage) {
      console.log(onGetStorage)
      setInventoryItems(onGetStorage.stock)
      setInventoryItemsFilter(onGetStorage.stock)
    }
  }, [onGetStorage])

  return (
    <div className="w-full h-full flex flex-col gap-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:justify-end lg:items-center gap-4">
        <div className="flex w-full h-9 rounded-2xl bg-lilas shadow-purple-sm px-2 md:h-11 lg:max-w-md
        xl:hidden">
          <img src={Search} alt="" className="w-4" />
          <InputDefault
            className="w-full pl-2 bg-transparent outline-none border-none font-poppins text-text-primary"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value)
              filteredItems(e.target.value)
            }}
            placeholder="Buscar produto..."
          />
        </div>

        <Link
          to="/add-storage"
          className="hidden lg:flex justify-center bg-accent text-white font-bold py-2 px-6 rounded-xl shadow-md hover:brightness-95 active:scale-95 transition-all cursor-pointer"
          onClick={() => { }}
        >
          Adicionar item ao estoque
        </Link>
      </div>

      <div className="w-full flex justify-end items-center z-89">
        <button
          onClick={() =>
            ConvertImg.DownloadElement(refProducts.current!, "storage")
          }
        >
          <img
            src={exportIcon}
            alt="Exportar lista de produtos para pdf."
            className="w-5 cursor-pointer"
          />
        </button>
      </div>

      <div className="hidden lg:grid grid-cols-3 gap-6">
        <SummaryCard
          icon="✓"
          count={stats.healthy}
          label="Estoque saudável"
          color="text-green-500"
        />
        <SummaryCard
          icon="!"
          count={stats.warning}
          label="Estoque em alerta"
          color="text-yellow-500"
        />
        <SummaryCard
          icon="X"
          count={stats.danger}
          label="Estoque baixo"
          color="text-red-600"
        />
      </div>

      <div
        ref={refProducts}
        className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:items-start overflow-y-auto flex-1 min-h-0 lg:max-h-none lg:overflow-visible p-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        xl:overflow-y-auto"
      >
        {isLoading && <LoadingBaby text="Buscando produtos" />}

        {!isLoading && isError
          && <p className="text-red-500 font-poppins col-span-full text-center mt-4"
          >Erro ao carregar a API
          </p>}

        {!isLoading && !isError && inventoryItems?.length === 0 && (
          <EmptyState
            isFullPage={false}
            show404Background={false}
            title={"Nenhum produto encontrado!"}
            description={"O que acha de adicionar algo no estoque?"}
            buttonText="Adicionar Produto"
            onButtonClick={() => navigate("/add-storage")}
          />
        )}

        {!isLoading && !isError && inventoryItems?.map((item) => {
          return (
            <ProductCard
              key={item.id}
              item={item}
              icon={getCategoryIcon(item.type)}
              getStatusColor={getStatusColor}
              getStatusLabel={getStatusLabel}
              toggleCard={toggleCard}
              expandedCardId={expandedCardId}
              updateItemQuantity={updateItemQuantity}
              handleDeleteItem={handleDeleteItem}
            />
          )
        })}

      </div>

      {!isLoading && !isError && inventoryItems!.length > 0 &&
        <div className="lg:hidden shrink-0 w-full flex justify-center pb-6 md:mt-0">
          <Link
            to="/add-storage"
            className="flex justify-center bg-accent text-white font-poppins font-bold text-lg w-[90%] max-w-87.5 py-3 rounded-xl shadow-md cursor-pointer hover:opacity-90 active:scale-95 transition-all"
          >
            Adicionar produto
          </Link>
        </div>}

    </div>
  );
}

import exportIcon from "../../assets/exportIcon.svg";
import React, { useState, useMemo, useRef } from "react";
import {
  DropdownFilter,
  type FilterOption,
} from "../../components/DropDownFilter";
import { InputDefault } from "../../components/InputDefault";
import Search from "../../assets/search.svg";
import HygieneIcon from "../../assets/hygieneIcon.svg?react";
import { SummaryCard } from "./components/SummaryCard";
import { ProductCard } from "./components/ProductCard";

import { Link } from "react-router-dom";

import ConvertImg from "../../utils/DownloadImg"

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

const items: InventoryItem[] = [
  {
    id: 1,
    category: "Acessórios",
    name: "Talco",
    quantity: 1,
    unitType: "unidade(s)",
    daysRemaining: 2,
    description: null,
    themeColor: "#f28b82",
  },
  {
    id: 2,
    category: "Papinha ou purê",
    name: "Papinha de Mandioquinha",
    quantity: 6,
    unitType: "unidade(s)",
    daysRemaining: 3,
    description:
      "Papinha natural de mandioquinha, cenoura e frango desfiado. Sem adição de sal ou conservantes. Ideal para a introdução alimentar a partir dos 6 meses.",
    themeColor: "#fde293",
  },
  {
    id: 3,
    category: "Higiene",
    name: "Lenços Umedecidos",
    quantity: 3,
    unitType: "caixa(s)",
    daysRemaining: 9,
    description: null,
    themeColor: "#e8eaed",
  },
  {
    id: 4,
    category: "Alimento sólido",
    name: "Biscoito de Arroz",
    quantity: 2,
    unitType: "pacote(s)",
    daysRemaining: 5,
    description: "Biscoito de arroz integral orgânico para lanches rápidos.",
    themeColor: "#b8e1dd",
  },
  {
    id: 5,
    category: "Leite e derivados",
    name: "Fórmula Infantil",
    quantity: 4,
    unitType: "lata(s)",
    daysRemaining: 12,
    description: "Fórmula de seguimento para lactentes.",
    themeColor: "#d7eef4",
  },
  {
    id: 6,
    category: "Medicamentos",
    name: "Antitérmico",
    quantity: 1,
    unitType: "frasco(s)",
    daysRemaining: 20,
    description: "Solução oral para alívio de febre e dores.",
    themeColor: "#f3e5f5",
  },
];

const filterOptions: FilterOption[] = [
  { id: "todas", label: "Todas" },
  { id: "alimento-solido", label: "Alimento sólido" },
  { id: "leite-derivados", label: "Leite e derivados" },
  { id: "papinha-pure", label: "Papinha ou purê" },
  { id: "higiene", label: "Higiene" },
  { id: "medicamentos", label: "Medicamentos" },
  { id: "acessorios", label: "Acessórios" },
];

const getCategoryIcon = (category: string): React.ElementType => {
  const icons: Record<string, React.ElementType> = {
    Acessórios: HygieneIcon,
    "Papinha ou purê": HygieneIcon,
    Higiene: HygieneIcon,
    "Alimento sólido": HygieneIcon,
    "Leite e derivados": HygieneIcon,
    Medicamentos: HygieneIcon,
  };
  return icons[category] ?? HygieneIcon;
};

export function Storage() {
  const refProducts = useRef<HTMLDivElement | null>(null)

  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(items);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [userInput, setUserInput] = useState("");

  const getStatusColor = (quantity: number) => {
    if (quantity <= 1) return "var(--color-red-light)";
    if (quantity <= 3)
      return "var(--color-yellow-warning)";
    return "var(--color-green-success)";
  };

  const getStatusLabel = (quantity: number, daysRemaining: number): string => {
    if (quantity <= 1 || daysRemaining <= 3) return "Estoque baixo";
    if (quantity <= 3 || daysRemaining <= 7) return "Estoque em alerta";
    return "Estoque em dia";
  };

  const stats = useMemo(() => {
    return {
      healthy: inventoryItems.filter(
        (i) =>
          getStatusColor(i.quantity) ===
          "var(--color-green-success)",
      ).length,
      warning: inventoryItems.filter(
        (i) =>
          getStatusColor(i.quantity) ===
          "var(--color-yellow-warning)",
      ).length,
      danger: inventoryItems.filter(
        (i) =>
          getStatusColor(i.quantity) ===
          "var(--color-red-light)",
      ).length,
    };
  }, [inventoryItems]);

  const filteredItems = inventoryItems.filter((item) => {
    const matchesCategory =
      selectedFilter === "Todas" || item.category === selectedFilter;
    const matchesSearch = item.name
      .trim()
      .toLowerCase()
      .includes(userInput.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const updateItemQuantity = (id: number, delta: number) => {
    setInventoryItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item,
      ),
    );
  };

  const toggleCard = (id: number) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      setInventoryItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId),
      );
    } catch (error) {
      console.error("Erro ao deletar o item", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex w-full h-9 rounded-2xl bg-lilas shadow-purple-sm px-2 md:h-11 lg:max-w-md">
          <img src={Search} alt="" className="w-4" />
          <InputDefault
            className="w-full pl-2 bg-transparent outline-none border-none font-poppins text-text-primary"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
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

      <div className="w-full flex justify-between items-center z-89">
        <DropdownFilter
          options={filterOptions}
          selectedFilter={selectedFilter}
          onSelect={setSelectedFilter}
        />
        <button onClick={() => ConvertImg.DownloadElement(refProducts.current!!, 'storage')}>
          <img src={exportIcon} alt="Exportar lista de produtos para pdf." className="w-5 cursor-pointer" />
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

      <div ref={refProducts} className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:items-start overflow-y-auto flex-1 min-h-0 lg:max-h-none lg:overflow-visible p-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filteredItems.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            icon={getCategoryIcon(item.category)}
            getStatusColor={getStatusColor}
            getStatusLabel={getStatusLabel}
            toggleCard={toggleCard}
            expandedCardId={expandedCardId}
            updateItemQuantity={updateItemQuantity}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </div>

      <div className="lg:hidden shrink-0 w-full flex justify-center pb-6 md:mt-0">
        <Link
          to="/add-storage"
          className="flex justify-center bg-accent text-white font-poppins font-bold text-lg w-[90%] max-w-87.5 py-3 rounded-xl shadow-md cursor-pointer hover:opacity-90 active:scale-95 transition-all"
        >
          Adicionar produto
        </Link>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownFilter,
  type FilterOption,
} from "../../components/DropDownFilter";
import BtnPrimary from "../../components/BtnPrimary";
import { IllnessCard } from "./components/IllnessCard";
import ChildrenSelect from "../../layouts/ChildrenSelect";

import { useGetIllness } from "../../services/hooks/illness/useGetIllness";
import { useDeleteIllness } from "../../services/hooks/illness/useDeleteIllness";
import { LoadingBaby } from "../../components/LoadingBaby";
import { EmptyState } from "../../components/EmptyState";

// Mantive a interface aqui caso precise, mas recomendo importar direto do service
export interface HealthRecord {
  id_illness: number;
  illness_name: string;
  illness_type: string;
  start_date: string;
  end_date: string;
  medication: string;
  description: string;
  fk_id_child: number;
}

const filterOptions: FilterOption[] = [
  { id: "Todas", label: "Todas" },
  { id: "Aguda", label: "Aguda" },
  { id: "Crônica", label: "Crônica" },
];

export function Health() {
  const navigate = useNavigate();
  const childId = Number(localStorage.getItem("select_child"));

  const {
    data: onGetIllness,
    isLoading,
    isError,
    refetch
  } = useGetIllness(childId, true);

  const { mutate: onDeleteIllness } = useDeleteIllness();

  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [childSelected, setChildSelected] = useState<number>(childId || 1);

  const illnessList = onGetIllness?.illness || [];

  const filteredItems = illnessList.filter((item) => {
    if (selectedFilter === "Todas") return true;
    const compareOpt = selectedFilter === "Aguda" ? "acute" : "chronic";
    return item.illness_type === compareOpt;
  });

  const emptyStateTitle: string =
    selectedFilter === "Todas"
      ? "Eba! Nenhuma doença registrada"
      : `Eba! Nenhuma doença ${selectedFilter.toLowerCase()} registrada`;

  const emptyStateDescription: string =
    selectedFilter === "Todas"
      ? "Mas você vai ter que registrar?"
      : `Mas você vai ter que registrar alguma doença ${selectedFilter.toLowerCase()}?`;

  const toggleCard = (id: number) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const handleFilterSelect = (opt: string) => {
    setSelectedFilter(opt);
  };

  const deleteItem = (id: number) => {
    onDeleteIllness(id, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex md:hidden flex-col justify-between items-center gap-4 w-full">
        <div className="w-full flex justify-between items-center">
          <DropdownFilter
            options={filterOptions}
            selectedFilter={selectedFilter}
            onSelect={handleFilterSelect}
          />
          <BtnPrimary
            text="Registrar Enfermidade"
            className="bg-accent flex justify-center items-center text-white font-poppins font-bold text-sm max-w-[65%] max-h-10 text-center rounded-lg shadow-md cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            onClick={() => navigate("/add-illness")}
          />
        </div>
      </div>

      <div className="hidden md:flex md:justify-between gap-6 w-full">
        <div className="flex flex-row items-center gap-6">
          <div className="flex items-center gap-3">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleFilterSelect(opt.label)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                  selectedFilter === opt.label
                    ? "bg-accent text-white border-accent shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:border-accent hover:text-accent"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => navigate("/add-illness")}
            className="bg-[#8A56E2] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 w-fit hover:opacity-90 active:scale-95 transition-all shadow-md"
          >
            <span className="text-xl leading-none font-light">+</span> Registrar
            Enfermidades
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[75vh] md:max-h-full pr-2 pb-4">
        {isLoading && <LoadingBaby text="Buscando enfermidades" />}

        {!isLoading && isError && (
          <p className="text-red-500 font-poppins col-span-full text-center mt-4">
            Erro ao buscar histórico. Tente novamente mais tarde.
          </p>
        )}

        {!isLoading && !isError && filteredItems.length === 0 && (
          <EmptyState
            isFullPage={false}
            show404Background={false}
            title={emptyStateTitle}
            description={emptyStateDescription}
            buttonText="Adicionar enfermidade"
            onButtonClick={() => navigate("/add-illness")}
          />
        )}

        {!isLoading &&
          !isError &&
          filteredItems.map((item) => {
            return (
              <IllnessCard
                key={item.id_illness}
                item={item}
                expandedCardId={expandedCardId}
                toggleCard={toggleCard}
                onDelete={deleteItem}
              />
            );
          })}
      </div>
    </div>
  );
}

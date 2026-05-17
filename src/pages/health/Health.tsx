import { useEffect, useState } from "react";
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
import type { Illness } from "../../services/illness/illness.service";

export interface HealthRecord {
  id_illness: number;
  illness_name: string;
  illness_type: string;
  start_date: string;
  end_date: string;
  medication: string;
  description: string;
  fk_id_child: number
}

const filterOptions: FilterOption[] = [
  { id: "Todas", label: "Todas" },
  { id: "Aguda", label: "Aguda" },
  { id: "Crônica", label: "Crônica" },
];

export function Health() {
  const { data: onGetIllness } = useGetIllness(Number(localStorage.getItem("select_child")))
  const { mutate: onDeleteIllness } = useDeleteIllness()

  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [childSelected, setChildSelected] = useState<number>(1)
  const [items, setItems] = useState<Illness[]>([]);
  const [itemsHealth, setItemsHealth] = useState<Illness[]>([])

  useEffect(() => {
    const isObject = onGetIllness && typeof onGetIllness === "object" && !Array.isArray(onGetIllness);
    
    if (isObject) {
      if (onGetIllness.illness) {
        setItemsHealth(onGetIllness.illness);
        setItems(onGetIllness.illness);
      }
    }
  }, [onGetIllness]);

  if (!onGetIllness) {
    return (
      <div></div>
    )
  }

  const toggleCard = (id: number) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  function filteredItems(opt: string) {
    setSelectedFilter(opt)
    const compareOpt: string = opt == "Aguda" ? 'acute' : "chronic"
    if (opt === "Todas") {
      setItemsHealth(items)

    } else {
      const newData: Illness[] = items.filter(it => it.illness_type === compareOpt)
      setItemsHealth(newData)

    }

  }

  function deleteItem(id: number) {
    onDeleteIllness(
      id,
      {
        onSuccess: () => {
          const newData: Illness[] = items.filter(it => it.id_illness != id && it.illness_type == (selectedFilter == "Aguda" ? "acute" : "chronic"))
          setItemsHealth(newData)
          const newDataDelete: Illness[] = items.filter(it => it.id_illness != id)
          setItems(newDataDelete)
        },
        onError: (error) => {
          console.log(error)
        }
      }
    )
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex md:hidden flex-col justify-between items-center gap-4 w-full">
        <div className="w-full flex justify-between items-center">
          <DropdownFilter
            options={filterOptions}
            selectedFilter={selectedFilter}
            onSelect={filteredItems}
          />
          <BtnPrimary
            text="Registrar Enfermidade"
            className="bg-accent flex justify-center items-center text-white font-poppins font-bold text-sm max-w-[65%] max-h-10 text-center rounded-lg shadow-md cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            onClick={() => navigate("/add-illness")}
          />
        </div>
      </div>

      <div className="hidden md:flex flex-col gap-6 w-full">
        <div className="flex flex-row items-center gap-6">
          <div className="flex">
            <ChildrenSelect idChild={childSelected} setChild={setChildSelected} />
          </div>

          <div className="flex items-center gap-3">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => filteredItems(opt.label)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition-all ${selectedFilter === opt.label
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
        {itemsHealth.map((item) => (
          <IllnessCard
            key={item.id_illness}
            item={item}
            expandedCardId={expandedCardId}
            toggleCard={toggleCard}
            onDelete={deleteItem}
          />
        ))}
        {itemsHealth.length === 0 && (
          <p className="text-center text-primary-darker font-nunito mt-10 md:col-span-full">
            Nenhuma enfermidade encontrada para este filtro.
          </p>
        )}
      </div>
    </div>
  );
}

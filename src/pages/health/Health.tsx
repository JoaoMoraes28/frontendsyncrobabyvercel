import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownFilter,
  type FilterOption,
} from "../../components/DropDownFilter";
import BtnPrimary from "../../components/BtnPrimary";
import { IllnessCard } from "./components/IllnessCard";
import ChildrenSelect from "../../layouts/ChildrenSelect";

export interface HealthRecord {
  id: number;
  nome: string;
  tipo: "Aguda" | "Crônica";
  dataRegistro: string;
  dataInicio: string;
  dataTermino?: string;
  medicacao: string;
  descricao: string;
}

const filterOptions: FilterOption[] = [
  { id: "Todas", label: "Todas" },
  { id: "Aguda", label: "Aguda" },
  { id: "Crônica", label: "Crônica" },
];

const items: HealthRecord[] = [
  {
    id: 1,
    nome: "Gripe",
    tipo: "Aguda",
    dataRegistro: "01/06/2025",
    dataInicio: "01/06/2025",
    dataTermino: "05/06/2025",
    medicacao: "Dipirona",
    descricao: "Congestão nasal, dor de garganta, cansaço extremo.",
  },
  {
    id: 2,
    nome: "Infecção de Ouvido",
    tipo: "Aguda",
    dataRegistro: "07/07/2025",
    dataInicio: "05/07/2025",
    dataTermino: "12/07/2025",
    medicacao: "Amoxicilina",
    descricao: "Dor intensa no canal auditivo e febre leve.",
  },
  {
    id: 3,
    nome: "Conjuntivite Alérgica",
    tipo: "Crônica",
    dataRegistro: "05/04/2024",
    dataInicio: "01/04/2024",
    medicacao: "Colírio Antihistamínico",
    descricao: "Irritação ocular sazonal devido a pólen.",
  },
  {
    id: 4,
    nome: "Gripe",
    tipo: "Aguda",
    dataRegistro: "11/03/2026",
    dataInicio: "10/03/2026",
    dataTermino: "15/03/2026",
    medicacao: "Antigripal comum",
    descricao: "Sintomas leves de resfriado.",
  },
  {
    id: 5,
    nome: "Gripe",
    tipo: "Aguda",
    dataRegistro: "18/09/2026",
    dataInicio: "15/09/2026",
    dataTermino: "22/09/2026",
    medicacao: "Repouso e hidratação",
    descricao: "Dores no corpo e coriza.",
  },
];

export function Health() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [childSelected, setChildSelected] = useState<number>(1)

  const toggleCard = (id: number) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const filteredItems = items.filter((item) => {
    if (selectedFilter === "Todas") return true;
    return item.tipo === selectedFilter;
  });

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex md:hidden flex-col justify-between items-center gap-4 w-full">
        <div className="w-full flex justify-between items-center">
          <DropdownFilter
            options={filterOptions}
            selectedFilter={selectedFilter}
            onSelect={setSelectedFilter}
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
                onClick={() => setSelectedFilter(opt.label)}
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
        {filteredItems.map((item) => (
          <IllnessCard
            key={item.id}
            item={item}
            expandedCardId={expandedCardId}
            toggleCard={toggleCard}
          />
        ))}
        {filteredItems.length === 0 && (
          <p className="text-center text-primary-darker font-nunito mt-10 md:col-span-full">
            Nenhuma enfermidade encontrada para este filtro.
          </p>
        )}
      </div>
    </div>
  );
}

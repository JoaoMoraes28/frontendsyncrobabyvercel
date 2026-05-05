import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownFilter,
  type FilterOption,
} from "../../components/DropDownFilter";
import BtnPrimary from "../../components/BtnPrimary";
import { IllnessCard } from "./components/IllnessCard";

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
  { id: "todas", label: "Todas" },
  { id: "aguda", label: "Aguda" },
  { id: "cronica", label: "Crônica" },
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

  const toggleCard = (id: number) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const filteredItems = items.filter((item) => {
    if (selectedFilter === "Todas") return true;
    return item.tipo === selectedFilter;
  });

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
        <div className="w-full lg:w-auto flex justify-between items-center">
          <DropdownFilter
            options={filterOptions}
            selectedFilter={selectedFilter}
            onSelect={setSelectedFilter}
          />

          <BtnPrimary
            text="Registrar Enfermidade"
            className="bg-accent flex justify-center items-center text-white font-poppins font-bold text-sm md:text-lg max-w-[65%] max-h-10 text-center rounded-xl shadow-md cursor-pointer hover:opacity-90 active:scale-95 transition-all lg:hidden"
            onClick={() => navigate("/add-illness")}
          />
        </div>

        {/* Botão na versão Desktop */}
        <BtnPrimary
          text="Registrar Enfermidade"
          className="hidden lg:flex bg-accent justify-center items-center text-white font-poppins font-bold text-lg w-auto px-6 h-10 text-center rounded-xl shadow-md cursor-pointer hover:opacity-90 active:scale-95 transition-all"
          onClick={() => navigate("/add-illness")}
        />
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto max-h-[65vh] pr-2 pb-4">
        {filteredItems.map((item) => (
          <IllnessCard
            key={item.id}
            item={item}
            expandedCardId={expandedCardId}
            toggleCard={toggleCard}
          />
        ))}
        {filteredItems.length === 0 && (
          <p className="text-center text-primary-darker font-nunito mt-10">
            Nenhuma enfermidade encontrada para este filtro.
          </p>
        )}
      </div>
    </div>
  );
}

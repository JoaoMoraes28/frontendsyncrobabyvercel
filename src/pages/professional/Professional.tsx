import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BtnPrimary from "../../components/BtnPrimary";
import {
  DropdownFilter,
  type FilterOption,
} from "../../components/DropDownFilter";
import { SupportNetworkCard } from "./components/SupportNetworkCard";

import { ProfessionalCard } from "./components/ProfessionalCard";
import { DesktopFilterTabs } from "./components/DesktopFilterTabs";
import { MobileSearchBar } from "./components/MobileSearchBar";

const professionals = [
  {
    id: 1,

    name: "Dr. Henrique Cavalcante",

    address:
      "Av. das Orquídeas, 450, Edifício Vital, Sala 82 — Jardim das Flores, Carapicuíba.",

    phone: "(11) 4002-8922",

    specialty: "Pediatra",
  },

  {
    id: 2,

    name: "Dra. Beatriz Helena Fogaça",

    address: "Alameda Rio Negro, 1030, Condomínio Alpha — Alphaville, Barueri.",

    phone: "(11) 4191-0032",

    specialty: "Pediatra",
  },

  {
    id: 3,

    name: "Dr. Tiago Pasternak",

    address: "Rua das Figueiras, 215, Térreo — Vila Augusta, Carapicuíba.",

    phone: "(11) 98765-4321",

    specialty: "Obstetra",
  },

  {
    id: 4,

    name: "Dra. Mariana Luz",

    address: "Av. dos Autonomistas, 2502, Sala 1204 — Centro, Osasco.",

    phone: "(11) 3682-1500",

    specialty: "Psicólogo",
  },

  {
    id: 5,

    name: "Dra. Camila Nogueira",

    address:
      "Rua Corifeu de Azevedo Marques, 112, Clínica Crescer — Centro, Carapicuíba.",

    phone: "(11) 4183-1234",

    specialty: "Pediatra",
  },

  {
    id: 6,

    name: "Dr. Roberto Almeida",

    address: "Av. Inocêncio Seráfico, 2000, Sala 15 — Vila Dirce, Carapicuíba.",

    phone: "(11) 98123-4567",

    specialty: "Pediatra",
  },

  {
    id: 7,

    name: "Dra. Juliana Mendes",

    address:
      "Rua Conceição Sammartino, 45, Centro Médico — Jardim Jandira, Jandira.",

    phone: "(11) 4619-8877",

    specialty: "Obstetra",
  },

  {
    id: 8,

    name: "Dr. Lucas Fernandes",

    address:
      "Av. Alphaville, 779, Empresarial 18 do Forte — Alphaville, Barueri.",

    phone: "(11) 97531-2468",

    specialty: "Psicólogo",
  },

  {
    id: 9,

    name: "Dra. Vanessa Costa",

    address: "Av. dos Autonomistas, 1400, Consultório 3 — Vila Yara, Osasco.",

    phone: "(11) 3681-9988",

    specialty: "Pediatra",
  },

  {
    id: 10,

    name: "Dr. Fernando Ribeiro",

    address: "Av. Rui Barbosa, 300, Sala 401 — Centro, Carapicuíba.",

    phone: "(11) 94455-6677",

    specialty: "Pediatra",
  },
];

const filterOptions: FilterOption[] = [
  { id: "todas", label: "Todas" },
  { id: "pediatra", label: "Pediatra" },
  { id: "obstetra", label: "Obstetra" },
  { id: "psicologo", label: "Psicólogo" },
];

export function Professional() {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todas");

  const filteredItems = professionals.filter((item) => {
    const matchesCategory =
      selectedFilter === "Todas" || item.specialty === selectedFilter;
    const matchesSearch = item.name
      .trim()
      .toLowerCase()
      .includes(userInput.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col gap-6 overflow-hidden bg-transparent">
      <MobileSearchBar
        value={userInput}
        onChange={setUserInput}
        placeholder="Buscar profissional..."
      />

      <SupportNetworkCard />

      <div className="w-full flex flex-col lg:flex-row justify-between items-center z-89 gap-4">
        <div className="w-full lg:hidden flex justify-between items-center">
          <DropdownFilter
            options={filterOptions}
            selectedFilter={selectedFilter}
            onSelect={setSelectedFilter}
          />
          <BtnPrimary
            text="Adicionar profissional"
            className="bg-accent flex justify-center items-center text-white font-poppins font-bold text-lg max-w-[70%] max-h-10 text-center shadow-md cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            onClick={() => navigate("/add-pediatrician")}
          />
        </div>

        <DesktopFilterTabs
          options={filterOptions}
          selectedFilter={selectedFilter}
          onSelect={setSelectedFilter}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 overflow-y-auto max-h-145 md:max-h-[65vh] pr-2">
        {filteredItems.map((professional) => (
          <ProfessionalCard
            key={professional.id}
            professional={professional}
            onEdit={() =>
              navigate("/edit-pediatrician", { state: { professional } })
            }
          />
        ))}
      </div>
    </div>
  );
}

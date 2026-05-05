import {
  DropdownFilter,
  type FilterOption,
} from "../../components/DropDownFilter";
import { useState } from "react";

export type VaccineStatus = "Pendente" | "Aplicada";

export interface Vaccine {
  id: string;
  ageGroup: string;
  name: string;
  status: VaccineStatus;
  date: string;
  preventedDiseases: string;
  observation: string;
}

const vaccinesData: Vaccine[] = [
  {
    id: "1",
    ageGroup: "0 - 6 meses",
    name: "Pneumocócica 23-valente (1ª dose)",
    status: "Pendente",
    date: "Pendente",
    preventedDiseases:
      "doenças pneumocócicas invasivas pelos sorogrupos contidos na vacina.",
    observation:
      "Sem histórico vacinal com pneumo conjugada. Uma segunda dose deve ser administrada com intervalo de 5 anos após a 1ª dose. Somente povos indígenas.",
  },
  {
    id: "2",
    ageGroup: "0 - 6 meses",
    name: "Rotavírus (1ª dose)",
    status: "Aplicada",
    date: "28/02/2026",
    preventedDiseases: "Diarreia por rotavírus.",
    observation: "Administração oral.",
  },
  {
    id: "3",
    ageGroup: "7 - 12 meses",
    name: "Febre Amarela (1ª dose)",
    status: "Pendente",
    date: "Pendente",
    preventedDiseases: "Febre amarela.",
    observation: "Dose única recomendada aos 9 meses de idade.",
  },
  {
    id: "4",
    ageGroup: "7 - 12 meses",
    name: "Meningocócica C (Reforço)",
    status: "Aplicada",
    date: "10/02/2026",
    preventedDiseases: "Doença meningocócica do sorogrupo C.",
    observation: "Administrar aos 12 meses.",
  },
  {
    id: "5",
    ageGroup: "1 - 2 anos",
    name: "Hepatite A",
    status: "Pendente",
    date: "Pendente",
    preventedDiseases: "Hepatite A.",
    observation: "Dose única aos 15 meses.",
  },
];

const statusOptions: FilterOption[] = [
  { id: "todas", label: "Todas" },
  { id: "pendentes", label: "Pendentes" },
  { id: "aplicadas", label: "Aplicadas" },
];

const ageOptions: FilterOption[] = [
  { id: "todas-idades", label: "Todas as idades" },
  { id: "0-6", label: "0 - 6 meses" },
  { id: "7-12", label: "7 - 12 meses" },
  { id: "1-2", label: "1 - 2 anos" },
];

export function Vaccines() {
  const [selectedStatus, setSelectedStatus] = useState("Todas");
  const [selectedAge, setSelectedAge] = useState("0 - 6 meses");

  const uniqueAgeGroups = Array.from(
    new Set(vaccinesData.map((v) => v.ageGroup)),
  );

  const statusFilteredVaccines = vaccinesData.filter((item) => {
    let matchesStatus = false;
    if (selectedStatus === "Todas" || selectedStatus === "todas") {
      matchesStatus = true;
    } else if (
      (selectedStatus === "Pendentes" || selectedStatus === "pendentes") &&
      item.status === "Pendente"
    ) {
      matchesStatus = true;
    } else if (
      (selectedStatus === "Aplicadas" || selectedStatus === "aplicadas") &&
      item.status === "Aplicada"
    ) {
      matchesStatus = true;
    }
    return matchesStatus;
  });

  const mobileFilteredVaccines = statusFilteredVaccines.filter((item) => {
    if (selectedAge === "Todas as idades" || selectedAge === "todas-idades") {
      return true;
    }
    return item.ageGroup === selectedAge;
  });

  const renderVaccineList = (vaccines: Vaccine[]) => {
    if (vaccines.length === 0) {
      return (
        <div className="w-full h-full flex items-center justify-center text-primary-darker/60 font-bold mt-10 text-center">
          Nenhuma vacina encontrada para este filtro.
        </div>
      );
    }

    return vaccines.map((vaccine) => (
      <div
        className="w-full bg-white rounded-2xl flex flex-col gap-1 my-1 pb-4 shrink-0"
        key={vaccine.id}
      >
        <div className="w-full bg-primary flex justify-between p-2 rounded-t-xl">
          <span className="font-bold text-sm text-white">Vacina</span>
          <div className="flex gap-4 w-[40%] justify-around">
            <span className="text-sm md:text-lg">Status</span>
            <span className="text-sm md:text-lg">Data</span>
          </div>
        </div>
        {/* nome e status */}
        <div className="w-full flex justify-between p-2">
          <span className="font-bold text-sm w-[50%]">{vaccine.name}</span>
          <div className="flex gap-4 w-[40%] text-center font-bold font-poppins justify-around">
            <span
              className={`text-[10px] md:text-[16px] ${
                vaccine.status === "Pendente"
                  ? "text-red-alert"
                  : "text-green-alert"
              }`}
            >
              {vaccine.status}
            </span>
            <span
              className={`text-[10px] md:text-[16px] ${
                vaccine.status === "Pendente"
                  ? "text-red-alert"
                  : "text-green-alert"
              }`}
            >
              {vaccine.date}
            </span>
          </div>
        </div>
        {/* descrição e obs */}
        <div className="w-full px-2 text-primary font-poppins">
          <p className="text-[10px] md:text-[14px] lg:text-[12px]">
            <span className="text-primary-darker font-bold">
              Doenças evitadas:{" "}
            </span>
            {vaccine.preventedDiseases}
          </p>
          <p className="text-[10px] md:text-[14px] lg:text-[12px]">
            <span className="text-primary-darker font-bold">Obs: </span>
            {vaccine.observation}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full flex flex-col gap-6 pr-4">
      <div className="flex justify-between items-center">
        <DropdownFilter
          options={statusOptions}
          selectedFilter={selectedStatus}
          onSelect={setSelectedStatus}
        />

        <div className="block lg:hidden">
          <DropdownFilter
            options={ageOptions}
            selectedFilter={selectedAge}
            onSelect={setSelectedAge}
          />
        </div>
      </div>

      <div className="flex lg:hidden relative bg-primary rounded-2xl p-4 flex-col gap-4 min-h-140 shadow-black mt-2 md:min-h-180">
        <div className="absolute top-0 -left-3 z-8 drop-shadow-[5px_4px_4px_rgba(0,0,0,0.50)]">
          <div
            className="bg-lilas-light text-primary min-w-55 py-2.5 font-bold text-lg 
                  rounded-l-xl rounded-br-0
                  [clip-path:polygon(0_0,50%_0,100%_100%,100%_100%,0_100%)]"
          >
            <span className="w-full flex pl-4">{selectedAge}</span>
          </div>
        </div>

        <div className="w-full min-h-110 max-h-125 bg-lilas-medium absolute top-8 z-7 rounded-2xl drop-shadow-[0px_4px_4px_rgba(0,0,0,0.50)] overflow-y-auto p-4 flex flex-col md:min-h-168">
          {renderVaccineList(mobileFilteredVaccines)}
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-2 gap-x-10 gap-y-6 mt-2">
        {uniqueAgeGroups.map((groupName) => {
          const groupVaccines = statusFilteredVaccines.filter(
            (v) => v.ageGroup === groupName,
          );

          return (
            <div
              key={groupName}
              className="relative bg-primary rounded-2xl p-4 flex flex-col gap-4 min-h-115 shadow-black"
            >
              <div className="absolute top-0 -left-3 z-8 drop-shadow-[5px_4px_4px_rgba(0,0,0,0.50)]">
                <div
                  className="bg-lilas-light text-primary min-w-55 py-2.5 font-bold text-lg 
                        rounded-l-xl rounded-br-0
                        [clip-path:polygon(0_0,50%_0,100%_100%,100%_100%,0_100%)]"
                >
                  <span className="w-full flex pl-4">{groupName}</span>
                </div>
              </div>

              <div className="w-full min-h-80 max-h-100 bg-lilas-medium absolute top-8 z-6  rounded-2xl drop-shadow-[0px_4px_4px_rgba(0,0,0,0.50)] overflow-y-auto p-4 flex flex-col">
                {renderVaccineList(groupVaccines)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

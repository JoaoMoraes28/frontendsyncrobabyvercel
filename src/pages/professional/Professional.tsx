import { useState, useEffect } from "react";
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
import { EmptyState } from "../../components/EmptyState";
import { LoadingBaby } from "../../components/LoadingBaby";

import { useGetProfessionalBySpecialty } from "../../services/hooks/professional/getProfessionalBySpecialty";
import { useGetProfessionalsByChild } from "../../services/hooks/professional/getProfessionalByChild";
import { useGetSpecialties } from "../../services/hooks/specialty/getSpecialty";

export function Professional() {
  const navigate = useNavigate();

  const childId = Number(localStorage.getItem("select_child"));

  const [userInput, setUserInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<number>(0);

  const { data: specialtiesResponse } = useGetSpecialties();

  const isFetchingAll = selectedSpecialtyId === 0;

  const {
    data: dataAll,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetProfessionalsByChild(childId, isFetchingAll);

  const {
    data: dataSpecialty,
    isLoading: isLoadingSpecialty,
    isError: isErrorSpecialty,
  } = useGetProfessionalBySpecialty(
    selectedSpecialtyId,
    childId,
    !isFetchingAll,
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(userInput);
    }, 600);

    return () => clearTimeout(handler);
  }, [userInput]);

  const isSearching = userInput !== debouncedInput;

  const data = isFetchingAll ? dataAll : dataSpecialty;
  const isLoading = isFetchingAll ? isLoadingAll : isLoadingSpecialty;
  const isError = isFetchingAll ? isErrorAll : isErrorSpecialty;

  const specialtiesList = specialtiesResponse?.specialty || [];
  const professionalsList = data?.professional || [];

  const filterOptions: FilterOption[] = [
    { id: "0", label: "Todas" },
    ...specialtiesList.map((spec) => ({
      id: String(spec.id_specialization),
      label: spec.specialization_name,
    })),
  ];

  const handleFilterSelect = (incomingValue: string) => {
    setSelectedFilter(incomingValue);

    if (incomingValue === "Todas" || incomingValue === "0") {
      setSelectedSpecialtyId(0);
      return;
    }

    const foundSpecialty = specialtiesList.find(
      (spec) =>
        spec.specialization_name === incomingValue ||
        String(spec.id_specialization) === incomingValue,
    );

    if (foundSpecialty) {
      setSelectedSpecialtyId(foundSpecialty.id_specialization);
    }
  };

  const filteredItems = professionalsList.filter((item) =>
    item.professional_name
      .trim()
      .toLowerCase()
      .includes(debouncedInput.toLowerCase()),
  );

  const emptyStateTitle =
    selectedSpecialtyId === 0
      ? "Ops! Nenhum especialista encontrado."
      : `Ops! Nenhum profissional de ${selectedFilter.toLowerCase()} encontrado.`;

  const emptyStateDescription =
    selectedSpecialtyId === 0
      ? "Sua rede de apoio ainda não tem profissionais cadastrados. Que tal adicionar o primeiro?"
      : "Parece que essa especialidade foi parar na caixa de brinquedos. Que tal adicionar um novo profissional?";

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
            onSelect={handleFilterSelect}
          />
          <BtnPrimary
            text="Adicionar profissional"
            className="bg-accent flex justify-center items-center text-white font-poppins font-bold text-[12px] max-w-[50%] h-10 text-center shadow-md cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            onClick={() => navigate("/add-pediatrician")}
          />
        </div>

        <DesktopFilterTabs
          options={filterOptions}
          selectedFilter={selectedFilter}
          onSelect={handleFilterSelect}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 overflow-y-auto max-h-145 md:max-h-[65vh] pr-2">
        {(isLoading || isSearching) && <LoadingBaby text="Buscando profissionais" />}

        {!isLoading && !isSearching && isError && (
          <p className="text-red-500 font-poppins col-span-full text-center mt-4">
            Erro ao buscar a rede de apoio. Tente novamente mais tarde.
          </p>
        )}

        {!isLoading &&
          !isSearching &&
          !isError &&
          filteredItems.length === 0 && (
            <EmptyState
              isFullPage={false}
              show404Background={false}
              title={emptyStateTitle}
              description={emptyStateDescription}
              buttonText="Adicionar profissional"
              onButtonClick={() => navigate("/add-pediatrician")}
            />
          )}

        {!isLoading &&
          !isSearching &&
          !isError &&
          filteredItems.map((professional) => {
            const specialtyName =
              specialtiesList.find(
                (s) =>
                  s.id_specialization === professional.fk_id_specialization,
              )?.specialization_name || "Outro";

            return (
              <ProfessionalCard
                key={professional.id_professional}
                professional={{ ...professional, specialty: specialtyName }}
                onEdit={() =>
                  navigate("/edit-pediatrician", { state: { professional } })
                }
              />
            );
          })}
      </div>
    </div>
  );
}

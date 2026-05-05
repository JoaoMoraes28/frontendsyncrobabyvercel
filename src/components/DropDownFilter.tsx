import { useState } from "react";
import BtnPrimary from "./BtnPrimary";
import checkIcon from "../assets/checkIcon.svg";

export interface FilterOption {
  id: string;
  label: string;
}

interface DropdownFilterProps {
  options: FilterOption[];
  selectedFilter: string;
  onSelect: (filter: string) => void;
}

export function DropdownFilter({
  options,
  selectedFilter,
  onSelect,
}: DropdownFilterProps) {
  const [activeFilter, setActiveFilter] = useState(false);

  return (
    <div className="relative">
      <BtnPrimary
        text={selectedFilter}
        className="shadow-purple-md bg-white px-6 text-primary-text font-poppins font-semibold cursor-pointer"
        onClick={() => setActiveFilter(!activeFilter)}
      />

      {activeFilter && (
        <fieldset className="absolute bg-lilas/90 border border-primary-text -mt-3 rounded-2xl flex flex-col p-4 gap-2 z-10 min-w-max left-8">
          <legend className="text-primary-text font-poppins text-sm sr-only">
            Filtros
          </legend>

          {options.map((option) => (
            <div
              className="flex gap-4 cursor-pointer justify-between items-center"
              key={option.id}
              onClick={() => {
                onSelect(option.label);
                setActiveFilter(false);
              }}
            >
              <input
                type="radio"
                id={option.id}
                name="category-filter"
                value={option.label}
                checked={option.label === selectedFilter}
                onChange={() => {}}
                className="sr-only"
              />

              <label
                htmlFor={option.id}
                className="cursor-pointer pointer-events-none"
              >
                {option.label}
              </label>

              {option.label === selectedFilter && (
                <img
                  src={checkIcon}
                  alt="Ícone de verificação"
                  className="w-3"
                />
              )}
            </div>
          ))}
        </fieldset>
      )}
    </div>
  );
}

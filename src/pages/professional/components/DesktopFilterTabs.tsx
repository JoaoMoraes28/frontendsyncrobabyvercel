import { type FilterOption } from "../../../components/DropDownFilter";

export interface DesktopFilterTabsProps {
  options: FilterOption[];
  selectedFilter: string;
  onSelect: (filter: string) => void;
}

export function DesktopFilterTabs({
  options,
  selectedFilter,
  onSelect,
}: DesktopFilterTabsProps) {
  return (
    <div className="hidden lg:flex gap-3 overflow-x-auto w-full pb-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.label)}
          className={`px-6 py-2 rounded-3xl font-poppins font-semibold text-sm transition-all border cursor-pointer whitespace-nowrap
            ${
              selectedFilter === option.label
                ? "bg-accent text-white border-accent shadow-purple-md"
                : "bg-white text-gray-500 border-transparent hover:border-accent"
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

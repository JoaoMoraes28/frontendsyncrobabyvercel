import { InputDefault } from "../../../components/InputDefault";
import Search from "../../../assets/search.svg";

export interface MobileSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MobileSearchBar({
  value,
  onChange,
  placeholder = "Buscar...",
}: MobileSearchBarProps) {
  return (
    <div className="flex w-full h-9 rounded-2xl bg-lilas shadow-purple-sm px-2 md:h-11 xl:hidden">
      <img src={Search} alt="Ícone de busca" className="w-4" />
      <InputDefault
        className="w-full pl-2 bg-transparent outline-none border-none font-poppins text-text-primary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

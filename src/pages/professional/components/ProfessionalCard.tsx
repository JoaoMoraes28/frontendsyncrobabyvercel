import editIcon from "../../../assets/editIcon.svg";

export interface IProfessional {
  id_professional: number;
  professional_name: string;
  address: string;
  phone: string;
  specialty: string;
}

export interface ProfessionalCardProps {
  professional: IProfessional;
  onEdit: () => void;
}

export function ProfessionalCard({
  professional,
  onEdit,
}: ProfessionalCardProps) {
  return (
    <div className="w-full bg-white shadow-purple-sm border-2 border-transparent hover:border-accent rounded-sm flex flex-col p-5 cursor-pointer transition-all">
      <div className="w-full flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0"></div>
          <p className="font-semibold font-poppins text-primary text-[16px] leading-tight">
            {professional.professional_name}
          </p>
        </div>
        <img
          src={editIcon}
          alt="Editar informações do profissional"
          className="w-4 cursor-pointer hover:opacity-80 active:scale-95 transition-all mt-1"
          onClick={onEdit}
        />
      </div>

      <div className="flex flex-col gap-3 grow">
        <div className="self-start px-3 py-1 bg-lilas text-[#8B5CF6] rounded-full text-xs font-bold font-poppins">
          {professional.specialty}
        </div>
        <span className="font-nunito text-gray-500 text-sm grow">
          {professional.address}
        </span>
        <span className="font-nunito text-gray-600 text-sm font-semibold">
          {professional.phone}
        </span>
      </div>
    </div>
  );
}

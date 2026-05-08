import { useNavigate } from "react-router-dom";
import type { HealthRecord } from "../Health";

interface IllnessCardProps {
  item: HealthRecord;
  expandedCardId: number | null;
  toggleCard: (id: number) => void;
}

export function IllnessCard({
  item,
  expandedCardId,
  toggleCard,
}: IllnessCardProps) {
  const borderColorDesktop =
    item.tipo === "Crônica" ? "border-[#8A56E2]" : "border-[#4A90E2]";
  const badgeColorDesktop =
    item.tipo === "Crônica" ? "bg-[#8A56E2]" : "bg-[#64C3D1]";

  const navigate = useNavigate();

  return (
    <>
      <div
        className="block md:hidden bg-lilas cursor-pointer rounded-lg overflow-hidden p-4 border-2 border-primary-darker shadow-purple-md text-center text-dark-purple"
        onClick={() => toggleCard(item.id)}
      >
        <h2 className="font-bold font-poppins text-lg">{item.nome}</h2>
        <span className="font-poppins text-md">
          Registrado em: {item.dataRegistro}
        </span>

        <div
          className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
            expandedCardId === item.id
              ? "grid-rows-[1fr] opacity-100 mt-4"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 flex flex-col gap-2 ">
            <span className="flex gap-1 text-primary-darker">
              <p className="font-semibold text-dark-purple">Tipo:</p>
              {item.tipo}
            </span>
            <span className="flex gap-1 text-primary-darker">
              <p className="font-semibold text-dark-purple">Data de início:</p>{" "}
              {item.dataInicio}
            </span>
            {item.dataTermino && (
              <span className="flex gap-1 text-primary-darker">
                <p className="font-semibold text-dark-purple">
                  Data de término:
                </p>{" "}
                {item.dataTermino}
              </span>
            )}
            <span className="flex gap-1 text-primary-darker">
              <p className="font-semibold text-dark-purple">Medicação:</p>
              {item.medicacao}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`hidden md:flex flex-col bg-white rounded-xl shadow-md border-l-[6px] ${borderColorDesktop} p-5 pb-4 h-full relative group`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log(`Excluir enfermidade ${item.id}`);
          }}
          className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300"
          title="Excluir enfermidade"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>

        <h2 className="font-bold text-gray-800 text-lg mb-4 w-[90%]">
          {item.nome}
        </h2>

        <div className="flex flex-col gap-4 grow">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8A56E2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <div>
              <p className="text-xs text-gray-500 font-semibold mb-0.5">
                Período
              </p>
              <p className="text-sm font-bold text-gray-700">
                Desde {item.dataInicio.substring(3)}
                {item.dataTermino && ` até ${item.dataTermino}`}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8A56E2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0 transform -rotate-45"
            >
              <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
              <path d="m8.5 8.5 7 7" />
            </svg>
            <div>
              <p className="text-xs text-gray-500 font-semibold mb-0.5">
                Medicação Contínua
              </p>
              <p className="text-sm font-bold text-gray-700">
                {item.medicacao}
              </p>
            </div>
          </div>

          {/* Observações */}
          <div className="flex items-start gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8A56E2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <div>
              <p className="text-xs text-gray-500 font-semibold mb-0.5">
                Observações
              </p>
              <p className="text-sm text-gray-500 leading-tight">
                {item.descricao}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-auto">
          <span
            className={`${badgeColorDesktop} text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full`}
          >
            {item.tipo}
          </span>

          <button
            className="text-accent hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            onClick={() => navigate(`/edit-illness/${item.id}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

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
  return (
    <div
      className="bg-lilas cursor-pointer rounded-lg overflow-hidden p-4 border-2 border-primary-darker shadow-purple-md text-center text-dark-purple"
      onClick={() => toggleCard(item.id)}
      key={item.id}
    >
      <h2 className="font-bold font-poppins text-lg">{item.nome}</h2>
      <span className=" font-poppins text-md">
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
          <span className="flex gap-1 text-primary-darker">
            <p className="font-semibold text-dark-purple">Data de término:</p>{" "}
            {item.dataTermino}
          </span>
          <span className="flex gap-1 text-primary-darker">
            <p className="font-semibold text-dark-purple">Medicação:</p>
            {item.medicacao}
          </span>
        </div>
      </div>
    </div>
  );
}

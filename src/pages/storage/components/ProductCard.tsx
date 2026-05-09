import addItemIcon from "../../../assets/addItemIcon.svg";
import removeItemIcon from "../../../assets/removeItemIcon.svg";

interface ProductCardProps {
  item: {
    id: number;
    category: string;
    name: string;
    quantity: number;
    unitType: string;
    daysRemaining: number;
    description: string | null;
    themeColor: string;
  };
  getStatusColor: (quantity: number, daysRemaining: number) => string;
  getStatusLabel: (quantity: number, daysRemaining: number) => string;
  toggleCard: (id: number) => void;
  expandedCardId: number | null;
  updateItemQuantity: (id: number, delta: number) => void;
  handleDeleteItem: (id: number) => void;
  icon: React.ElementType;
}

export function ProductCard({
  item,
  getStatusColor,
  getStatusLabel,
  toggleCard,
  expandedCardId,
  updateItemQuantity,
  handleDeleteItem,
  icon: IconComponent,
}: ProductCardProps) {
  return (
    <div
      key={item.id}
      className="flex-none lg:flex-none w-full lg:h-fit overflow-hidden lg:overflow-visible rounded-sm shadow-purple-sm bg-white border-t-0 lg:border-t-[6px] lg:flex lg:flex-col"
      style={{
        borderTopColor: getStatusColor(item.quantity, item.daysRemaining),
      }}
    >
      <div className="flex w-full lg:hidden overflow-x-auto bg-accent overflow-y-hidden touch-pan-y snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div
          className="sticky left-0 z-10 flex-none flex flex-col w-[calc(100%-7rem)] min-w-[calc(100%-7rem)] bg-white pb-4 snap-start cursor-pointer transition-all border-black/30 border-r"
          style={{
            borderLeft: `36px solid ${getStatusColor(item.quantity, item.daysRemaining)}`,
          }}
          onClick={() => toggleCard(item.id)}
        >
          <div className="flex flex-col justify-center py-4 pl-6 min-h-22">
            <span className="text-xl font-bold font-poppins text-primary-text w-full">
              {item.name}
            </span>
            <span className="text-primary-dark text-md">
              Disponível: {item.quantity} {item.unitType}
            </span>
            <span className="text-primary text-[10px] mt-2">
              {item.daysRemaining} dia(s) de uso restante
            </span>
          </div>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              expandedCardId === item.id
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="w-full px-6 pt-2 text-sm text-primary-dark font-poppins">
                {item.description ? (
                  <>
                    <span className="font-bold">Descrição: </span>
                    <span className="italic">{item.description}</span>
                  </>
                ) : (
                  <span className="italic text-gray-400 opacity-90">
                    Nenhuma anotação extra por aqui
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-none flex items-center justify-center gap-2 w-28 min-w-28 bg-white">
          <img
            src={addItemIcon}
            className="w-6 cursor-pointer hover:opacity-80 active:scale-95 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              updateItemQuantity(item.id, 1);
            }}
          />
          <img
            src={removeItemIcon}
            className="w-6 cursor-pointer hover:opacity-80 active:scale-95 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              updateItemQuantity(item.id, -1);
            }}
          />
        </div>

        <div
          className="flex-none flex items-center justify-center pl-4 w-28 min-w-28 snap-end cursor-pointer text-white font-poppins font-bold text-lg active:opacity-80 transition-opacity"
          style={{ backgroundColor: "var(--color-red-alert)" }}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteItem(item.id);
          }}
        >
          Excluir
        </div>
      </div>

      <div
        className="hidden lg:flex flex-col p-5 gap-3 cursor-pointer rounded-2xl group"
        onClick={() => toggleCard(item.id)}
      >
        <div className="flex items-start justify-between">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${getStatusColor(item.quantity, item.daysRemaining)}, transparent 75%)`,
              color: getStatusColor(item.quantity, item.daysRemaining),
            }}
          >
            <IconComponent />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteItem(item.id);
              }}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all active:scale-95 hover:bg-red-100"
              title="Excluir produto"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>

            <span
              className="text-[11px] font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${getStatusColor(item.quantity, item.daysRemaining)}22`,
                color: getStatusColor(item.quantity, item.daysRemaining),
              }}
            >
              {getStatusLabel(item.quantity, item.daysRemaining)}
            </span>
          </div>
        </div>

        <span className="font-bold text-[15px] text-primary-text leading-tight font-poppins">
          {item.name}
        </span>

        <div
          className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => updateItemQuantity(item.id, -1)}
            className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-accent font-bold text-xl cursor-pointer hover:bg-purple-50 active:scale-95 transition-all"
          >
            −
          </button>
          <div className="text-center">
            <div className="font-bold text-lg text-primary-text leading-none">
              {item.quantity}
            </div>
            <div className="text-[10px] uppercase text-gray-400 tracking-wide font-semibold mt-0.5">
              Unidades
            </div>
          </div>
          <button
            onClick={() => updateItemQuantity(item.id, 1)}
            className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-accent font-bold text-xl cursor-pointer hover:bg-purple-50 active:scale-95 transition-all"
          >
            +
          </button>
        </div>

        <div
          className="flex items-center gap-2 text-xs font-semibold font-poppins"
          style={{
            color: getStatusColor(item.quantity, item.daysRemaining),
          }}
        >
          <span>🕐</span>
          <span>Duração estimada {item.daysRemaining} dia(s)</span>
        </div>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            expandedCardId === item.id
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="text-xs text-gray-500 font-poppins border-t border-gray-100 pt-3 italic leading-relaxed mt-3">
              {item.description ? (
                <>
                  <span className="font-bold">Descrição: </span>
                  <span>{item.description}</span>
                </>
              ) : (
                <span className="text-gray-400">
                  Nenhuma anotação extra por aqui
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

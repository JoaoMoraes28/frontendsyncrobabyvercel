import { useEffect, useState } from "react";
import type { RoutineData } from '../Routines'

import Trash from "../../../assets/routines/trashPurple.svg"

interface Props {
  routineData: RoutineData
  visibilityTrash: boolean
  onClick: (id: number) => void
  onDelete: (id: number) => void
}

function HourCard({ routineData, visibilityTrash, onClick, onDelete }: Props) {
  const [hoverVisibilityTrash, setHoverVisibilityTrash] = useState<number>(0)
  const [windowWidth, setWindowWidth] = useState<boolean>(
    window.matchMedia("(min-width: 1280px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1279px)");

    const handleResize = (e: MediaQueryListEvent) => {
      console.log(windowWidth)
      setWindowWidth(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <li
      onClick={() => onClick(routineData.id)}
      onMouseEnter={() => setHoverVisibilityTrash(routineData.id)}
      onMouseLeave={() => setHoverVisibilityTrash(0)}
      className={`flex w-full px-4 overflow-hidden font-semibold transition-[max-height] duration-500 ease-in-out bg-lilas ${routineData.asClicked ? "max-h-50" : "max-h-16"}
        xl:bg-white xl:w-3/4 xl:mr-[5%] xl:shadow-purple-sm xl:pl-1`}
    >
      <div
        className="flex justify-between items-center w-25 h-16
            md:w-37 md:pl-7
            xl:w-auto xl:pl-0"
      >
        <span
          className="text-[1.5rem] text-primary w-17 pl-2
                xl:text-black"
        >
          {routineData.hours}
        </span>
        <div
          className="w-5 h-5 rounded-full bg-primary
                xl:absolute xl:left-[9%] xl:flex xl:justify-center xl:items-center xl:w-11 xl:h-11 xl:bg-white xl:border xl:border-accent"
        >
          <img aria-hidden="true" src={routineData.imageDesk} alt="" className="hidden xl:flex xl:w-2/3 xl:h-2/3" />
        </div>
      </div>
      <div
        className="flex flex-col items-end w-[calc(100%-100px)] pb-4
            md:w-[calc(100%-148px)]
            xl:relative xl:w-full"
      >
        <h3
          className="flex items-center w-full min-h-16 pl-6 text-[1.2rem] text-text-primary
                xl:text-dark-purple"
        >
          {routineData.title}
        </h3>
        <p
          className={`pl-6 text-[0.9rem] w-full text-primary pr-4
                xl:text-black xl:pr-0 ${routineData.description != null ? "" : "italic"}`}
        >
          {routineData.description != null
            ? `${routineData.description}`
            : "Nenhuma descrição adicionada"}
        </p>
        <button onClick={(e) => {
          e.stopPropagation()
          onDelete(routineData.id)
        }} className={`sm:block md:block lg:block xl:absolute ${visibilityTrash && hoverVisibilityTrash == routineData.id ? 'xl:block' : 'xl:hidden'}`}>
          <img src={Trash} alt="Exclui o registro atual." className="w-5 h-5 mt-2" />
        </button>
      </div>
    </li>
  );
}

export default HourCard;

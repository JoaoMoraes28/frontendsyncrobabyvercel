import { Outlet } from "react-router-dom";

import Header from "./Header";
import NavigationBar from "./NavigationBar";

import HomeIcon from "../assets/navigation/home.svg";
import HomeIconDesk from "../assets/navigation/homeDesk.svg";
import ArticlesIcon from "../assets/navigation/articles.svg";
import ArticlesIconDesk from "../assets/navigation/articlesDesk.svg";
import RoutineIcon from "../assets/navigation/routine.svg";
import RoutineIconDesk from "../assets/navigation/routineDesk.svg";
import StorageIcon from "../assets/navigation/storage.svg";
import StorageIconDesk from "../assets/navigation/storageDesk.svg";
import Pediatrician from "../assets/pediatricianIcon.svg";
import vaccineIcon from "../assets/navigation/vacinasIcon.svg";
import healthIcon from "../assets/navigation/saudeIcon.svg";
import statisticsIcon from "../assets/navigation/estatisticasIcon.svg";
import diaryIcon from "../assets/navigation/diario.svg";
import HomeSelected from "../assets/navigation/homeSelected.svg";
import RoutineSelected from "../assets/navigation/routinesSelected.svg";
import StorageSelected from "../assets/navigation/storageSelected.svg";
import ArticlesSelected from "../assets/navigation/articlesSelected.svg";

export interface IconsNavigation {
  id: number;
  icon: string;
  iconDesk?: string;
  iconSelected?: string;
  title: string;
  path: string;
}

export const listIcons: IconsNavigation[] = [
  {
    id: 1,
    icon: HomeIcon,
    iconDesk: HomeIconDesk,
    iconSelected: HomeSelected,
    title: "Home",
    path: "/home",
  },
  {
    id: 2,
    icon: RoutineIcon,
    iconDesk: RoutineIconDesk,
    iconSelected: RoutineSelected,
    title: "Rotinas",
    path: "/routines",
  },
  {
    id: 3,
    icon: StorageIcon,
    iconDesk: StorageIconDesk,
    iconSelected: StorageSelected,
    title: "Estoque",
    path: "/storage",
  },
  {
    id: 4,
    icon: ArticlesIcon,
    iconDesk: ArticlesIconDesk,
    iconSelected: ArticlesSelected,
    title: "Artigos",
    path: "/articles",
  },
  {
    id: 5,
    icon: vaccineIcon,
    title: "Vacinas",
    path: "/vaccines",
  },
  {
    id: 6,
    icon: healthIcon,
    title: "Saúde",
    path: "/health",
  },
  {
    id: 7,
    icon: statisticsIcon,
    title: "Medidas",
    path: "/measures",
  },
  {
    id: 8,
    icon: Pediatrician,
    title: "Profissionais",
    path: "/pediatrician",
  },
  {
    id: 9,
    icon: diaryIcon,
    title: "Diário",
    path: "/diary",
  },
];

export function MainLayout() {
  return (
    <div className="flex h-screen w-screen bg-light">
      <Header />
      <NavigationBar listIcons={listIcons} />
      <main className="min-w-screen h-full overflow-y-auto xl:flex xl:justify-end">
        <div
          className="content flex w-full min-h-full px-6 pt-25 pb-24
        md:px-14 md:pb-30
        xl:px-20 xl:w-[calc(100%-15%)] xl:max-w-[calc(100%-200px)] xl:pb-8"
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}

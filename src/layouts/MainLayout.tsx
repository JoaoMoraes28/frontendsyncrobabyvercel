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
import healthSelectedDesk from "../assets/navigation/heatSelectedDesk.svg";
import statisticsIcon from "../assets/navigation/estatisticasIcon.svg";
import diaryIcon from "../assets/navigation/diario.svg";
import HomeSelected from "../assets/navigation/homeSelected.svg";
import RoutineSelected from "../assets/navigation/routinesSelected.svg";
import StorageSelected from "../assets/navigation/storageSelected.svg";
import ArticlesSelected from "../assets/navigation/articlesSelected.svg";
import RoutineSelectedDesk from "../assets/navigation/routineDeskSelected.svg";
import StorageSelectedDesk from "../assets/navigation/storageDeskSelected.svg";
import ArticlesSelectedDesk from "../assets/navigation/articlesDeskSelected.svg";
import VaccineSelectedDesk from "../assets/navigation/vacinasIconSelected.svg";
import MeasuresSelectedDesk from "../assets/navigation/estatisticasIconSelected.svg";
import ProfessionalSelectedDesk from "../assets/navigation/pediatricianIconSelected.svg";
import HomeSelectedDesk from "../assets/navigation/homeDeskSelected.svg";
import DiarySelectedDesk from "../assets/navigation/diarioSelected.svg";
import { useState, useEffect } from "react";

import { useGetNotificationChild } from "../services/hooks/notification/useGetNotificationChild";
import type { Notification } from "../services/notification/notification.service";

export interface IconsNavigation {
  id: number;
  icon: string;
  iconDesk?: string;
  iconSelected?: string;
  iconDeskSelected?: string;
  title: string;
  path: string;
}

export const listIcons: IconsNavigation[] = [
  {
    id: 1,
    icon: HomeIcon,
    iconDesk: HomeIconDesk,
    iconSelected: HomeSelected,
    iconDeskSelected: HomeSelectedDesk,
    title: "Home",
    path: "/home",
  },
  {
    id: 2,
    icon: RoutineIcon,
    iconDesk: RoutineIconDesk,
    iconSelected: RoutineSelected,
    iconDeskSelected: RoutineSelectedDesk,
    title: "Rotinas",
    path: "/routines",
  },
  {
    id: 3,
    icon: StorageIcon,
    iconDesk: StorageIconDesk,
    iconSelected: StorageSelected,
    iconDeskSelected: StorageSelectedDesk,
    title: "Estoque",
    path: "/storage",
  },
  {
    id: 4,
    icon: ArticlesIcon,
    iconDesk: ArticlesIconDesk,
    iconSelected: ArticlesSelected,
    iconDeskSelected: ArticlesSelectedDesk,
    title: "Artigos",
    path: "/articles",
  },
  {
    id: 5,
    icon: vaccineIcon,
    iconSelected: VaccineSelectedDesk,
    title: "Vacinas",
    path: "/vaccines",
  },
  {
    id: 6,
    icon: healthIcon,
    iconSelected: healthSelectedDesk,
    title: "Saúde",
    path: "/health",
  },
  {
    id: 7,
    icon: statisticsIcon,
    iconSelected: MeasuresSelectedDesk,
    title: "Medidas",
    path: "/measures",
  },
  {
    id: 8,
    icon: Pediatrician,
    iconSelected: ProfessionalSelectedDesk,
    title: "Profissionais",
    path: "/pediatrician",
  },
  {
    id: 9,
    icon: diaryIcon,
    iconSelected: DiarySelectedDesk,
    title: "Diário",
    path: "/diary",
  },
];

export function MainLayout() {
  const [childName, setChildName] = useState<string>(localStorage.getItem("select_child_name")!)

  const [idChild] = useState<number>(Number(localStorage.getItem("select_child")))

  const { data: onGetNotificationChild, refetch } = useGetNotificationChild(idChild)

  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (!onGetNotificationChild) {
      return
    }

    if (onGetNotificationChild) {
      setNotifications(onGetNotificationChild.notification)
    }
  }, [onGetNotificationChild])

  useEffect(() => {
    setInterval(() => {
      refetch()
    }, 3000);
  })

  return (
    <div className="flex h-screen w-screen bg-light">
      <Header notification={notifications} />
      <NavigationBar listIcons={listIcons} child_name={childName} />
      <main className="min-w-screen h-full overflow-y-auto xl:flex xl:justify-end">
        <div
          className="content flex w-full min-h-full h-full px-6 pt-25 pb-24
        md:px-14 md:pb-30
        xl:px-20 xl:w-[calc(100%-200px)] xl:pb-8"
        >
          <Outlet context={setChildName} />
        </div>
      </main>
    </div>
  );
}

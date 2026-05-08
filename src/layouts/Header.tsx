import { InputDefault } from "../components/InputDefault";
import { useEffect, useState } from "react";

import NotificationsPage from "../pages/notifications/Notifications";
import Date from "../utils/Date";

import Search from "../assets/search.svg";
import micIcon from "../assets/micIcon.svg";
import Notifications from "../assets/notifications.svg";
import SetBack from "../assets/navigation/setBack.svg";
import Profile from "../assets/navigation/profileHeader.svg";
import SetBackProfile from "../assets/profileChildren/setBackProfile.svg";

import { useLocation, useNavigate, Link } from "react-router-dom";

export interface Notification {
  id: number;
  title: string;
  type: string;
  description: string;
}

function Header() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Lembrete de Vacina: amanhã!",
      type: "vacine",
      description:
        "Olá! A sua vacina Febre Amarela está agendada para dia 28/02/2026",
    },
    {
      id: 2,
      title: "Fraldas acabando!",
      type: "storage",
      description: "Olá! Seu item: Fraldas acabará em breve!",
    },
    {
      id: 3,
      title: "Aniversário a vista!",
      type: "birthday",
      description: "Parabéns! Pedro completará 2 aninhos em 3 dias!",
    },
    {
      id: 4,
      title: "Aniversário a vista!",
      type: "birthday",
      description: "Parabéns! Pedro completará 2 aninhos em 3 dias!",
    },
    {
      id: 5,
      title: "Aniversário a vista!",
      type: "birthday",
      description: "Parabéns! Pedro completará 2 aninhos em 3 dias!",
    },
    {
      id: 6,
      title: "Aniversário a vista!",
      type: "birthday",
      description: "Parabéns! Pedro completará 2 aninhos em 3 dias!",
    },
    {
      id: 7,
      title: "Aniversário a vista!",
      type: "birthday",
      description: "Parabéns! Pedro completará 2 aninhos em 3 dias!",
    },
    {
      id: 8,
      title: "Aniversário a vista!",
      type: "birthday",
      description: "Parabéns! Pedro completará 2 aninhos em 3 dias!",
    },
    {
      id: 9,
      title: "Aniversário a vista!",
      type: "birthday",
      description: "Parabéns! Pedro completará 2 aninhos em 3 dias!",
    },
    {
      id: 10,
      title: "Aniversário a vista!",
      type: "birthday",
      description: "Parabéns! Pedro completará 2 aninhos em 3 dias!",
    },
  ]);

  const [windowWidth, setWindowWidth] = useState<boolean>(
    window.matchMedia("(max-width: 1279px)").matches,
  );
  const [visibleNotifications, setVisibleNotifications] =
    useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  function moveNoticationsBar() {
    const isOpening = !visibleNotifications;

    setVisibleNotifications(isOpening);
  }

  function setTitleHeader(path: string) {
    if (path == "/home") {
      return "Home";
    } else if (path == "/routines") {
      return "Rotinas";
    } else if (path == "/feeding") {
      return "Alimentacão";
    } else if (path == "/storage") {
      return "Estoque";
    } else if (path == "/sleep") {
      return "Sono";
    } else if (path == "/health") {
      return "Enfermidades";
    } else if (path == "/pediatrician") {
      return "Profissionais";
    } else if (path == "/diaper") {
      return "Fraldas";
    } else if (path == "/vaccines") {
      return "Vacinas";
    } else if (path == "/shower") {
      return "Banho";
    } else if (path == "/medicine") {
      return "Medicação";
    } else if (path == "/profile-children") {
      return "";
    } else if (path == "/articles") {
      return "Dicas";
    } else if (path == "/add-child") {
      return "Adicionar Filho(a)";
    } else if (path.includes("/article/")) {
      return "Artigo";
    } else if (path == "/edit-pediatrician") {
      return "Editar Profissional";
    } else if (path == "/add-illness") {
      return "Adicionar Enfermidade";
    } else if (path == "/measures") {
      return "Medidas";
    } else if (path == "/profile-user") {
      return "Perfil";
    } else if (path == "/add-child") {
      return "Adicionar Filho(a)";
    } else if (path.includes("/edit-illness/")) {
      return "Editar enfermidade";
    }
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1279px)");

    const handleResize = (e: MediaQueryListEvent) => {
      setWindowWidth(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 flex flex-col justify-between items-center w-screen px-6 pt-6 z-90 bg-light ${setTitleHeader(location.pathname) != "Home" ? "h-24" : "h-32"}
      md:px-14
      xl:h-24 xl:flex-row xl:px-14 xl:pt-8 xl:items-start xl:right-0 xl:w-[calc(100%-20%)] xl:max-w-[calc(100%-360px)]`}
    >
      <div
        onClick={moveNoticationsBar}
        className={`xl:absolute xl:top-0 xl:z-80 xl:right-0 xl:w-screen xl:h-screen xl:bg-black/60 ${visibleNotifications ? "xl:block" : "hidden"}`}
      ></div>
      <button
        onClick={() => navigate(-1)}
        className={`xl:ml-40 ${(location.pathname == "/profile-children" && !windowWidth) || (location.pathname == "/profile-user" && !windowWidth) ? "flex" : "hidden"}`}
      >
        <img src={SetBackProfile} alt="" />
      </button>
      <div
        className={`flex w-full h-9 rounded-2xl bg-lilas shadow-purple-sm px-2 ${(setTitleHeader(location.pathname) != "Home" && windowWidth) || location.pathname == "/profile-children" || location.pathname == "/profile-user" ? "hidden" : "block"}
        md:h-11
        xl:w-2/3`}
      >
        <img aria-hidden="true" src={Search} alt="" className="w-4 h-auto" />
        <InputDefault className="w-full pl-2 font-poppins text-primary-text" />
        <img aria-hidden="true" src={micIcon} alt="" className="w-4 h-auto" />
      </div>
      <div
        className="flex w-full justify-between items-center mt-4
            xl:justify-end xl:gap-16 xl:h-11 xl:mt-0"
      >
        <span
          className="hidden
          xl:flex xl:font-nunito xl:text-black/50 xl:font-bold"
        >
          {Date.getDateFormated()}
        </span>
        <div
          className={`flex gap-3 ${setTitleHeader(location.pathname) != "Home" && windowWidth ? "block" : "hidden"}`}
        >
          <button onClick={() => navigate(-1)}>
            <img
              src={SetBack}
              alt="Icone para voltar a tela anterior."
              className="w-6 "
            />
          </button>
          <h2 className={`text-text-primary font-poppins font-bold text-2xl`}>
            {setTitleHeader(location.pathname)}
          </h2>
        </div>
        <span
          className={`font-inter font-bold text-md ${setTitleHeader(location.pathname) != "Home" ? "hidden" : "block"}
          md:text-lg 
          xl:hidden`}
        >
          Olá
          <br />
          <span className="text-primary font-bold">GABRYEL!</span>
        </span>
        <div className="flex gap-4">
          <div className="relative">
            <button
              onClick={() => {
                moveNoticationsBar();
              }}
              className="flex justify-center items-center"
            >
              <div
                className={`absolute justify-center items-center rounded-full bg-primary w-5.5 h-5.5 -right-2 -top-2 z-90 ${notifications.length != 0 ? "flex" : "hidden"}
                md:h-6 md:w-6`}
              >
                <span className="font-bold text-white text-[14px]">
                  {notifications.length}
                </span>
              </div>
              <img
                src={Notifications}
                alt="Icone de redirecionamento para notificações."
                className={`w-auto h-6 ${notifications.length != 0 ? "animate-bell" : ""}
                md:h-8`}
              />
            </button>
          </div>
          <Link
            to="/profile-user"
            className={`w-auto h-7 -mt-px
            md:h-8 md:mt-0
            xl:hidden ${location.pathname == "/profile-children" || location.pathname == "/profile-user" ? "hidden" : "block"}`}
          >
            <img
              src={Profile}
              alt="Icone de perfil de usuário que redireciona para página de usuário."
              className="w-full h-full"
            />
          </Link>
        </div>
      </div>
      <NotificationsPage
        visibleNotifications={visibleNotifications}
        moveNotificationsBar={moveNoticationsBar}
        notifications={notifications}
        setNot={setNotifications}
      />
    </header>
  );
}

export default Header;

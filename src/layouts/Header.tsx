import { InputDefault } from "../components/InputDefault";
import { useEffect, useState } from "react";

import NotificationsPage from "../pages/notifications/Notifications";
import Date from "../utils/Date.ts";

import Search from "../assets/search.svg";
import Notifications from "../assets/notifications.svg";
import SetBack from "../assets/navigation/setBack.svg";
import Profile from "../assets/navigation/profileHeader.svg";
import SetBackProfile from "../assets/profileChildren/setBackProfile.svg";
import Moon from "../assets/moon.svg"
import Sun from "../assets/sun.svg"

import { useLocation, useNavigate, Link } from "react-router-dom";
import type { Notification } from "../services/notification/notification.service.ts";
import { usePatchNotificationRead } from "../services/hooks/notification/usePatchNotificationRead";

interface Props {
  notification: Notification[]
}

function Header({ notification }: Props) {
  const { mutate: onReadNotification } = usePatchNotificationRead()

  const [DateHour, setDateHour] = useState<string>(Date.getDateFormated());
  const [layoutColor, setLayoutColor] = useState<boolean>(true)
  const [photoUser] = useState<string | null>(
    localStorage.getItem("user_photo") == "null" ||
      localStorage.getItem("user_photo") == null ||
      localStorage.getItem("user_photo") == "" ||
      localStorage.getItem("user_photo") == undefined
      ? Profile
      : localStorage.getItem("user_photo"),
  );
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationsUnread: number = notifications.filter(it => it.read_status == false).length

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
    } else if (path == "/add-storage") {
      return "Adicionar produto";
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
    } else if (path == "/update-measures") {
      return "Atualizar medidas";
    } else if (path == "/profile-user") {
      return "Perfil";
    } else if (path.includes("/edit-illness/")) {
      return "Editar enfermidade";
    } else if (path == "/diary") {
      return "Diário";
    } else if (path.includes("/anotation-diary/")) {
      return "Anotação";
    } else if (path == "/new-anotation") {
      return "Nova lembrança";
    }
  }

  function changeLayout(light: boolean) {
    const doc = document.documentElement.style
    setLayoutColor(light)

    if (light) {
      doc.setProperty("--color-light", "#f9f5ff")
      doc.setProperty("--color-lilas", "#e5daff")
      doc.setProperty("--color-primary-text", "#41354c")
      doc.setProperty("--color-white", "#ffffff")
      doc.setProperty("--color-lilas-medium", "#d2beff")

    } else {
      doc.setProperty("--color-light", "#3C334F")
      doc.setProperty("--color-lilas", "#73609F")
      doc.setProperty("--color-primary-text", "#E5DAFF")
      doc.setProperty("--color-white", "#352D48")
      doc.setProperty("--color-lilas-medium", "#352D48")

    }

  }

  function deleteNotification(id: number) {
    setNotifications(current => current.filter((n: Notification) => n.id_notification != id));
  }

  function readAllNotications() {
    setNotifications(current => current.map((it) => {
      return { ...it, read_status: true }
    }));
  }

  function changeRead(id: number) {
    onReadNotification(
      id,
      {
        onSuccess: () => {
          setNotifications(current => current.map((it) => {
            if (it.id_notification == id) {
              return { ...it, read_status: true }
            }
            return it
          }))
        }, onError: () => {
          alert("Erro ao visualizar notificação!")
        }
      }
    )
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1279px)");

    const handleResize = (e: MediaQueryListEvent) => {
      setWindowWidth(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    const handleTime = setInterval(() => {
      setDateHour(Date.getDateFormated());
    }, 60000);

    return () => clearInterval(handleTime);
  }, []);

  useEffect(() => {
    if (!notification) {
      return
    }

    if (notification) {
      setNotifications(notification)
    }
  }, [notification])

  return (
    <header
      className={`fixed top-0 flex flex-col justify-between items-center w-screen px-6 pt-6 z-90 bg-light ${setTitleHeader(location.pathname) != "Home" ? "h-24" : "h-32"}
      md:px-14
      xl:h-24 xl:flex-row xl:px-20 xl:pt-8 xl:items-start xl:right-0 ${location.pathname == "/profile-children" || location.pathname == "/profile-user" || location.pathname == "/add-child" ? "xl:w-[calc(100%-20%)]" : "xl:max-w-[calc(100%-200px)]"}`}
    >
      <div
        onClick={moveNoticationsBar}
        className={`xl:absolute xl:top-0 xl:z-80 xl:right-0 xl:w-screen xl:h-screen xl:bg-black/60 ${visibleNotifications ? "xl:block" : "hidden"}`}
      ></div>
      <button
        onClick={() => navigate(-1)}
        className={`xl:ml-[calc(220px)] ${(location.pathname == "/profile-children" && !windowWidth) || (location.pathname == "/profile-user" && !windowWidth) || (location.pathname == "/add-child" && !windowWidth) ? "flex" : "hidden"}`}
      >
        <img src={SetBackProfile} alt="Retorna a tela anterior." />
      </button>
      <div className={`w-full flex justify-between items-center xl:justify-start xl:gap-6 ${(setTitleHeader(location.pathname) != "Home" && windowWidth) || location.pathname == "/profile-children" || location.pathname == "/profile-user" || location.pathname == "/add-child" ? "hidden" : "block"}`}>
        <div
          className={`flex w-[calc(100%-90px)] h-9 rounded-2xl bg-lilas shadow-purple-sm px-2 ${(setTitleHeader(location.pathname) != "Home" && windowWidth) || location.pathname == "/profile-children" || location.pathname == "/profile-user" ? "hidden" : "block"}
          md:h-11
          xl:w-2/3`}
        >
          <img aria-hidden="true" src={Search} alt="" className="w-4 h-auto" />
          <InputDefault className="w-full pl-2 font-poppins text-primary-text" />
        </div>
        <button onClick={() => changeLayout(!layoutColor)} className={`shadow-purple-sm relative w-20 h-8 bg-primary rounded-full gap-1 items-center font-poppins px-2 text-sm xl:w-23 xl: xl:h-10 xl:gap-4  ${location.pathname == '/home' ? 'flex' : 'hidden'}`}>
          <div className={`absolute flex justify-center items-center rounded-full w-10 h-10 bg-lilas-bg z-40 transition duration-300 xl:w-12 xl:h-12 ${layoutColor ? '-translate-x-2' : 'translate-x-8 xl:translate-x-9.5'}`}>
            <img aria-hidden="true" src={layoutColor ? Sun : Moon} alt="" className="w-auto h-7" />
          </div>
          <span className="text-white">
            Dark
          </span>
          <span className="text-white">
            Light
          </span>
        </button>
      </div>
      <div
        className="flex w-full justify-between items-center mt-4
            xl:justify-end xl:gap-16 xl:h-11 xl:mt-0"
      >
        <span
          className="hidden
          xl:flex xl:font-nunito xl:text-black/50 xl:font-bold"
        >
          {DateHour}
        </span>
        <div
          className={`flex gap-3 ${setTitleHeader(location.pathname) != "Home" && windowWidth ? "block" : "hidden"}`}
        >
          <button onClick={() => navigate(-1)}>
            <img
              src={SetBack}
              alt="Icone para voltar a tela anterior."
              className="w-6"
            />
          </button>
          <h2 className={`text-text-primary font-poppins font-bold text-2xl`}>
            {setTitleHeader(location.pathname)}
          </h2>
        </div>
        <span
          className={`font-inter font-bold text-md text-primary-text ${setTitleHeader(location.pathname) != "Home" ? "hidden" : "block"}
          md:text-lg 
          xl:hidden`}
        >
          Olá
          <br />
          <span className="text-primary font-bold">
            {localStorage.getItem("user_name")} !
          </span>
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
                className={`absolute justify-center items-center rounded-full bg-primary w-5.5 h-5.5 -right-2 -top-2 z-90 ${notificationsUnread != 0 ? "flex" : "hidden"}
                md:h-6 md:w-6`}
              >
                <span className="font-bold text-white text-[14px]">
                  {notificationsUnread}
                </span>
              </div>
              <img
                src={Notifications}
                alt="Icone de redirecionamento para notificações."
                className={`w-auto h-6 ${notificationsUnread != 0 ? "animate-bell" : ""}
                md:h-8`}
              />
            </button>
          </div>
          <Link
            to="/profile-user"
            className={`w-auto h-10 -mt-2.5 border-2 border-lilas-dark rounded-full
            md:h-11 md:-mt-2
            xl:hidden ${location.pathname == "/profile-children" || location.pathname == "/profile-user" || location.pathname == "/add-child" ? "hidden" : "block"}`}
          >
            <img
              src={photoUser!}
              alt="Icone de perfil de usuário que redireciona para página de usuário."
              className="w-full h-full rounded-full object-cover object-center"
            />
          </Link>
        </div>
      </div>
      <NotificationsPage
        visibleNotifications={visibleNotifications}
        moveNotificationsBar={moveNoticationsBar}
        notifications={notifications}
        setNot={setNotifications}
        deleteNotification={deleteNotification}
        readAllNotications={readAllNotications}
        changeRead={changeRead}
        notificationsUnread={notificationsUnread}
      />
    </header>
  );
}

export default Header;

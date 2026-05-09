import { Link, useLocation } from "react-router-dom";

import Logo from "../assets/navigation/logoHeader.png";
import arrowIcon from "../assets/navigation/ArrowIcon.svg";
import Profile from "../assets/navigation/profileHeader.svg"

import type { IconsNavigation } from "../layouts/MainLayout";

interface Props {
  listIcons: IconsNavigation[];
}

function NavigationBar({ listIcons }: Props) {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 flex justify-center w-full h-22 md:h-28 z-100 bg-light backdrop-blur-sm 
      xl:left-0 xl:w-[15%] xl:min-w-50 xl:h-screen xl:bg-primary xl:flex-col xl:justify-between"
    >
      <div
        className="flex justify-center w-full items-center
        xl:items-start
        xl:pl-8 xl:pt-8 xl:flex-col"
      >
        <header
          className="hidden
          xl:flex xl:gap-4 xl:items-center"
        >
          <img
            src={Logo}
            alt="Logo principal do web-site, representada por uma mãe segurando seu filho so colo"
          />
        </header>

        <ul
          className="flex isolate justify-around items-center w-[90%] h-20 bg-lilas rounded-lg
          xl:flex-col xl:bg-transparent xl:w-auto xl:h-auto xl:items-start xl:gap-2 xl:mt-4"
        >
          <h2
            className="hidden
            xl:block xl:text-dark-purple xl:text-[22px] xl:font-semibold"
          >
            Menu
          </h2>
          {listIcons.slice(0, 4).map((icon) => (
            <Link
              key={icon.id}
              to={icon.path}
              className={`relative before:content-[''] before:absolute before:w-15 before:h-15 before:rounded-xl before:top-[calc(50%-30px)] before:left-[calc(50%-30px)] before:-z-10 before:transition-colors isolate before:inset-0 ${location.pathname == icon.path ? "before:bg-white/50 xl:before:bg-transparent xl:before:h-0 xl:before:w-0 before:shadow-purple-sm" : "before:bg-transparent"}
              md:before:w-16 md:before:h-16 before:top-[calc(50%-32px)] before:left-[calc(50%-32px)]
              xl:w-auto xl:h-9 xl:rounded-lg xl:hover:bg-white/20 xl:hover:scale-103 xl:transition xl:duration-200`}
            >
              <li
                className={`flex flex-col items-center gap-1 z-60
              xl:flex-row xl:w-full xl:h-full xl:gap-4 xl:rounded-lg xl:p-2
              ${location.pathname == icon.path && "xl:bg-white/40"}`}
              >

                <picture>
                  <source media="(min-width: 1280px)" srcSet={icon.iconDesk} />
                  <img
                    aria-hidden="true"
                    src={
                      location.pathname == icon.path
                        ? icon.iconSelected
                        : icon.icon
                    }
                    alt=""
                    className={`w-auto h-auto
                    md:w-7.5 md:h-7.5
                    xl:w-6`}
                  />
                </picture>
                <span
                  className={`font-nunito text-[10px] font-bold
                  md:text-[12px]
                xl:text-white xl:text-[12px] xl:font-light ${location.pathname == icon.path ? "text-accent-dark" : "text-text-primary"}`}
                >
                  {icon.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>

        <ul
          className="hidden
          xl:flex xl:flex-col xl:w-auto xl:h-auto xl:items-start xl:gap-2 xl:mt-4"
        >
          <h2 className="xl:text-dark-purple xl:text-[22px] xl:font-semibold">
            Categoria
          </h2>
          {listIcons.slice(4, 11).map((icon) => (
            <Link
              key={icon.id}
              to={icon.path}
              className="xl:w-auto xl:h-9 xl:rounded-lg xl:hover:bg-white/20 xl:hover:scale-103 xl:transition xl:duration-200"
            >
              <li
                className={`xl:flex xl:w-full xl:h-full xl:gap-4 xl:items-center xl:rounded-lg xl:p-2
                ${location.pathname == icon.path && "xl:bg-white/40"}`}
              >
                <img
                  aria-hidden="true"
                  src={icon.icon}
                  alt=""
                  className="xl:w-6 xl:h-auto4"
                />
                <span className="xl:text-white xl:text-[12px]">
                  {icon.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="hidden xl:flex xl:w-full xl:h-22 xl:justify-between xl:items-center xl:px-4 xl:border-t xl:border-white">
        <div className="xl:flex xl:items-top xl:gap-2">
          <img
            src={Profile}
            alt="Foto de perfil do usuário"
            className="xl:w-8 xl:h-8 xl:rounded-full xl:border xl:border-white"
          />
          <div className="xl:flex xl:flex-col xl:font-nunito xl:text-white">
            <span className="text-[14px]">Mariana Silvana</span>
            <span className="xl:text-[10px] xl:font">Pedro Henrique</span>
          </div>
        </div>
        <Link
        to="/profile-user"
          className="xl:w-4 xl:h-4"
        >
          <img src={arrowIcon}
            alt="Redirecionamento para o perfil de usuário"
            className="w-full h-full" />
        </Link>
      </div>
    </nav>
  );
}

export default NavigationBar;

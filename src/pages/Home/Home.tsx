import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import VaccinesIcon from "../../assets/vaccines.svg";
import StorageIcon from "../../assets/storageIcon.svg";
import RoutinesIcon from "../../assets/routinesIcon.svg";
import DiaryIcon from "../../assets/diaryIcon.svg";
import MeasurementsIcon from "../../assets/measurementsIcon.svg";
import PediatricianIcon from "../../assets/pediatricianIcon.svg";
import plusIcon from "../../assets/plusIcon.svg";
import childrenPhoto from "../../assets/childrenPhoto.svg";
import manageChildIcon from "../../assets/manageChildIcon.svg";
import healthIcon from "../../assets/healthIcon.svg";
import { CarouselDots } from "../../components/CarouselDots";
import { CategorySection } from "./components/CategorySection";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { useGetChildren } from "../../services/hooks/children/getChildren"
import Date from "../../utils/Date.ts"
import { calculateAgeChild } from "../../utils/CalculeAgeGroup.ts";
import CardCarousel from "../articles/components/CardCarousel.tsx";

import type { ResponseChild, Children } from "../../services/children/children.service";

import { useGetAgeGroups } from "../../services/hooks/ageGroup/useGetAgeGroups.ts";
import type { AgeGroup } from "../../services/ageGroup/ageGroup.service.ts";

import { useGetArticleByAge } from "../../services/hooks/article/useGetArticleByAge.ts";
import type { ArticleWithAge } from "../../services/article/article.service.ts";

import { useGetStorage } from "../../services/hooks/storage/useGetStorage.ts";
import type { ProductStorage } from "../../services/storage/storage.service.ts";

import { useGetRoutinesByChild } from "../../services/hooks/routines/useGetRoutines.ts";
import type { Routine } from "../../services/routines/routines.service.ts";
import { subDays } from "date-fns";

const articlesData = [
  {
    id: 1,
    textPre: "TUDO SOBRE O ",
    textHighlight: "PUERPÉRIO",
    description:
      "O puerpério é um dos momentos mais intensos e complexos da vida de uma mulher. Ele começa logo após o parto e se estende, geralmente, por seis a oito semanas, embora muitos profissionais de saúde considerem que os efeitos físicos e emocionais possam durar até um ano.",
  },
  {
    id: 2,
    textPre: "DICAS PARA O ",
    textHighlight: "SONO",
    description:
      "Criar uma rotina de sono saudável para o seu bebê é fundamental para o desenvolvimento dele e para o descanso de toda a família. Descubra técnicas valiosas.",
  },
  {
    id: 3,
    textPre: "INTRODUÇÃO ",
    textHighlight: "ALIMENTAR",
    description:
      "A fase de introdução alimentar é repleta de descobertas. Saiba como apresentar os primeiros alimentos de forma segura e nutritiva para o seu bebê.",
  },
];

const categoriesData = [
  { id: 1, title: "Vacinas", icon: VaccinesIcon, path: "/vaccines" },
  { id: 2, title: "Estoque", icon: StorageIcon, path: "/storage" },
  { id: 3, title: "Rotinas", icon: RoutinesIcon, path: "/routines" },
  { id: 4, title: "Diário", icon: DiaryIcon, path: "/diary" },
  { id: 5, title: "Medidas", icon: MeasurementsIcon, path: "/measures" },
  { id: 6, title: "Pediatra", icon: PediatricianIcon, path: "/pediatrician" },
  { id: 7, title: "Saúde", icon: healthIcon, path: "/health" },
];

const upcomingEventsData = [
  {
    id: 1,
    title: "Soneca da Tarde",
    time: "Em 2 Horas",
    description: "Previsto para 14H",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-blue-500"
      >
        <path d="M9.352 4.093c-2.316-2.023-5.836-1.503-6.953 1.134-.51 1.205-.51 2.585 0 3.79 1.117 2.637 4.637 3.157 6.953 1.134a.75.75 0 00-.982-1.127c-1.383 1.207-3.486.898-4.153-.679a3.004 3.004 0 010-2.27c.667-1.577 2.77-1.886 4.153-.679a.75.75 0 00.982-1.127z" />
        <path d="M12.96 11.246c-2.316-2.023-5.836-1.503-6.953 1.134-.51 1.205-.51 2.585 0 3.79 1.117 2.637 4.637 3.157 6.953 1.134a.75.75 0 00-.982-1.127c-1.383 1.207-3.486.898-4.153-.679a3.004 3.004 0 010-2.27c.667-1.577 2.77-1.886 4.153-.679a.75.75 0 00.982-1.127z" />
        <path
          fillRule="evenodd"
          d="M11.53 3.66a.75.75 0 01.696-.45h8.024a.75.75 0 01.696 1.03l-2.043 5.109h2.347a.75.75 0 01.625 1.164l-7.5 11.25a.75.75 0 01-1.312-.662l1.91-6.691h-3.21a.75.75 0 01-.663-1.096l3.398-9.055a.75.75 0 01.032-.05z"
          clipRule="evenodd"
        />
      </svg>
    ),
    bgClass: "bg-blue-50",
  },
  {
    id: 2,
    title: "Almoço",
    time: "Em 3 Horas",
    description: "Previsto para 12H",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-accent"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
          clipRule="evenodd"
        />
      </svg>
    ),
    bgClass: "bg-orange-50",
  },
];

export function Home() {
  const { data: childrenData } = useGetChildren();
  const { data: onGetAgeGroup } = useGetAgeGroups()

  const [idAgeGroup, setIdAgeGroup] = useState<number>(1)
  const { data: onGetArticleAge } = useGetArticleByAge(idAgeGroup)

  const navigate = useNavigate();

  const setChildName = useOutletContext<
    (name: string) => void
  >()

  const handleCategoryNavigation = (path: string) => {
    if (path && path !== "") {
      navigate(path);
    } else {
      navigate("/not-found");
    }
  };

  const [articles, setArticles] = useState<ArticleWithAge[]>([])

  const [ageGroup, setAgeGroup] = useState<AgeGroup[]>()
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Children>({
    id_child: 0,
    child_name: "Selecione um filho",
    height: 0,
    weight: 0,
    birth_date: "",
    BMI: null,
    blood_type: "",
    gender: "",
    photo: "",
    active: 1,
    fk_id_guardian: 0
  });
  const [listChildren, setListChildren] = useState<ResponseChild>()
  const carouselRef = useRef<HTMLDivElement>(null);

  const [inventoryStatusData, setInventory] = useState<ProductStorage[]>([]);
  const { data: onGetStorage } = useGetStorage(selectedChild.id_child, true)

  const date = Date.getDateUTC().split("-")
  const newDate = `${date[0]}-${date[1]}-${Number(date[2]) - 1}`
  const { data: onGetRoutines } = useGetRoutinesByChild(selectedChild.id_child, newDate)
  const [routines, setRoutines] = useState<Routine[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

        if (scrollLeft + clientWidth >= scrollWidth - 50) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({
            left: clientWidth,
            behavior: "smooth",
          });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!onGetRoutines) {
      return
    }

    if (onGetRoutines) {
      console.log(onGetRoutines)
      setRoutines(onGetRoutines.routines.slice(0, 2))
    }
  }, [onGetRoutines])

  useEffect(() => {
    if (localStorage.getItem("select_child") == null) {
      localStorage.setItem("select_child", "0")
    }

    if (!childrenData) {
      return
    }


    if (childrenData && onGetAgeGroup) {
      setListChildren(childrenData);

      const idChild: number = Number(localStorage.getItem("select_child"));

      const child: Children[] = childrenData.children.filter(it => it.id_child === idChild);

      if (child.length > 0 && localStorage.getItem("select_child") != "0") {
        setSelectedChild(child[0]);
        setAgeGroup(onGetAgeGroup.age_group)
        setIdAgeGroup(calculateAgeChild(child[0].birth_date, onGetAgeGroup.age_group))
      }
    }
  }, [childrenData, onGetAgeGroup]);

  useEffect(() => {
    if (!onGetArticleAge) {
      return
    }

    if (onGetArticleAge) {
      setArticles(onGetArticleAge.article.slice(0, 3))
    }
  }, [onGetArticleAge])

  useEffect(() => {
    if (ageGroup != null && ageGroup != undefined) {
      setIdAgeGroup(calculateAgeChild(selectedChild.birth_date, ageGroup))
    }
  }, [selectedChild])

  useEffect(() => {
    if (!onGetStorage) {
      return
    }

    if (onGetStorage) {
      setInventory(onGetStorage.stock.splice(0, 3))
    }
  }, [onGetStorage])

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.clientWidth;
      const currentIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(currentIndex);
    }
  };

  function handleArticlePage(e: React.MouseEvent<HTMLLIElement>, id: number) {
    e.stopPropagation()
    navigate(`/article/${id}`)
  }

  function formaterTitle(title: string) {
    if (title == "banho") {
      return "Banho"

    } else if (title == "stool") {
      return "Fraldas (Cocô)"

    } else if (title == "urine") {
      return "Fraldas (Xixi)"

    } else if (title == "Alimentação (Alimento sólido)") {
      return "Alimento sólido"

    } else if (title == "Alimentação (Papinha ou purê)") {
      return "Papinha ou purê"

    } else if (title == "Alimentação (Leite e derivados)") {
      return "Leite e derivados"

    } else if (title == "medication") {
      return "Medicação"

    } else if (title == "soneca") {
      return "Soneca"

    }
  }

  return (
    <div className="w-full flex flex-col items-center pt-14 pb-0 md:py-10 md:gap-8 xl:py-4 xl:pb-16 gap-4 xl:gap-4 relative">
      {/* Carousel */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex items-center gap-6 w-full max-h-[calc(100%-110px)] h-60 px-0.5 overflow-x-auto scroll-smooth snap-x snap-mandatory
        md:h-120        
        xl:h-[40%] xl:min-h-140"
      >
        {articles.map((article) => (
          <CardCarousel
            key={article.id_article}
            article={article}
            handleArticlePage={handleArticlePage}
          />
        ))}
      </div>

      {/* indexCarousel */}
      <CarouselDots activeIndex={activeIndex} total={articlesData.length} />

      {/* main container */}
      <div className="w-full flex flex-col grow justify-evenly gap-2 md:gap-12 xl:gap-6 xl:px-0">
        {/* categories */}
        <div className="xl:hidden">
          <CategorySection
            categories={categoriesData}
            onCategoryClick={handleCategoryNavigation}
          />
        </div>

        {/* children section */}
        <div className="flex flex-col gap-2 md:gap-6">
          <div className="flex justify-between items-end">
            <h3 onClick={() => {
              console.log(selectedChild)
              console.log(localStorage.getItem("select_child"))
            }} className="text-xl md:text-2xl font-bold font-poppins text-primary-text xl:text-2xl">
              <span className="xl:hidden">Filhos</span>
              <span className="hidden xl:inline">Meus Filhos</span>
            </h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden xl:block text-primary font-bold text-sm font-poppins hover:underline"
            >
              Gerir Filhos
            </button>
          </div>

          {/* Cards Container */}
          <div className="w-full bg-lilas xl:bg-transparent shadow-purple-md xl:shadow-none flex flex-col xl:flex-row gap-3 xl:gap-8 px-6 md:px-8 xl:px-0 pt-3 md:pt-4 xl:pt-0 pb-8 md:pb-10 xl:pb-0 rounded-md">
            <div className="w-full flex justify-between xl:hidden">
              <Link to="/add-child">
                <img
                  src={plusIcon}
                  alt="Icone de adicionar filho"
                  className="md:w-8 md:h-8"
                />
              </Link>
              <button onClick={() => setIsModalOpen(true)}>
                <img
                  src={manageChildIcon}
                  alt="Icone para acessar o perfil do filho"
                  className="md:w-8 md:h-8"
                />
              </button>
            </div>

            <Link
              to={selectedChild.id_child == 0 || localStorage.getItem("select_child") == "0" ? "/home" : "/profile-children"}
              className="w-full xl:w-[320px] bg-primary xl:bg-white xl:border xl:border-gray-200 xl:border-t-4 xl:border-t-primary py-1 md:py-4 xl:py-4 px-6 md:px-8 xl:px-6 rounded-sm shadow-purple-md xl:shadow-sm flex flex-col cursor-pointer hover:opacity-90 transition-all"
            >
              <div className="flex gap-4 md:gap-6 items-center w-full">
                <div className="bg-lilas rounded-full p-1 xl:p-0 xl:bg-transparent">
                  <img
                    src={selectedChild?.photo != "" ? selectedChild?.photo : childrenPhoto}
                    alt={`Foto de ${selectedChild?.child_name}`}
                    className="w-11 h-11 md:w-14 md:h-14 xl:w-12 xl:h-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <p className="font-poppins font-bold text-white xl:text-primary-text text-base md:text-xl xl:text-lg leading-tight">
                    {selectedChild?.child_name}
                  </p>
                  <span className="font-poppins text-sm md:text-base xl:text-sm text-lilas-medium xl:text-primary-text/70">
                    {Date.subYearsFormated(selectedChild?.birth_date)} anos
                  </span>
                </div>
                <div className="hidden xl:flex text-gray-500 hover:text-primary transition-colors cursor-pointer p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </div>
              </div>

              <div className="hidden xl:flex items-center gap-2 mt-6 pt-4 border-t border-gray-100 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-400 text-xs font-poppins">
                  Ultima Alimentação:
                </span>
                <span className="text-primary-text font-bold text-xs ml-auto">
                  A ser implementado
                </span>
              </div>
            </Link>

            <Link
              to="/add-child"
              className="hidden xl:flex w-full xl:w-50 border-2 border-dashed border-primary/40 bg-lilas/20 rounded-xl flex-col items-center justify-center gap-3 cursor-pointer hover:bg-lilas/40 transition-colors py-4"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-primary text-3xl font-bold leading-none mb-1">
                  +
                </span>
              </div>
              <span className="text-primary font-poppins text-base font-semibold">
                Adicionar Filho
              </span>
            </Link>
          </div>
        </div>

        {/* SEÇÃO INFERIOR */}
        <div className="hidden xl:grid grid-cols-2 gap-10 mt-6 w-full xl:pb-4">
          {/* Próximos Eventos */}
          <div className="flex flex-col gap-4">
            <h4 className="font-poppins font-bold text-primary-text text-lg">
              Proximos Eventos{" "}
              <span className="text-xs font-normal text-gray-400">
                (Baseado na sua rotina)
              </span>
            </h4>
            <div className="flex flex-col gap-3">
              {routines.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-accent"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-poppins font-bold text-primary-text text-sm">
                        {formaterTitle(event.title)}
                      </span>
                      <span className="font-poppins text-xs text-gray-400 mt-0.5">
                        {event.description}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-poppins text-gray-500 font-bold bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                    {event.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Estado do Estoque */}
          <div className="flex flex-col gap-4 xl:pb-4">
            <h4 className="font-poppins font-bold text-primary-text text-lg">
              Estado do Estoque
            </h4>
            {inventoryStatusData.length == 0 &&
              <p className="italic font-semibold text-lg w-full h-full flex justify-start text-accent items-center">Sem produtos no estoque</p>
            }

            {inventoryStatusData.length > 0 &&
              <div className="grid grid-cols-3 gap-3">
                {inventoryStatusData.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col items-center justify-center p-4 gap-2 rounded-xl shadow-sm border text-center ${item.quantity <= 1
                      ? "bg-red-50 border-red-100"
                      : "bg-white border-gray-100"
                      }`}
                  >
                    <div
                      className={`w-10 h-10 mb-2 rounded-full flex items-center justify-center ${item.quantity <= 1 ? "bg-red-100 text-red-500" : "bg-gray-50 text-gray-500"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                    </div>
                    <span
                      className={`font-poppins font-bold text-[16px] ${item.quantity <= 1 ? "text-red-500" : "text-primary-text"}`}
                    >
                      {item.product_name}
                    </span>
                    <span
                      className={`font-poppins text-xs mt-1 leading-tight ${item.quantity <= 1 ? "text-red-400 font-medium" : "text-gray-500"}`}
                    >
                      Quantidade: {item.quantity}
                    </span>
                    {item.description && (
                      <span className="text-[10px] text-red-400 mt-2 font-poppins">
                        {item.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      </div>

      {/* Modal Filhos */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="w-[90%] md:w-100 bg-white rounded-xl p-5 md:p-6 shadow-xl flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="font-poppins font-bold text-primary-text text-lg md:text-xl">
                  Filhos(as)
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-primary-text hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* List */}
              <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                {listChildren?.children.map((child: Children) => (
                  <div
                    key={child.id_child}
                    onClick={() => {
                      setSelectedChild(child);
                      localStorage.setItem("select_child", child.id_child.toString())
                      setChildName(child.child_name)
                      localStorage.setItem("select_child_name", child.child_name)
                      setIsModalOpen(false);
                      localStorage.setItem("child_birth_date", child.birth_date)
                    }}
                    className="w-full bg-white border border-lilas md:py-3 py-2 px-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-lilas/20 transition-colors"
                  >
                    <img
                      src={child.photo != "" ? child.photo : childrenPhoto}
                      alt={`Foto de ${child.child_name}`}
                      className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="font-poppins font-bold text-primary-text text-sm md:text-base leading-tight">
                        {child.child_name}
                      </p>
                      <span className="font-poppins text-xs md:text-sm text-primary-text/70 mt-0.5">
                        {child.child_name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

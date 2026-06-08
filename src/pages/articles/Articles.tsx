import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import SetBlack from '../../assets/routines/setBlack.svg'
import Search from "../../assets/search.svg"
import { calculateAgeChild } from "../../utils/CalculeAgeGroup";

import { InputDefault } from "../../components/InputDefault"
import { CarouselDots } from "../../components/CarouselDots"

import { useGetArticles } from "../../services/hooks/article/useGetArticles";
import { useGetArticleByAge } from "../../services/hooks/article/useGetArticleByAge";
import { useGetAgeGroups } from "../../services/hooks/ageGroup/useGetAgeGroups";
import type { Article } from "../../services/article/article.service";
import type { ArticleWithAge } from "../../services/article/article.service";

import type { AgeGroup } from "../../services/ageGroup/ageGroup.service";

import CardCarousel from "./components/CardCarousel";
import ArticleCard from "./components/ArticleCard";

export interface ArticleModel {
    id: number
    midia: string
    title: string
    font: string
    date: string
    description: string
    author: string
    type: string
    text_content?: string
}

const classButtonFilter: string = 'flex justify-center items-center w-full h-full font-semibold rounded-lg border bordr-'

function Articles() {
    const navigate = useNavigate()

    const { data: onGetArticles } = useGetArticles()
    const { data: onGetAgeGroup } = useGetAgeGroups()

    const [idAgeGroup, setIdAgeGroup] = useState<number>(1)
    const { data: onGetArticlesByAge } = useGetArticleByAge(idAgeGroup)

    const carousel = useRef<HTMLUListElement>(null)
    const articleCarousel = useRef<HTMLLIElement>(null)
    const carouselArticlesDesktop = useRef<HTMLUListElement>(null)
    const cardArticleDesktop = useRef<HTMLLIElement>(null)

    const childName: string | null = localStorage.getItem("select_child_name") ? localStorage.getItem("select_child_name")!.split(" ")[0] : ""
    const h3Text: string | null = localStorage.getItem("select_child_name") ? "Recomendados para" : "Recomendações"
    const [indexCarousel, setIndexCarousel] = useState<number>(0)
    const [filterArticles, setFilterArticles] = useState<string>("Todos")
    const [articlesCarousel, setArticlesCarousel] = useState<ArticleWithAge[]>([])
    const [articlesMain, setArticlesMain] = useState<Article[]>([])
    const [articles, setArticles] = useState<Article[]>(articlesMain)
    const [filterAgeGroups, setFilterAgeGroups] = useState<AgeGroup[]>([])

    function onFilterArticles(type: string) {
        if (type != filterArticles && type != 'Todos') {
            const newArticles: Article[] = articlesMain.filter(it => it.content == type)
            setArticles(newArticles)
            setFilterArticles(type)

        } else {
            setArticles(articlesMain)
            setFilterArticles("Todos")
        }
    }

    function onFilterInputArticles(text: string) {
        const lowerText = text.toLowerCase()

        const newArticles = articlesMain.filter(it => {
            return (
                it.title.toLowerCase().includes(lowerText) ||
                it.description.toLowerCase().includes(lowerText)
            )
        })

        setArticles(newArticles)
    }

    function scrollIntervalCarousel() {
        if (articleCarousel.current && carousel.current) {
            const articleElement: HTMLLIElement = articleCarousel.current
            const carouselElement: HTMLUListElement = carousel.current

            const widthArticle: number = articleElement.offsetWidth
            const positionCarousel: number = carouselElement.scrollLeft

            const index = Math.round(positionCarousel / (widthArticle + 24))

            if (index == 2) {
                carouselElement.scrollTo({
                    left: 0,
                    behavior: "smooth"
                })

                setIndexCarousel(0)

            } else {
                carouselElement.scrollBy({
                    left: widthArticle,
                    behavior: "smooth"
                })

            }

            setIndexCarousel(index == 2 ? 0 : index + 1)

        }
    }

    function scrollCarousel() {
        if (articleCarousel.current && carousel.current) {
            const articleElement: HTMLLIElement = articleCarousel.current
            const carouselElement: HTMLUListElement = carousel.current

            const widthArticle: number = articleElement.offsetWidth
            const positionCarousel: number = carouselElement.scrollLeft

            const index = Math.round(positionCarousel / (widthArticle + 24))

            setIndexCarousel(index)

        }
    }

    function moveCarouselArticles(direction: 'left' | 'right') {
        if (carouselArticlesDesktop.current && cardArticleDesktop.current) {
            const cardElement: HTMLLIElement = cardArticleDesktop.current
            const carouselElement: HTMLUListElement = carouselArticlesDesktop.current
            const cardWidth: number = cardElement.offsetWidth

            if (direction == 'left') {
                carouselElement.scrollBy({
                    left: cardWidth * -1,
                    behavior: 'smooth'
                })

            } else {
                carouselElement.scrollBy({
                    left: cardWidth,
                    behavior: 'smooth'
                })

            }

        }
    }

    function handleArticlePage(e: React.MouseEvent<HTMLLIElement>, id: number) {
        e.stopPropagation()
        navigate(`/article/${id}`)
    }

    useEffect(() => {
        if (!onGetAgeGroup) {
            return
        }

        if (onGetAgeGroup) {
            setIdAgeGroup(calculateAgeChild(localStorage.getItem("child_birth_date")!, onGetAgeGroup.age_group))
            setFilterAgeGroups(onGetAgeGroup.age_group.splice(0, 6))
        }
    }, [onGetAgeGroup])

    useEffect(() => {
        if (!onGetArticles) {
            return
        }

        if (onGetArticles && typeof onGetArticles != "string") {
            setArticles(onGetArticles.article)
            setArticlesMain(onGetArticles.article)
        }
    }, [onGetArticles])

    useEffect(() => {
        if (!onGetArticlesByAge) {
            return
        }

        if (onGetArticlesByAge) {
            setArticlesCarousel(onGetArticlesByAge.article.splice(0, 3))
        }
    }, [onGetArticlesByAge])

    useEffect(() => {
        const interval = setInterval(() => {
            scrollIntervalCarousel()
        }, 5000);

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col w-full min-h-full">
            <div className="flex flex-col justify-around w-full h-96
            md:h-130
            xl:h-[57%]">
                <div
                    className="flex w-full h-9 rounded-2xl bg-lilas shadow-purple-sm px-2
                    md:hidden
                    xl:w-2/3"
                >
                    <img aria-hidden="true" src={Search} alt="" className="w-4 h-auto" />
                    <InputDefault onChange={(e) => onFilterInputArticles(e.target.value)} className="w-full pl-2 font-poppins text-primary-text" />
                </div>
                <h3 className="flex justify-center items-center text-[22px] font-semibold font-poppins text-primary-text
                md:justify-start md:text-2xl
                xl:hidden">{h3Text} <span className="text-primary ml-1.5">{childName}</span>
                </h3>
                <h3 className="hidden xl:flex xl:text-primary-text xl:text-3xl">Descubra novos artigos</h3>
                <ul onScroll={scrollCarousel} ref={carousel} className="flex items-center gap-6 w-full max-h-[calc(100%-110px)] px-0.5 overflow-x-auto scroll-smooth snap-x snap-mandatory
                xl:min-h-[90%]">
                    {articlesCarousel.map((article) => (
                        <CardCarousel key={article.id_article} article={article} handleArticlePage={handleArticlePage} articleCarousel={articleCarousel} />
                    ))}
                </ul>
                <div className="flex justify-center w-full
                xl:hidden">
                    <CarouselDots total={3} activeIndex={indexCarousel} />
                </div>
            </div>
            <section className="flex flex-col w-full
            xl:h-[43%] xl:relative xl:items-center">
                <h3 className="text-primary-text font-semibold text-xl
                md:text-2xl
                xl:hidden">Categorias</h3>
                <ul className="flex justify-between items-center w-full h-26 flex-wrap
                md:h-28">
                    {filterAgeGroups.map((age) => (
                        <li key={age.id_age_group} className="w-[30%] h-8
                        md:h-10
                        xl:w-[15%]">
                            <button onClick={() => onFilterArticles(age.age_group_name)} className={`xl:flex xl:border ${classButtonFilter} ${filterArticles == age.age_group_name ? "bg-accent text-white border-accent shadow-sm"
                                : "bg-white text-gray-500 border-gray-200 hover:border-accent hover:text-accent"}`}>
                                {age.age_group_name}
                            </button>
                        </li>
                    ))}
                </ul>
                <ul ref={carouselArticlesDesktop} className="flex flex-col justify-around w-full h-auto gap-4 py-2 pb-24
                md:pb-28
                xl:flex-row xl:w-[calc(100%-52px)] xl:h-[calc(100%-56px)] xl:pb-0 xl:justify-start xl:gap-8 xl:overflow-x-auto xl:scroll-smooth xl:snap-x xl:snap-mandatory">
                    {articles.map((article) => (
                        <Link to={`/article/${article.id_article}`}
                            key={article.id_article}
                            className="min-h-22 flex">
                            <ArticleCard article={article} cardArticleDesktop={cardArticleDesktop} />
                        </Link>
                    ))}
                    <div className="hidden xl:absolute xl:top-[calc(50%+12px)] xl:right-0 xl:flex xl:w-full xl:h-6 xl:justify-between">
                        <button onClick={() => moveCarouselArticles('left')} className="">
                            <img src={SetBlack} alt="Move o carrosel de artigos" className="xl:w-auto xl:h-6" />
                        </button>
                        <button onClick={() => moveCarouselArticles('right')}>
                            <img src={SetBlack} alt="Move o carrosel de artigos" className="xl:rotate-180 xl:w-auto xl:h-6" />
                        </button>
                    </div>
                </ul>
            </section>
        </div>
    )
}

export default Articles
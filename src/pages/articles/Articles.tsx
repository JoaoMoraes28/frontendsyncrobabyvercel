import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import SetBlack from '../../assets/routines/setBlack.svg'
import Baby1 from "../../assets/articles/baby1.png"
import Baby2 from "../../assets/articles/baby2.png"
import Baby3 from "../../assets/articles/baby3.png"
import Search from "../../assets/search.svg"

import { InputDefault } from "../../components/InputDefault"
import { CarouselDots } from "../../components/CarouselDots"

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

const classButtonFilter: string = 'flex justify-center items-center w-[30%] h-8 font-semibold rounded-lg md:h-10 xl:w-[15%] xl:rounded-lg border border-accent'

function Articles() {
    const navigate = useNavigate()

    const carousel = useRef<HTMLUListElement>(null)
    const articleCarousel = useRef<HTMLLIElement>(null)
    const carouselArticlesDesktop = useRef<HTMLUListElement>(null)
    const cardArticleDesktop = useRef<HTMLLIElement>(null)

    const [indexCarousel, setIndexCarousel] = useState<number>(0)
    const [filterArticles, setFilterArticles] = useState<string>("Todos")
    const [articlesCarousel] = useState<ArticleModel[]>([
        {
            "id": 1,
            "midia": Baby1,
            "title": "A Importância do Brincar no Desenvolvimento Cognitivo",
            "font": "Portal Educação Infantil",
            "date": "2024-05-10",
            "description": "Exploramos como as brincadeiras lúdicas auxiliam na formação de conexões neurais.",
            "author": "Dra. Mariana Lins",
            "type": "saude"
        },
        {
            "id": 2,
            "midia": Baby2,
            "title": "Introdução Alimentar: Guia Prático para Pais de Primeira Viagem",
            "font": "Guia Crescer Saudável",
            "date": "2024-05-15",
            "description": "Dicas essenciais sobre como introduzir alimentos sólidos e lidar com as seletividades.",
            "author": "Nutricionista Roberto Alves",
            "type": "alimentacao"
        },
        {
            "id": 3,
            "midia": Baby3,
            "title": "Sono Infantil: Estratégias para uma Noite Tranquila",
            "font": "Blog Família Moderna",
            "date": "2024-05-18",
            "description": "Os distúrbios do sono são a quarta queixa mais comum nos consultórios pediátricos.",
            "author": "Carla Mendes",
            "type": "sono"
        }
    ])
    const [articlesMain] = useState<ArticleModel[]>([
        {
            "id": 1,
            "midia": Baby1,
            "title": "A Importância do Brincar no Desenvolvimento Cognitivo",
            "font": "Portal Educação Infantil",
            "date": "2024-05-10",
            "description": "Exploramos como as brincadeiras lúdicas auxiliam na formação de conexões neurais.",
            "author": "Dra. Mariana Lins",
            "type": "saude"
        },
        {
            "id": 2,
            "midia": Baby2,
            "title": "Introdução Alimentar: Guia Prático",
            "font": "Guia Crescer Saudável",
            "date": "2024-05-15",
            "description": "Dicas essenciais sobre como introduzir alimentos sólidos e lidar com as seletividades.",
            "author": "Nutricionista Roberto Alves",
            "type": "alimentacao"
        },
        {
            "id": 3,
            "midia": Baby3,
            "title": "Sono Infantil: Estratégias para uma Noite Tranquila",
            "font": "Blog Família Moderna",
            "date": "2024-05-18",
            "description": "Os distúrbios do sono são a quarta queixa mais comum nos consultórios pediátricos.",
            "author": "Carla Mendes",
            "type": "sono"
        },
        {
            "id": 4,
            "midia": Baby3,
            "title": "Sono Infantil: Estratégias para uma Noite Tranquila",
            "font": "Blog Família Moderna",
            "date": "2024-05-18",
            "description": "Os distúrbios do sono são a quarta queixa mais comum nos consultórios pediátricos.",
            "author": "Carla Mendes",
            "type": "sono"
        },
        {
            "id": 5,
            "midia": Baby3,
            "title": "Sono Infantil: Estratégias para uma Noite Tranquila",
            "font": "Blog Família Moderna",
            "date": "2024-05-18",
            "description": "Os distúrbios do sono são a quarta queixa mais comum nos consultórios pediátricos.",
            "author": "Carla Mendes",
            "type": "sono"
        },
        {
            "id": 6,
            "midia": Baby3,
            "title": "Sono Infantil: Estratégias para uma Noite Tranquila",
            "font": "Blog Família Moderna",
            "date": "2024-05-18",
            "description": "Os distúrbios do sono são a quarta queixa mais comum nos consultórios pediátricos.",
            "author": "Carla Mendes",
            "type": "sono"
        },
        {
            "id": 7,
            "midia": Baby3,
            "title": "Sono Infantil: Estratégias para uma Noite Tranquila",
            "font": "Blog Família Moderna",
            "date": "2024-05-18",
            "description": "Os distúrbios do sono são a quarta queixa mais comum nos consultórios pediátricos.",
            "author": "Carla Mendes",
            "type": "sono"
        }
    ])
    const [articles, setArticles] = useState<ArticleModel[]>(articlesMain)

    function onFilterArticles(type: string) {
        if (type != filterArticles && type != 'Todos') {
            const newArticles: ArticleModel[] = articlesMain.filter(it => it.type == type)
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
                xl:hidden">Recomendados para <span className="text-primary ml-1.5">Gabryel</span>
                </h3>
                <h3 className="hidden xl:flex xl:text-primary-text xl:text-3xl">Descubra novos artigos</h3>
                <ul onScroll={scrollCarousel} ref={carousel} className="flex items-center gap-6 w-full max-h-[calc(100%-110px)] px-0.5 overflow-x-auto scroll-smooth snap-x snap-mandatory
                xl:min-h-[90%]">
                    {articlesCarousel.map((article) => (
                        <CardCarousel key={article.id} article={article} handleArticlePage={handleArticlePage} articleCarousel={articleCarousel} />
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
                <ul className="flex justify-between items-center w-full h-14
                md:h-16
                xl:justify-start xl:gap-5">
                    <button onClick={() => onFilterArticles("Todos")} className={`hidden xl:flex xl:border ${classButtonFilter} ${filterArticles == "Todos" ? "bg-accent text-white border-accent shadow-sm"
                        : "bg-white text-gray-500 border-gray-200 hover:border-accent hover:text-accent"}`}>
                        <li>Todos</li>
                    </button>
                    <button onClick={() => onFilterArticles("sono")} className={`border ${classButtonFilter} ${filterArticles == "sono" ? "bg-accent text-white border-accent shadow-sm"
                        : "bg-white text-gray-500 border-gray-200 hover:border-accent hover:text-accent"}`}>
                        <li>Sono</li>
                    </button>
                    <button onClick={() => onFilterArticles("alimentacao")} className={`border ${classButtonFilter} ${filterArticles == "alimentacao" ? "bg-accent text-white border-accent shadow-sm"
                        : "bg-white text-gray-500 border-gray-200 hover:border-accent hover:text-accent"}`}>
                        <li>Alimentação</li>
                    </button>
                    <button onClick={() => onFilterArticles("saude")} className={`border ${classButtonFilter} ${filterArticles == "saude" ? "bg-accent text-white border-accent shadow-sm"
                        : "bg-white text-gray-500 border-gray-200 hover:border-accent hover:text-accent"}`}>
                        <li>Saúde</li>
                    </button>
                </ul>
                <ul ref={carouselArticlesDesktop} className="flex flex-col justify-around w-full h-auto gap-4 py-2
                xl:flex-row xl:w-[calc(100%-52px)] xl:h-[calc(100%-56px)] xl:justify-start xl:gap-8 xl:overflow-x-auto scroll-smooth snap-x snap-mandatory">
                    {articles.map((article) => (
                        <Link to={`/article/${article.id}`}
                        className="min-h-22 flex">
                            <ArticleCard key={article.id} article={article} cardArticleDesktop={cardArticleDesktop} />
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
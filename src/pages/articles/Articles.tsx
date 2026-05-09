import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import SetBlack from '../../assets/routines/setBlack.svg'
import Baby1 from "../../assets/articles/baby1.png"
import Baby2 from "../../assets/articles/baby2.png"
import Baby3 from "../../assets/articles/baby3.png"
import Search from "../../assets/search.svg"

import { InputDefault } from "../../components/InputDefault"
import { CarouselDots } from "../../components/CarouselDots"

import Date from "../../utils/Date"

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
                        <li onClick={(e) => handleArticlePage(e, article.id)} key={article.id} ref={articleCarousel} className="min-w-full h-[96%] rounded-xl shadow-purple-sm snap-center bg-lilas
                        xl:pointer-events-none">
                            <article className="w-full h-full
                                xl:relative">
                                <figure className="w-full h-[calc(100%-40px)]
                                    xl:flex xl:h-full xl:rounded-xl">
                                    <img aria-hidden="true" src={article.midia} alt="" className="w-full h-[70%] rounded-t-xl object-top object-cover
                                        xl:w-1/2 xl:h-full xl:rounded-tr-none xl:rounded-bl-xl" />
                                    <figcaption className="px-4 pt-2 space-y-2 font-poppins h-[30%] bg-lilas
                                        xl:w-1/2 xl:h-full xl:rounded-tr-xl xl:rounded-br-xl xl:px-10 xl:pt-6">
                                        <span className={`hidden xl:flex xl:justify-center xl:items-center xl:w-30 xl:h-8 xl:rounded-xl xl:shadow-purple-sm xl:font-medium xl:font-nunito xl:bg-white `}>
                                            {article.type == 'saude' ? 'Saúde'
                                                : article.type == 'alimentacao' ? 'Alimentação'
                                                    : 'Sono'}
                                        </span>
                                        <p className="text-primary-text font-semibold
                                            md:text-xl xl:text-[1.5rem]">{article.title}</p>
                                        <p className="hidden md:block md:text-lg md:font-medium md:text-primary
                                            xl:text-black xl:text-[1.2rem]">{article.description}</p>
                                    </figcaption>
                                </figure>
                                <footer className="flex justify-between items-center px-4 w-full h-10 rounded-b-xl font-nunito text-[10px] bg-lilas
                                    xl:absolute xl:bottom-0 xl:right-0 xl:w-1/2 xl:h-12 xl:pb-4 xl:rounded-bl-none">
                                    <span className="text-primary/40
                                        md:text-[12px]
                                        xl:hidden">{article.font}</span>
                                    <div className="xl:hidden">
                                        <span className="text-primary font-semibold
                                            md:text-[12px]">Autor(a): </span>
                                        <span className="text-primary
                                            md:text-[12px]">{article.author}</span>
                                    </div>
                                    <div className="hidden xl:flex xl:justify-between xl:items-center xl:w-full">
                                        <Link to={`/article/${article.id}`}
                                            className="xl:rounded-lg xl:pointer-events-auto xl:hover:bg-accent-darker xl:flex xl:justify-center xl:items-center xl:bg-accent xl:shadow-purple-md xl:text-white xl:text-[125%] xl:w-2/5 xl:h-12"
                                        >
                                            Ler o artigo completo
                                        </Link>
                                        <span className="xl:flex xl:justify-center xl:items-center xl:w-16 xl:h-6 xl:bg-accent xl:rounded-lg xl:text-white xl:text-[110%]">
                                            {Date.formatedDate(article.date)}
                                        </span>
                                    </div>
                                </footer>
                            </article>
                        </li>
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
                        <li ref={cardArticleDesktop} key={article.id} className="flex w-full min-h-22
                        md:min-h-24
                        xl:min-w-50 xl:max-w-50 xl:h-full xl:overflow-hidden xl:rounded-sm xl:snap-center xl:hover:shadow-purple-sm xl:hover:scale-102 xl:transition xl:duration-300">
                            <article className="flex w-full h-full rounded-lg
                            xl:flex-col xl:relative">
                                <div className="flex justify-center pt-4 w-1/3 h-full bg-primary rounded-l-lg
                                md:w-[28%]
                                xl:relative xl:w-full xl:h-1/2 xl:rounded-bl-none xl:rounded-tl-sm xl:rounded-tr-sm xl:pt-0">
                                    <span className="flex justify-center items-center w-22 h-6 font-nunito text-primary-text bg-light font-bold rounded-md
                                    md:w-30 md:h-8
                                    xl:absolute xl:bg-accent xl:text-white xl:font-normal xl:text-[12px] xl:rounded-sm xl:w-18 xl:h-6 xl:top-2 xl:right-2">{Date.formatedDate(article.date)}</span>
                                    <figure className="hidden xl:block xl:w-full xl:h-full xl:rounded-t-sm">
                                        <img src={article.midia} alt="" className="xl:w-full xl:h-full xl:rounded-t-sm xl:object-cover xl:object-top" />
                                    </figure>
                                </div>
                                <div className="flex flex-col justify-between w-2/3 h-full bg-lilas py-2 rounded-r-lg
                                md:w-[72%]
                                xl:w-full xl:h-1/2 xl:justify-start xl:rounded-tr-none xl:rounded-b-sm xl:pb-7 xl:overflow-y-auto">
                                    <p className="w-full px-4 text-primary font-poppins font-semibold text-[12px]
                                    md:text-[16px]
                                    xl:text-[14px]">{article.title}</p>
                                    <p className="w-full px-4 text-dark-purple-muted font-nunito font-normal text-[10px]
                                    md:text-[12px]">{article.description}</p>
                                    <p className="w-full px-2 text-end text-primary-text font-poppins font-medium text-[8px]
                                    md:text-[10px]
                                    xl:absolute xl:flex xl:items-center xl:bg-lilas xl:justify-end xl:bottom-0 xl:h-6 xl:rounded-b-sm">{article.author}</p>
                                </div>
                            </article>
                        </li>
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
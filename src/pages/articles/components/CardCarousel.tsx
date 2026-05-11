import type { ArticleModel } from "../Articles"

import Date from "../../../utils/Date"

import { Link } from "react-router-dom";

interface Props {
    article: ArticleModel
    articleCarousel: React.RefObject<HTMLLIElement | null>
    handleArticlePage: (e: React.MouseEvent<HTMLLIElement>, id: number) => void
}

function CardCarousel({ article, articleCarousel, handleArticlePage }: Props) {
    return (
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
    )
}

export default CardCarousel
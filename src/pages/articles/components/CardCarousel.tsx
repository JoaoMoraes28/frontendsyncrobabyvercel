import type { ArticleWithAge } from "../../../services/article/article.service.ts";
import type { Article } from "../../../services/article/article.service.ts";

import Date from "../../../utils/Date.ts"

import { Link } from "react-router-dom";

interface Props {
    article: ArticleWithAge | Article
    articleCarousel?: React.RefObject<HTMLLIElement | null>
    handleArticlePage: (e: React.MouseEvent<HTMLLIElement>, id: number) => void
}

function CardCarousel({ article, articleCarousel, handleArticlePage }: Props) {
    return (
        <li onClick={(e) => handleArticlePage(e, article.id_article)} key={article.id_article} ref={articleCarousel ? articleCarousel : null} className="min-w-full h-[96%] rounded-xl shadow-purple-sm snap-center bg-lilas
                        xl:pointer-events-none">
            <article className="w-full h-full
                                xl:relative">
                <figure className="w-full h-[calc(100%-40px)]
                                    xl:flex xl:h-full xl:rounded-xl">
                    <img aria-hidden="true" src={article.media!} alt="" className="w-full h-[70%] rounded-t-xl object-top object-cover
                                        md:h-[55%] md:object-center
                                        xl:w-1/2 xl:h-full xl:rounded-tr-none xl:rounded-bl-xl" />
                    <figcaption className="px-4 pt-2 space-y-1 font-poppins h-[30%] bg-lilas
                                        md:h-[45%]
                                        xl:w-1/2 xl:space-y-2 xl:h-full xl:flex xl:flex-col xl:rounded-tr-xl xl:rounded-br-xl xl:px-10 xl:pt-6">
                        <div className={`hidden xl:flex xl:font-semibold xl:justify-between xl:items-center xl:min-w-30 xl:w-auto xl:h-10 xl:font-nunito `}>
                            <span className="xl:px-4 bg-white xl:rounded-md xl:max-w-2/3 xl:h-10 xl:text-[90%] xl:flex xl:justify-center xl:items-center xl:text-primary-darker">
                                {article.author}
                            </span>
                            <a onClick={(e) => e.stopPropagation()} href={article.source_link} className="hidden 
                            xl:pointer-events-auto xl:text-[14px] xl:text-primary/80 xl:block">Material original</a>
                        </div>
                        <p className="text-primary-text font-semibold
                                                md:text-xl xl:text-[120%]">{article.title}</p>
                        <p className="hidden md:block md:text-lg md:font-medium md:text-primary
                                            xl:text-black xl:text-[100%] xl:flex xl:grow">{article.description}</p>
                    </figcaption>
                </figure>
                <footer className="flex justify-between items-center px-4 w-full h-10 rounded-b-xl font-nunito text-[10px] bg-lilas
                                    xl:absolute xl:bottom-0 xl:right-0 xl:w-1/2 xl:h-12 xl:pb-4 xl:rounded-bl-none">
                    <a onClick={(e) => e.stopPropagation()} href={article.source_link} className="text-primary/80
                                        md:text-[12px]
                                        xl:hidden">Material original</a>
                    <div className="xl:hidden">
                        <span className="text-primary font-semibold
                                            md:text-[12px]">Autor(a): </span>
                        <span className="text-primary
                                            md:text-[12px]">{article.author}</span>
                    </div>
                    <div className="hidden xl:flex xl:justify-between xl:items-end xl:pb-5 xl:w-full">
                        <Link to={`/article/${article.id_article}`}
                            className="xl:rounded-lg xl:pointer-events-auto xl:hover:bg-accent-darker xl:flex xl:justify-center xl:items-center xl:bg-accent xl:shadow-purple-md xl:text-white xl:text-[125%] xl:w-2/5 xl:h-12"
                        >
                            Ler o artigo completo
                        </Link>
                        <span className="xl:flex xl:justify-center xl:items-center xl:min-w-19 xl:h-8 px-2 xl:bg-accent xl:rounded-lg xl:text-white xl:text-[120%]">
                            {article.publication_date ? Date.formatedDate(article.publication_date) : 'Sem data de publicação'}
                        </span>
                    </div>
                </footer>
            </article>
        </li>
    )
}

export default CardCarousel
import type { ArticleModel } from "../Articles"

import Date from "../../../utils/Date"

interface Props {
    article: ArticleModel
    cardArticleDesktop: React.RefObject<HTMLLIElement | null>
}

function ArticleCard({ article, cardArticleDesktop }: Props) {
    return (
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
    )
}

export default ArticleCard
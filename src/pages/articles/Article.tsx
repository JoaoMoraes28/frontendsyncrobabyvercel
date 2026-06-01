import { useEffect, useState } from "react"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import SetBack from "../../assets/navigation/setBack.svg";

import { useNavigate, useParams } from "react-router-dom"

import { useGetSingleArticle } from "../../services/hooks/article/useGetSingleArticle"
import type { Article } from "../../services/article/article.service"

function ArticleContent() {
    const navigate = useNavigate()

    const { articleId } = useParams()

    const { data: onGetArticle } = useGetSingleArticle(Number(articleId))

    const [article, setArticle] = useState<Article>()

    useEffect(() => {
        if (!onGetArticle) {
            return
        }

        if (onGetArticle) {
            setArticle(onGetArticle.article[0])
        }
    }, [onGetArticle])

    return (
        <div className="flex flex-col gap-5">
            <div className="hidden xl:flex xl:justify-start xl:w-full">
                <button onClick={() => navigate(-1)}>
                    <img src={SetBack} alt="Retorna a tela anterior." className="xl:w-auto xl:h-9" />
                </button>
            </div>
            <div className="flex flex-col h-auto gap-6
            xl:flex-row-reverse">
                <div className="flex flex-col 
                xl:w-1/3 xl:gap-5">
                    <h1 className="w-full text-primary-text font-poppins font-semibold text-center text-2xl
                    xl:text-xl xl:text-start">{article?.title}</h1>
                    <p className="hidden xl:block xl:font-nunito xl:text-primary-darker">{article?.description}</p>
                </div>
                <img src={article?.media!} alt="Imagem principal do artigo." className="rounded-lg shadow-purple-sm w-full h-60 object-cover object-center
                md:h-120
                xl:w-2/3 xl:h-full xl:max-h-120" />
            </div>
            <section className="flex flex-col w-full
            xl:pb-10">
                <Markdown remarkPlugins={[remarkGfm]} components={{
                    h2: ({ node, ...props }) => <h2 className="font-poppins text-primary font-semibold text-xl mt-8" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="font-poppins text-primary font-semibold text-lg mt-8" {...props} />,
                    p: ({ node, ...props }) => <p className="font-nunito text-primary-text mt-2" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-none flex gap-2 mt-2 flex-col" {...props} />
                }}>
                    {article?.content}
                </Markdown>
            </section>
        </div>
    )
}

export default ArticleContent
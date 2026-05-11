import { useState } from "react"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import type { ArticleModel } from "./Articles"

import Baby2 from "../../assets/articles/baby1.png"
import SetBack from "../../assets/navigation/setBack.svg";

import { useNavigate } from "react-router-dom"

function ArticleContent() {
    const navigate = useNavigate()

    const [article] = useState<ArticleModel>(
        {
            "id": 1,
            "midia": "foto.png",
            "title": "Distúrbios na infância: A Importância do Olhar Atento no Desenvolvimento Inicial",
            "date": "2022-06-07",
            "font": "http://pedro.com",
            "description": "Uma análise sobre como identificar precocemente transtornos de desenvolvimento e a importância da rede de apoio para o bem-estar infantil.",
            "text_content": "## O conceito do olhar atento\n\nO desenvolvimento infantil não é uma linha reta, mas um processo cheio de nuances. O 'olhar atento' refere-se à capacidade de observar além do comportamento superficial, buscando entender se os marcos do desenvolvimento — como a fala, a interação social e a coordenação motora — estão ocorrendo conforme o esperado para a idade cronológica.\n\n## As principais causas e sinais de alerta\n\nMuitos desses distúrbios têm origens multifatoriais, envolvendo desde predisposição genética até fatores ambientais durante a gestação. Os sinais de alerta costumam aparecer cedo: a falta de contato visual, a ausência de resposta ao ser chamado pelo nome ou o desinteresse por brincadeiras funcionais são indicadores que não devem ser ignorados pelos responsáveis.\n\n## A importância do diagnóstico precoce\n\nIdentificar uma alteração no desenvolvimento nos primeiros anos de vida permite o aproveitamento da neuroplasticidade. Quando a intervenção ocorre cedo, as conexões neurais da criança são mais maleáveis, o que aumenta significativamente as chances de evolução e reduz os impactos que o distúrbio poderia causar na vida adulta.\n\n## O papel mediador da escola\n\nA escola é, muitas vezes, o primeiro lugar onde o distúrbio se torna evidente. No convívio com os pares, as dificuldades de socialização e aprendizado ganham destaque. O professor atua como um mediador essencial, sinalizando à família a necessidade de uma avaliação especializada, sem necessariamente rotular a criança.\n\n## Estratégias de intervenção e suporte\n\nO tratamento deve ser sempre multidisciplinar. Fonoaudiólogos, psicólogos e terapeutas ocupacionais trabalham em conjunto para oferecer o suporte necessário. O foco não é apenas 'corrigir' o distúrbio, mas fornecer ferramentas para que a criança encontre sua própria forma de interagir com o mundo de maneira funcional e saudável.\n\n## Conclusão e acolhimento familiar\n\nO diagnóstico de um distúrbio na infância exige, acima de tudo, acolhimento. A aceitação por parte da família é o primeiro passo para que o tratamento seja eficaz. Com o olhar atento e o suporte adequado, é possível garantir que a criança se desenvolva com dignidade, respeitando seu tempo e suas particularidades.",
            "author": "Pedro Henrique Araújo",
            "type": "sono"
        }
    )

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
                    xl:text-xl xl:text-start">{article.title}</h1>
                    <p className="hidden xl:block xl:font-nunito xl:text-primary-darker">{article.description}</p>
                </div>
                <img src={Baby2} alt="Imagem principal do artigo." className="rounded-lg shadow-purple-sm w-full h-60 object-cover object-center
                md:h-120
                xl:w-2/3 xl:h-full xl:max-h-120" />
            </div>
            <section className="flex flex-col w-full
            xl:pb-10">
                <Markdown remarkPlugins={[remarkGfm]} components={{
                    h2:({node, ...props}) => <h1 className="font-poppins text-primary font-semibold text-xl mt-4" {...props} />,
                    p:({node, ...props}) => <p className="font-nunito text-primary-text mt-2" {...props} />
                }}>
                    {article.text_content}
                </Markdown>
            </section>
        </div>
    )
}

export default ArticleContent
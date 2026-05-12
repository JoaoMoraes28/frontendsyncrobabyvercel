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
            "text_content": "A primeira infância, período que vai da concepção até os 6 anos de idade, é considerada uma janela de oportunidades crucial para a saúde, o aprendizado, o desenvolvimento e o bem-estar social e emocional das crianças. Estudos científicos têm demonstrado que as primeiras experiências vividas na infância, bem como intervenções e serviços de qualidade ofertados nesse período, estabelecem a base do desenvolvimento. Ou seja, o que acontece nos primeiros anos de vida é fundamental para o desenvolvimento integral de meninas e meninos, de modo que é preciso que haja investimentos nessa fase para que esses impactos sejam positivos para toda a sociedade. \n\nA neurociência comprova que o cérebro da criança pequena tem uma grande plasticidade, ou seja, está sempre aprendendo e é sensível a modificações, particularmente nos primeiros 1.000 dias, desde a concepção até os 2 anos de idade.Nesse período, o desenvolvimento cerebral ocorre em uma velocidade incrível: as células cerebrais podem fazer até 1.000.000 de novas conexões neuronais a cada segundo – uma velocidade única na vida.Essas conexões formam a base das estruturas que dão sustentação à aprendizagem ao longo da vida.É quando aprendemos as habilidades emocionais, cognitivas e sociais, e desenvolvemos nossa capacidade intelectual, aptidões e competências com maior facilidade.Por isso, é tão fundamental estimular as crianças nessa fase em um ambiente estimulante e acolhedor, com cuidado, afeto, carinho e interações frequentes com os adultos importantes para a criança.A falta de atenção integral – que inclui acesso a saúde, nutrição adequada, estímulos, amor e proteção contra o estresse e a violência – pode impedir o desenvolvimento dessas estruturas cerebrais.\n\nJá temos diversas evidências que mostram que, no longo prazo, as experiências vividas na primeira infância também estão relacionadas com acontecimentos na vida adulta, como um melhor desempenho escolar e profissional, assim como menos problemas de saúde e até um menor envolvimento com criminalidade e outros fenômenos sociais.Em outras palavras, os estudos apontam que é mais vantajoso e eficaz investir nessa fase inicial da vida do que tentar reverter problemas que venham a se manifestar mais tarde.\n\nA série Lancet *Advancing Early Childhood Development: from Science to Scale*, lançada em outubro de 2016, revelou que quase 250 milhões de crianças com menos de 5 anos estavam correndo o risco de ter seu desenvolvimento comprometido devido à desnutrição crônica e à pobreza extrema.A série também revelou que os programas que promovem atenção integral – saúde, nutrição, cuidados responsivos, segurança e proteção e aprendizagem precoce – podem custar apenas 50 centavos *per capita* por ano, quando combinados com os serviços de saúde existentes.\n\nPais, mães, cuidadoras e cuidadores principais têm a responsabilidade primária de criar suas crianças, mas precisam de apoio e assistência para proporcionar ambientes ideais para o desenvolvimento pleno da criança.Nesse sentido, as empresas também podem desempenhar um papel fundamental na promoção do desenvolvimento infantil e devem garantir que seus funcionários e os funcionários de seus fornecedores tenham tempo, recursos e apoio necessários para fornecer ambientes de cuidado e carinho nos quais as crianças pequenas possam crescer e prosperar.",
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
                    h2: ({ node, ...props }) => <h1 className="font-poppins text-primary font-semibold text-xl mt-4" {...props} />,
                    p: ({ node, ...props }) => <p className="font-nunito text-primary-text mt-2" {...props} />
                }}>
                    {article.text_content}
                </Markdown>
            </section>
        </div>
    )
}

export default ArticleContent
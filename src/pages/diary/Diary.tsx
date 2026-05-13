import type { Register } from "./components/Card.tsx"
import { InputDefault } from "../../components/InputDefault.tsx"

import Search from "../../assets/search.svg"
import Plus from "../../assets/plusWhite.svg"
import { useEffect, useState } from "react"
import Card from "./components/Card.tsx"

import { Link } from "react-router-dom"
import ChildrenSelect from "../../layouts/ChildrenSelect.tsx"

function Diary() {
    const [childSelected, setChildSelected] = useState<number>(1)
    const [registerMain] = useState<Register[]>([
        {
            "id": 1,
            "title": "Os primeiros passos da Maya",
            "creation_date": "2026-03-12T10:30:00Z",
            "text_content": "Hoje estávamos na sala e ele soltou do sofá de repente! Deu três passinhos na minha direção antes de cair sentado rindo muito. Eu juro, foi como assistir um pequeno milagre acontecendo em câmera lenta — aqueles passinhos meio tortinhos, cheios de coragem e desequilíbrio, como se o mundo inteiro fosse grande demais pra ele e, ainda assim, ele estivesse disposto a conquistar cada centímetro. Fiquei tão surpresa que nem consegui reagir na hora, só abri um sorriso bobo enquanto ele ria, como se tivesse contado a melhor piada do universo. Depois ele bateu as mãozinhas no chão, todo orgulhoso de si mesmo, e tentou levantar de novo — claro que sem muito sucesso, mas com uma determinação que parecia maior que ele.",
            "label_color": "#FFA9DD"
        },
        {
            "id": 2,
            "title": "Primeiro dia de aula (muito choro, mais da nossa parte)",
            "creation_date": "2026-02-05T08:15:00Z",
            "text_content": "Hoje estávamos na sala e ele soltou do sofá de repente! Deu três passinhos na minha direção antes de cair sentado rindo muito. Eu juro, foi como assistir um pequeno milagre acontecendo em câmera lenta — aqueles passinhos meio tortinhos, cheios de coragem e desequilíbrio, como se o mundo inteiro fosse grande demais pra ele e, ainda assim, ele estivesse disposto a conquistar cada centímetro. Fiquei tão surpresa que nem consegui reagir na hora, só abri um sorriso bobo enquanto ele ria, como se tivesse contado a melhor piada do universo. Depois ele bateu as mãozinhas no chão, todo orgulhoso de si mesmo, e tentou levantar de novo — claro que sem muito sucesso, mas com uma determinação que parecia maior que ele.",
            "label_color": "#68DBCE"
        },
        {
            "id": 3,
            "title": "A primeira palavra foi 'Gato'!",
            "creation_date": "2026-04-20T19:45:00Z",
            "text_content": "Hoje estávamos na sala e ele soltou do sofá de repente! Deu três passinhos na minha direção antes de cair sentado rindo muito. Eu juro, foi como assistir um pequeno milagre acontecendo em câmera lenta — aqueles passinhos meio tortinhos, cheios de coragem e desequilíbrio, como se o mundo inteiro fosse grande demais pra ele e, ainda assim, ele estivesse disposto a conquistar cada centímetro. Fiquei tão surpresa que nem consegui reagir na hora, só abri um sorriso bobo enquanto ele ria, como se tivesse contado a melhor piada do universo. Depois ele bateu as mãozinhas no chão, todo orgulhoso de si mesmo, e tentou levantar de novo — claro que sem muito sucesso, mas com uma determinação que parecia maior que ele.",
            "label_color": "#F3DC82"
        },
        {
            "id": 4,
            "title": "Noite difícil: febre e muitos dentes nascendo",
            "creation_date": "2026-05-08T03:00:00Z",
            "text_content": "Hoje estávamos na sala e ele soltou do sofá de repente! Deu três passinhos na minha direção antes de cair sentado rindo muito. Eu juro, foi como assistir um pequeno milagre acontecendo em câmera lenta — aqueles passinhos meio tortinhos, cheios de coragem e desequilíbrio, como se o mundo inteiro fosse grande demais pra ele e, ainda assim, ele estivesse disposto a conquistar cada centímetro. Fiquei tão surpresa que nem consegui reagir na hora, só abri um sorriso bobo enquanto ele ria, como se tivesse contado a melhor piada do universo. Depois ele bateu as mãozinhas no chão, todo orgulhoso de si mesmo, e tentou levantar de novo — claro que sem muito sucesso, mas com uma determinação que parecia maior que ele.",
            "label_color": "#FF9193"
        }
    ])
    const [register, setRegister] = useState<Register[]>([])

    function filterRegister(text: string) {
        const newData: Register[] = registerMain.filter(it => it.title.toLowerCase().includes(text.toLowerCase()))
        setRegister(newData)
    }

    useEffect(() => {
        setRegister(registerMain)
    }, [])

    return (
        <div className="relative flex flex-col items-center w-full min-h-full pb-8">
            <div className="hidden xl:w-full xl:h-14 xl:flex xl:justify-between xl:items-center xl:bg-light">
                <div className="xl:flex">
                    <ChildrenSelect idChild={childSelected} setChild={setChildSelected} />
                </div>
                <Link
                    to="/new-anotation"
                    className="xl:flex xl:justify-center xl:items-center xl:w-[30%] xl:max-w-90 xl:h-10 xl:bg-accent xl:rounded-sm xl:text-white xl:font-poppins xl:font-semibold xl:relative">
                    <img aria-hidden="true" src={Plus} alt="" className="xl:absolute xl:left-5" />
                    Adicionar novo registro
                </Link>
            </div>
            <div
                className="flex w-full h-9 rounded-2xl bg-lilas shadow-purple-sm px-2
                    md:hidden
                    xl:w-2/3"
            >
                <img aria-hidden="true" src={Search} alt="" className="w-4 h-auto" />
                <InputDefault onChange={(e) => filterRegister(e.target.value)} className="w-full pl-2 font-poppins text-primary-text" />
            </div>
            <ul className="flex flex-col w-full gap-4 py-8 overflow-y-scroll
            xl:grid xl:grid-cols-2 xl:justify-items-center">
                {register.map((it) => (
                    <Link to={`/anotation-diary/${it.id}?edit=false`}
                        key={it.id}
                        className="xl:w-[85%] xl:h-full">
                        <Card card={it} />
                    </Link>
                ))}
            </ul>
            <div className="fixed bottom-22 w-full h-14 flex justify-center items-center bg-light
            md:bottom-28
            xl:hidden">
                <Link
                    to="/new-anotation"
                    className="flex justify-center items-center w-2/3 h-10 bg-accent rounded-sm text-white font-poppins font-semibold">
                    Adicionar novo registro
                </Link>
            </div>
        </div>
    )
}

export default Diary
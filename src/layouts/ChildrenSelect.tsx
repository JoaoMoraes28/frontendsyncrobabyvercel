import { Link } from 'react-router-dom'

import Plus from '../assets/plus.svg'

interface Children {
    id: number
    name: string
    age: number
}

interface Props {
    idChild: number
    setChild: (id: number) => void
}

function ChildrenSelect({ idChild, setChild }: Props) {
    const children: Children[] = [
        {
            "id": 1,
            "name": "Pedro",
            "age": 6
        },
        {
            "id": 2,
            "name": "Luana",
            "age": 7
        }
        ,
        {
            "id": 3,
            "name": "Gabryel",
            "age": 7
        }
    ]

    return (
        <ul className="hidden
        xl:flex xl:items-center xl:min-w-35 xl:w-auto xl:h-12 xl:gap-2 xl:px-2 xl:rounded-2xl xl:shadow-purple-sm">
            {children.map((child) => (
                <li onClick={() => setChild(child.id)} key={child.id} className={`xl:w-20 h-8 xl:rounded-2xl ${idChild == child.id ? 'xl:bg-accent xl:scale-103 xl:shadow-purple-sm' : 'xl:bg-transparent'}
                ${idChild != child.id ? 'hover:xl:shadow-purple-sm hover:xl:scale-103' : ''} transition duration-100`}>
                    <span className={`xl:flex xl:justify-center xl:items-center xl:w-full xl:h-full xl:font-semibold ${idChild == child.id ? 'xl:text-white' : 'xl:text-black'}`}>
                        {child.name}
                    </span>
                </li>
            ))}
            <Link
                to="/add-child">
                <img src={Plus} alt="Icone para redirecionar a tela de registrar um novo filho(a)."
                    className="xl:w-auto xl:h-4" />
            </Link>
        </ul>
    )
}

export default ChildrenSelect
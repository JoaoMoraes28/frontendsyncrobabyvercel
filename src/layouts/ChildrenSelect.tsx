import { Link } from 'react-router-dom'

import Plus from '../assets/plus.svg'

import { useGetChildren } from '../services/hooks/children/getChildren'
import type { Children } from '../services/children/children.service'

import { useEffect, useState } from 'react'

interface Props {
    idChild: number
    setChild: (id: number) => void
}

function ChildrenSelect({ idChild, setChild }: Props) {
    const { data: onGetChildren } = useGetChildren()

    const [children, setChildren] = useState<Children[]>([])

    useEffect(() => {
        if (!onGetChildren) {
            return
        }

        if (onGetChildren) {
            setChildren(onGetChildren.children)
        }
    }, [onGetChildren])

    return (
        <ul className="hidden
        xl:flex xl:items-center xl:min-w-35 xl:w-auto xl:h-12 xl:gap-2 xl:px-2 xl:rounded-2xl xl:shadow-purple-sm">
            {children.map((child) => (
                <li onClick={() => setChild(child.id_child)} key={child.id_child} className={`xl:w-20 h-8 xl:rounded-2xl ${idChild == child.id_child ? 'xl:bg-accent xl:scale-103 xl:shadow-purple-sm' : 'xl:bg-transparent'}
                ${idChild != child.id_child ? 'hover:xl:shadow-purple-sm hover:xl:scale-103' : ''} transition duration-100`}>
                    <span className={`xl:flex xl:justify-center xl:items-center xl:w-full xl:h-full xl:font-semibold ${idChild == child.id_child ? 'xl:text-white' : 'xl:text-black'}`}>
                        {child.child_name}
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
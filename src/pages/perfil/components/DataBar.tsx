import type { Props } from "../../../layouts/Perfil"
import Date from "../../../utils/Date"

import Male from "../../../assets/profileChildren/male.svg"
import Fem from "../../../assets/profileChildren/fem.svg"

const layoutLi: string = "xl:flex xl:justify-center xl:items-center xl:w-1/3 xl:h-[70%]"
const layoutSpan: string = "xl:font-bold xl:text-primary-text xl:text-[1.3rem]"

function DataBar({ child, readonly, genderSelected, setGenderSelected }: Props) {

    return (
        <ul className="xl:flex xl:items-center xl:w-[85%] xl:h-[55%] xl:bg-white xl:rounded-xl">
            <li className={`${layoutLi}`}>
                <button onClick={() => setGenderSelected('masculino')} type="button" className={`flex justify-center items-center w-12 h-12 rounded-lg ${genderSelected == 'masculino' && !readonly ? 'bg-lilas/80 border border-primary' : ''} ${child.gender == 'masculino' || !readonly ? 'flex' : 'hidden'}`}>
                    <img src={Male} alt="Gênero masculino." className="w-auto h-7" />
                </button>
                <button onClick={() => setGenderSelected('feminino')} type='button' className={`flex justify-center items-center w-12 h-12 rounded-lg ${genderSelected == 'feminino' && !readonly ? 'bg-lilas/80 border border-primary' : ''} ${child.gender == 'feminino' || !readonly ? 'flex' : 'hidden'}`}>
                    <img src={Fem} alt="Gênero feminino." className="w-auto h-8.5" />
                </button>
            </li>
            <li className={`${layoutLi} xl:border-x xl:border-primary`}>
                <span className={`${layoutSpan}`}>{`${Date.subYearsFormated(child.date_birth)} anos`}</span>
            </li>
            <li className={`${layoutLi}`}>
                <span className={`${layoutSpan}`}>{`IMC: ${child.imc}`}</span>
            </li>
        </ul>
    )
}

export default DataBar
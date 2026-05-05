import RedirectSet from "../../../assets/profileChildren/redirectSet.svg";

import { Link } from "react-router-dom";
import type { UseFormRegisterReturn } from "react-hook-form"

import { InputDefault } from "../../../components/InputDefault"

import type { ListDescription } from "../ProfileChildren"

interface Props {
    listDescription: ListDescription
    onlyRead: boolean
    date_birth: UseFormRegisterReturn
    blood_type: UseFormRegisterReturn
}

function AtributesProfile({ listDescription, onlyRead, date_birth, blood_type }: Props) {
    return (
        <div className="flex justify-between items-center w-full h-12 px-4 rounded-lg bg-white shadow-purple-sm
        md:h-15">
            <div className="flex items-center w-[90%] pr-4">
                <img aria-hidden="true" src={listDescription.img} alt="" className="w-auto h-4.5
                md:h-5.5" />
                <dt className="flex items-center font-nunito ml-1 text-primary-text font-semibold text-sm
                md:text-[16px]">{listDescription.title}</dt>
                <dd className={`flex-1 text-sm
                    md:text-[16px] ${listDescription.title == 'Data de nascimento:' || listDescription.title == 'Tipo sanguíneo:' ? '' : 'pl-1.5'}`}>
                    {listDescription.title == 'Data de nascimento:' ? (
                        <InputDefault {...date_birth} readOnly={onlyRead} type="date" className={`w-30 h-8 pl-1 ml-0.5 ${onlyRead ? '' : 'border-2 border-primary rounded-lg'}`} />
                    ) : listDescription.title == 'Tipo sanguíneo:' ? (
                        <InputDefault {...blood_type} readOnly={onlyRead} type="text" className={`w-14 h-8 pl-1 ml-0.5 ${onlyRead ? '' : 'border-2 border-primary rounded-lg'}`} />
                    ) : (
                        listDescription.value
                    )}
                </dd>
            </div>
            <Link to={listDescription.path ? listDescription.path : ""}>
                <img src={RedirectSet} alt={listDescription.aria} className={`w-auto h-6 ${listDescription.title == 'Data de nascimento:' || listDescription.title == 'Tipo sanguíneo:' ? "hidden" : "block"}`} />
            </Link>
        </div>
    )
}

export default AtributesProfile
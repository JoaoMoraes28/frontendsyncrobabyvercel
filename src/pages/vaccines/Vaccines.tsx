import {
  DropdownFilter,
  type FilterOption,
} from "../../components/DropDownFilter";
import { useEffect, useRef, useState } from "react";
import Date from "../../utils/Date";

import SetBlack from '../../assets/routines/setBlack.svg'
import EditIcon from "../../assets/editIcon.svg";

import { useGetAllVaccine } from "../../services/hooks/vaccine/useGetAllVaccine";
import type { UpdateVaccine } from "../../services/vaccine/vaccine.service";
import { useUpdateVaccineStatus } from "../../services/hooks/vaccine/useUpdateVaccineStatus";
import type { JSONAgeGroup } from "../../services/vaccine/vaccine.service";
import { LoadingBaby } from "../../components/LoadingBaby";
import { InputDefault } from "../../components/InputDefault";
import BtnPrimary from "../../components/BtnPrimary";
import { useForm } from "react-hook-form";

interface Form {
  application_date: string
}

export function Vaccines() {
  const idChild: number = Number(localStorage.getItem("select_child"))
  const { data: onGetAllVaccines, isLoading, isError, refetch } = useGetAllVaccine(idChild)
  const { mutate: onUpdateVaccine } = useUpdateVaccineStatus()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Form>()

  const [vaccines, setVaccines] = useState<JSONAgeGroup[]>()
  const [useVaccines, setUseVaccines] = useState<JSONAgeGroup[]>()
  const [ageGroup, setAgeGroup] = useState<string>()
  const [titleAgeGroup, setTitleAgeGroup] = useState<string>()
  const [options, setOptions] = useState<FilterOption[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [vaccineSelectedId, setVaccineDataSelectedId] = useState<number>()
  const [vaccineSelectedName, setVaccineDataSelectedName] = useState<string>()

  const containerVaccine = useRef<HTMLUListElement>(null)
  const vaccine = useRef<HTMLLIElement>(null)

  function getAgeGroup(data: JSONAgeGroup[]) {
    let ageGroups: FilterOption[] = data.map((it) => {
      return { id: it.age_group_name, label: it.age_group_name }
    })
    ageGroups.unshift({ id: "Todas", label: "Todas" })
    setOptions(ageGroups)
  }

  function filterVaccine(option: string) {
    if (option == "Todas") {
      setUseVaccines(vaccines)
      return
    }
    setTitleAgeGroup(option)
    setUseVaccines(vaccines?.filter(it => it.age_group_name == option))
  }

  function changeTitleAgeGroup() {
    const container = containerVaccine.current
    const vaccin = vaccine.current

    if (container && vaccin) {
      const containerPosition: number = container.scrollLeft
      const widthVaccin: number = vaccin.offsetWidth

      const index: number = Math.round(containerPosition / widthVaccin)

      setTitleAgeGroup(options[index + 1].label)
    }

  }

  function changeVaccineCarousel(direction: 'left' | 'right') {
    const container = containerVaccine.current
    const vaccin = vaccine.current

    if (container && vaccin) {
      const widthVaccin: number = vaccin.offsetWidth

      if (direction == 'left') {
        container.scrollBy({
          left: widthVaccin * -1,
          behavior: 'smooth'
        })

      } else {
        container.scrollBy({
          left: widthVaccin,
          behavior: 'smooth'
        })

      }
    }
  }

  function updateVaccineDate(date: Form) {
    const updateData: UpdateVaccine = {
      fk_id_child: idChild,
      application_status: 1,
      application_date: date.application_date,
      fk_id_vaccine: vaccineSelectedId!
    }

    onUpdateVaccine(
      updateData,
      {
        onSuccess: () => {
          alert("Vacina atualizada com sucesso!")
          setModalOpen(false)
          refetch()

        }, onError: () => {

        }
      }
    )
  }

  useEffect(() => {
    if (!onGetAllVaccines) {
      return
    }

    if (onGetAllVaccines) {
      setVaccines(onGetAllVaccines.vaccine)
      setUseVaccines(onGetAllVaccines.vaccine)
      setAgeGroup("Todas")
      getAgeGroup(onGetAllVaccines.vaccine)

      if (ageGroup == undefined) {
        setTitleAgeGroup(onGetAllVaccines.vaccine[0].age_group_name)
      }
    }
  }, [onGetAllVaccines])

  return (
    <div className="flex flex-col w-full h-full
    xl:items-center">
      <div className={`fixed bg-black/50 backdrop-blur-sm left-0 top-0 w-full h-full flex justify-center items-center z-40 ${modalOpen ? "block" : "hidden"}`}>
        <form onSubmit={handleSubmit(updateVaccineDate)} className="flex flex-col items-center w-[90%] bg-lilas-bg h-60 rounded-xl justify-evenly font-poppins">
          <p className="text-primary-text font-semibold text-center">Digite a data de aplicação da {vaccineSelectedName}</p>
          <InputDefault {...register("application_date", { required: "Data obrigatória" })} type="date" className="pl-2 text-primary bg-white rounded-sm w-[80%] h-10" />
          {errors.application_date?.message && <p className="text-red-600/70 text-sm font-nunito">{errors.application_date.message}</p>}
          <span className="text-[13px] italic text-primary-darker">Obs: A data não poderá ser alterada após a confirmação</span>
          <div className="w-full flex justify-center gap-12">
            <BtnPrimary onClick={() => setModalOpen(false)} type="button" text="Cancelar" className="bg-white" />
            <BtnPrimary type="submit" text="Confirmar" className="bg-accent text-white" />
          </div>
        </form>
      </div>
      <div className="w-full h-12 flex justify-between items-start">
        <DropdownFilter options={options} onSelect={setAgeGroup} functionExtra={filterVaccine} selectedFilter={ageGroup ? ageGroup : "Todas"} />
        <h3 className="bg-primary text-white font-semibold w-22 h-10 flex justify-center items-center shadow-purple-md">{titleAgeGroup}</h3>
      </div>
      <div className="bg-primary w-full min-h-[calc(100%-48px)] max-h-[calc(100%-48px)] p-2
      xl:relative">
        <button onClick={() => changeVaccineCarousel('left')} className="hidden xl:flex xl:absolute xl:-left-10 xl:top-[calc(50%-25px)] xl:w-10 xl:h-10 xl:justify-center xl:items-center">
          <img src={SetBlack} alt="Retrocede os cards de vacine." className="xl:w-auto h-6" />
        </button>
        <button onClick={() => changeVaccineCarousel('right')} className="hidden xl:flex xl:absolute xl:-right-10 xl:top-[calc(50%-25px)] xl:w-10 xl:h-10 xl:justify-center xl:items-center">
          <img src={SetBlack} alt="Avança os cards de vacina." className="xl:rotate-180 xl:w-auto xl:h-6" />
        </button>
        <ul ref={containerVaccine} onScroll={changeTitleAgeGroup} className="h-full min-w-full overflow-x-auto flex scroll-smooth snap-x snap-mandatory">
          {isLoading && !isError && <LoadingBaby text="Procurando vacinas" />}

          {!isLoading && isError && <p className="text-red-500 font-poppins col-span-full text-center mt-4">Erro na API</p>}

          {!isLoading && !isError &&
            useVaccines?.map((age_group_vaccine) => {
              return (
                <li ref={vaccine} key={age_group_vaccine.id_age_group} className="bg-lilas-bg min-w-full min-h-full h-full overflow-y-scroll snap-center">
                  <ul className="min-w-full min-h-full max-h-full overflow-y-scroll">
                    {age_group_vaccine.vaccines.map((vaccine) => (
                      <li key={vaccine.id_vaccine} className="relative flex flex-col pb-10 font-nunito bg-white min-h-40
                      md:gap-3
                      xl:pb-12">
                        <header className="px-2 w-full h-8 flex items-center font-poppins bg-primary text-light font-semibold
                                xl:text-[18px]">
                          <p className="w-[55%]">Vacina</p>
                          <p className="w-[22%]">Status</p>
                          <p className="w-[23%]">Data</p>
                        </header>
                        <div className="w-full h-[calc(100%-32px)] gap-2 flex flex-col p-2
                        xl:p-4 ">
                          <div className="flex w-full text-[14px]
                          md:text-[16px]
                          xl:text-[18px]">
                            <p className="w-[55%] truncate text-primary-text font-semibold pr-4">{vaccine.vaccine}</p>
                            <p className={`w-[22%] ${vaccine.application_status == 0 ? 'text-red-500' : 'text-primary-text'}`}>{vaccine.application_status == 0 ? 'Pendente' : 'Aplicada'}</p>
                            <p className={`w-[23%] ${vaccine.application_status == 0 ? 'text-red-500' : 'text-primary-text'}`}>{vaccine.application_date == null ? 'Pendente' : Date.formatedDate(vaccine.application_date)}</p>
                          </div>
                          <p className="text-[12px] text-primary
                          md:text-[14px]>
                          xl:text-[16px]">
                            <span className="text-primary-darker font-semibold">Doenças evitadas: </span> {vaccine.prevented_diseases}
                          </p>
                          <p className="text-[12px] text-primary italic
                          md:text-[14px]
                          xl:text-[16px]">
                            <span className="text-primary-darker font-semibold not-italic">Obs: </span> {vaccine.observation ? vaccine.observation : "Sem observações"}
                          </p>
                        </div>
                        <button onClick={() => {
                          setModalOpen(true)
                          setVaccineDataSelectedId(vaccine.id_vaccine)
                          setVaccineDataSelectedName(vaccine.vaccine)
                        }} className={`absolute bottom-3 right-3 w-6 h-6 justify-center items-center bg-primary/30 rounded-md shadow-purple-sm ${vaccine.application_status ? 'hidden' : 'flex'}
                        xl:bottom-4 xl:right-4 xl:w-8 xl:h-8`}>
                          <img src={EditIcon} alt="Habilita a atribuição de uma data a vacina selecionada." className="xl:w-auto xl:h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

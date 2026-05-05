import BabySad from "../../assets/baby_sad.png"
import Erro404 from "../../assets/404.svg"
import { useNavigate } from "react-router-dom"

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="w-screen h-screen bg-linear-to-b from-light to-lilas-bg pt-12
        xl:flex xl:pt-0">
            <div className="relative flex justify-center items-center w-full h-2/4 
            md:p-14
            xl:w-[60%] xl:h-full">
                <img src={Erro404} alt="" className="w-[70vh]" />
                <img src={BabySad} alt="Bebê brincando com seus brinquedos espalhados pelo chão." className="absolute bottom-15 
                md:-bottom-5 md:w-[80%]
                xl:bottom-auto xl:mt-20 xl:w-[60%]" />
            </div>
            <section className="flex flex-col items-center justify-evenly h-[40%]
            md:h-[50%]
            xl:w-[40%] xl:h-full xl:justify-center xl:gap-24">
                <div className="flex flex-col items-center w-full gap-3
                xl:gap-10">
                    <h1 className="text-darker-purple font-poppins font-bold text-4xl text-center w-[80%]
                    md:text-[3.5rem]
                    xl:w-full">Ops! <br /> Cadê a página?</h1>
                    <p className="text-primary font-nunito font-semibold w-[80%] text-center italic
                    md:text-[1.9rem]
                    xl:w-full">Pareçe que essa página foi parar na caixa de brinquedos.</p>
                </div>
                <button onClick={() => navigate(-1)} className="flex justify-evenly items-center w-60 h-13 bg-accent rounded-lg font-poppins shadow-purple-sm
                md:w-78 md:h-15
                xl:hover:scale-102 xl:hover:shadow-purple-md xl:trasition xl:duration-400">
                    <span className="text-white font-semibold text-xl
                    md:text-2xl">Página anterior</span>
                </button>
            </section>
        </div >
    )
}

export default NotFound
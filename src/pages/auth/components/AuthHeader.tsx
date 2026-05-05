import backIcon from "../../../assets/BackIcon.svg";
import logoAside from "../../../assets/logoAside.svg";
import { useNavigate } from "react-router-dom";

export function AuthHeader() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/");
  };
  return (
    <header className="bg-primary h-50 p-4 w-full md:h-80 xl:hidden">
      <button
        onClick={handleVoltar}
        className="absolute top-4 left-4 hover:opacity-80 transition-opacity"
        aria-label="Voltar para a página inicial"
      >
        <img src={backIcon} alt="Icone de voltar" />
      </button>
      <div className="w-full flex justify-center gap-4 pt-8">
        <img src={logoAside} alt="Logo Syncrobaby" className="w-20 md:w-35" />
        <h1 className="text-5xl font-poppins text-darker-purple md:text-7xl">
          Syncro
          <p className="pl-10 md:pl-16">baby</p>
        </h1>
      </div>
    </header>
  );
}

import backIcon from "../../../assets/BackIcon.svg";
import logoAside from "../../../assets/logoAside.svg";
import { useNavigate } from "react-router-dom";

export function AuthHeader() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/");
  };
  return (
    <header className="flex bg-primary h-50 p-4 w-full md:h-80 xl:hidden">
      <button
        onClick={handleVoltar}
        className="absolute top-4 left-4 hover:opacity-80 transition-opacity"
        aria-label="Voltar para a página inicial"
      >
        <img src={backIcon} alt="Icone de voltar" />
      </button>
      <div className="w-full flex justify-center items-center grow">
        <img src={logoAside} alt="Logo Syncrobaby" className="w-30 md:w-52" />
      </div>
    </header>
  );
}

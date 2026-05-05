import logoAside from "../../assets/logoAside.svg";
import infoIcon from "../../assets/infoIcon.svg";
import playStoreIcon from "../../assets/playStoreIcon.svg";
import appleStoreIcon from "../../assets/appleStoreIcon.svg";
import familyImg from "../../assets/familyImg.png";

import { BtnPrimary } from "../../components/BtnPrimary";
import { BtnDowload } from "./components/BtnDowload";
import { useNavigate } from "react-router-dom";

export function Presentaion() {
  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate("/login");
  };

  const handleToRegister = () => {
    navigate("/register");
  };

  return (
    <main className=" flex flex-col h-screen w-screen gap-4 p-6 md:p-8 md:pb-16 md:justify-start lg:justify-start lg:gap-20">
      <div className=" flex items-center justify-between w-full h-20">
        <div className=" flex items-center gap-2">
          <img src={logoAside} alt="logo-syncrobaby" className="w-10 h-13" />
          <p className="text-dark-purple font-poppins font-bold">SYNCROBABY</p>
        </div>
        <div className="flex gap-4">
          <BtnPrimary
            text="Cadastre-se"
            className="hidden lg:block bg-lilas text-dark-purple font-poppins shadow-md hover:shadow-lg transition-shadow"
            onClick={handleToRegister}
          />
          <BtnPrimary
            text="Entrar"
            className="bg-accent text-white font-poppins shadow-md hover:shadow-lg transition-shadow"
            onClick={handleToLogin}
          />
        </div>
      </div>
      <div className=" w-full h-[80dvh] flex flex-col justify-around gap-4 md:gap-12 md:items-center lg:items-center lg:h-[85vh] xl:h-[calc(100%-80px)] xl:flex-row">
        <div className="infos flex flex-col items-centerjustify-center gap-5 w-full h-40 md:gap-10 lg:items-start xl:w-[60%] xl:h-full xl:justify-start xl:pt-10">
          <h1 className="font-boldfont-poppins text-4xl text-center md:text-5xl lg:flex lg:items-center lg:text-6xl lg:gap-2 xl:text-4xl">
            O QUE É A
            <p className="text-primary font-bold font-poppins text-4xl md:text-6xl xl:text-5xl">
              SYNCROBABY?
            </p>
          </h1>

          <p className="font-nunito text-[90%] text-center md:text-3xl md:w-full lg:w-full lg:text-3xl lg:text-start">
            Um aplicativo que organiza a rotina das crianças de forma leve e
            acolhedora, promovendo o cuidado e harmonia em familia
          </p>

          <div className="hidden lg:flex">
            <BtnPrimary
              text="Saiba mais"
              className="hidden lg:block bg-accent text-white w-50 font-poppins shadow-md hover:shadow-lg transition-shadow"
            />
          </div>
        </div>

        <div className="card-syncro rounded-md p-12 md:py-25 flex items-center justify-center w-full lg:hidden">
          <img src={infoIcon} alt="info" />
        </div>

        <div className=" flex flex-col mt-5 items-center justify-center w-full gap-3 lg:hidden">
          <BtnDowload
            icon={playStoreIcon}
            className={[
              "bg-black w-[75%] rounded-md items-center justify-center flex gap-2",
            ]}
            mainText="Baixe na"
            secundaryText="Play Store"
          />
          <BtnDowload
            icon={appleStoreIcon}
            className={[
              "bg-black w-[75%] rounded-md items-center justify-center flex gap-2",
            ]}
            mainText="Baixe na"
            secundaryText="App Store"
          />
        </div>

        <div className="hidden lg:flex mt-10 h-full xl:bgblue-400 xl:w-auto">
          <img src={familyImg} alt="family image" />
        </div>
      </div>
    </main>
  );
}

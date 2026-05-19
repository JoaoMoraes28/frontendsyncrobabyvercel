import BabySad from "../assets/baby_sad.png";
import Erro404 from "../assets/404.svg";

export interface EmptyStateProps {
  title: React.ReactNode;
  description: React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  show404Background?: boolean;
  isFullPage?: boolean;
}

export function EmptyState({
  title,
  description,
  buttonText,
  onButtonClick,
  show404Background = false,
  isFullPage = false,
}: EmptyStateProps) {
  if (isFullPage) {
    return (
      <div className="w-screen h-screen bg-linear-to-b from-light to-lilas-bg pt-12 xl:flex xl:pt-0">
        <div className="relative flex justify-center items-center w-full h-2/4 md:p-14 xl:w-[60%] xl:h-full">
          {show404Background && (
            <img src={Erro404} alt="" className="w-[70vh]" />
          )}
          <img
            src={BabySad}
            alt="Bebê triste"
            className="absolute bottom-15 md:-bottom-5 md:w-[80%] xl:bottom-auto xl:mt-20 xl:w-[60%]"
          />
        </div>
        <section className="flex flex-col items-center justify-evenly h-[40%] md:h-[50%] xl:w-[40%] xl:h-full xl:justify-center xl:gap-24">
          <div className="flex flex-col items-center w-full gap-3 xl:gap-10">
            <h1 className="text-darker-purple font-poppins font-bold text-4xl text-center w-[80%] md:text-[3.5rem] xl:w-full">
              {title}
            </h1>
            <p className="text-primary font-nunito font-semibold w-[80%] text-center italic md:text-[1.9rem] xl:w-full">
              {description}
            </p>
          </div>
          <button
            onClick={onButtonClick}
            className="flex justify-evenly items-center w-60 h-13 bg-accent rounded-lg font-poppins shadow-purple-sm md:w-78 md:h-15 xl:hover:scale-102 xl:hover:shadow-purple-md xl:transition xl:duration-400"
          >
            <span className="text-white font-semibold text-xl md:text-2xl">
              {buttonText}
            </span>
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center col-span-full py-12 gap-8">
      <div className="relative flex justify-center items-center w-full max-w-[200px] md:max-w-[250px]">
        {show404Background && (
          <img
            src={Erro404}
            alt=""
            className="absolute w-full opacity-40 z-0"
          />
        )}
        <img src={BabySad} alt="Bebê triste" className="w-full z-10" />
      </div>
      <div className="flex flex-col items-center gap-2 w-full max-w-[90%] md:max-w-[600px]">
        <h1 className="text-darker-purple font-poppins font-bold text-2xl md:text-3xl text-center">
          {title}
        </h1>
        <p className="text-primary font-nunito font-semibold text-base md:text-[1.15rem] text-center italic">
          {description}
        </p>
      </div>
      <button
        onClick={onButtonClick}
        className="flex justify-center items-center w-60 h-12 bg-accent rounded-lg font-poppins shadow-purple-sm md:w-72 md:h-14 hover:scale-102 hover:shadow-purple-md transition duration-400"
      >
        <span className="text-white font-semibold text-lg md:text-xl">
          {buttonText}
        </span>
      </button>
    </div>
  );
}

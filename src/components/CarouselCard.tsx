import { useNavigate } from "react-router-dom";

interface CardPrincipalProps {
  id: number;
  textPre: string;
  textHighlight: string;
  description?: string;
  img: string;
}

export function CardPrincipal({
  textPre,
  textHighlight,
  description,
  img,
}: CardPrincipalProps) {
  const navigate = useNavigate();

  return (
    <div className="min-w-full h-40 flex items-center justify-between bg-lilas rounded-2xl p-6 md:p-8 xl:p-10 snap-center relative overflow-hidden md:min-h-55 xl:min-h-75">
      <div className="flex flex-col justify-center gap-2 md:gap-3 w-full md:w-[65%] z-10">
        <span className="hidden md:flex bg-lilas text-primary text-[10px] md:text-xs font-bold px-3 py-1 rounded-full w-max mb-1">
          Destaque da Semana
        </span>

        <h2 className="text-lg md:text-2xl xl:text-3xl font-extrabold text-primary-text uppercase leading-tight font-poppins">
          {textPre} <span className="text-primary">{textHighlight}</span>
        </h2>

        {description && (
          <p className="hidden md:block text-primary-text text-sm xl:text-base font-poppins mt-1 max-w-[95%] line-clamp-3">
            {description}
          </p>
        )}

        <button
          onClick={() => navigate("/articles")}
          className="hidden md:flex w-max bg-primary text-white font-poppins font-bold text-sm px-8 py-2.5 rounded-lg mt-2 hover:bg-primary/90 transition-colors shadow-md"
        >
          Ler o artigo Completo
        </button>
      </div>

      <div className="w-[35%] md:w-[30%] flex justify-end items-center z-10">
        <img
          src={img}
          alt="Ilustração do artigo"
          className="w-full max-w-30 md:max-w-45 xl:max-w-55 object-contain"
        />
      </div>
    </div>
  );
}

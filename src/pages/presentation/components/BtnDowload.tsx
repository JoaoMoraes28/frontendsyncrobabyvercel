interface BtnDowloadProps {
  icon?: string;
  className?: string[];
  mainText?: string;
  secundaryText?: string;
}

export function BtnDowload({
  icon,
  className,
  mainText,
  secundaryText,
}: BtnDowloadProps) {
  const treatedClasses = Array.isArray(className)
    ? className.join(" ")
    : className;

  return (
    <button className={`${treatedClasses}`}>
      <div className="items-center">
        <img src={icon} alt="logo-play-store" className="" />
      </div>
      <div className="py-1">
        <span className=" font-light font-poppins text-sm text-white">
          {mainText}
        </span>
        <p className="font-semibold font-poppins text-[18px] text-white">
          {secundaryText}
        </p>
      </div>
    </button>
  );
}

interface CategoryItemProps {
  title: string;
  icon: string;
  onClick: () => void;
}

export function CategoryItem({ title, icon, onClick }: CategoryItemProps) {
  return (
    <div className="w-10 md:w-14 flex items-center justify-center flex-col">
      <div
        className="bg-primary flex flex-col items-center justify-center rounded-lg cursor-pointer w-10 h-10 md:w-14 md:h-14 hover:opacity-90 transition-opacity"
        onClick={onClick}
      >
        <img src={icon} alt={title} className="md:w-8 md:h-8" />
      </div>
      <span className="text-[10px] md:text-sm font-bold font-nunito text-primary-text mt-1 text-center">
        {title}
      </span>
    </div>
  );
}

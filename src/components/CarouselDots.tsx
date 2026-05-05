interface CarouselDotsProps {
  activeIndex: number;
  total: number;
}

export function CarouselDots({ activeIndex, total }: CarouselDotsProps) {
  const dots = Array.from({ length: total });

  return (
    <div className="flex gap-2 mt-2">
      {dots.map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            activeIndex === index ? "w-4 bg-primary" : "w-2 bg-lilas-medium"
          }`}
        />
      ))}
    </div>
  );
}

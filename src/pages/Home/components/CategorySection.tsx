import { CategoryItem } from "./CategoryItem";

interface Category {
  id: number;
  title: string;
  icon: string;
  path: string;
}

interface CategorySectionProps {
  categories: Category[];
  onCategoryClick: (title: string) => void;
}

export function CategorySection({
  categories,
  onCategoryClick,
}: CategorySectionProps) {
  return (
    <div className="w-full">
      <h3 className="text-xl md:text-2xl font-bold font-poppins text-primary-text">
        Categorias
      </h3>

      <div className="w-full flex justify-between md:justify-center md:gap-8 mt-3 md:mt-6">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            title={category.title}
            icon={category.icon}
            onClick={() => onCategoryClick(category.path)}
          />
        ))}
      </div>
    </div>
  );
}

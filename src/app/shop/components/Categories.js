import { CATEGORIES } from '../constants';

export default function Categories({ onCategoryClick }) {
  return (
    <div className="px-4 mt-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900">
        Categories
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick?.(category)}
            className="flex flex-col items-center p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow border border-white/50"
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <span className="text-xs text-gray-700 font-medium">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
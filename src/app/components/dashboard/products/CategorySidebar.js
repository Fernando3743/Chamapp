'use client';

const categories = [
  { name: 'All Categories', icon: '🎯', count: 248, active: true },
  { name: 'Hair Care', icon: '💇', count: 56 },
  { name: 'Nail Services', icon: '💅', count: 34 },
  { name: 'Spa & Massage', icon: '🧖', count: 45 },
  { name: 'Cosmetics', icon: '💄', count: 67 },
  { name: 'Fitness', icon: '🏋️', count: 28 },
  { name: 'Health Services', icon: '🩺', count: 18 }
];

export default function CategorySidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <aside className="w-full lg:w-[280px] flex-shrink-0">
      <div className="glass backdrop-blur-20 rounded-2xl p-6 lg:sticky lg:top-5 bg-white/5 border border-white/10">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold">Categories</h3>
          <button className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-base">
            +
          </button>
        </div>
        <div className="space-y-1">
          {categories.map((category) => (
            <div 
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-3 rounded-xl flex justify-between items-center cursor-pointer transition-all ${
                selectedCategory === category.name 
                  ? 'bg-violet-600/20 text-white' 
                  : 'hover:bg-white/5 text-white/80 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <span>{category.icon}</span> {category.name}
              </span>
              <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full">{category.count}</span>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-base font-semibold mb-5">Quick Stats</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60">Active Items</span>
              <span className="font-semibold">212</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60">Out of Stock</span>
              <span className="font-semibold">14</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60">Services</span>
              <span className="font-semibold">85</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60">Products</span>
              <span className="font-semibold">163</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
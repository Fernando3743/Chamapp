'use client';

export default function ProductList({ 
  products, 
  onEdit, 
  onDelete, 
  onDuplicate 
}) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="glass backdrop-blur-20 rounded-2xl p-5 flex gap-5 items-center hover:translate-x-1 hover:shadow-lg hover:shadow-violet-500/20 transition-all bg-white/5 border border-white/10">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
            {product.icon}
          </div>
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-5 items-center">
            <div>
              <div className="font-semibold">{product.name}</div>
              <div className="text-sm text-white/60">{product.category}</div>
            </div>
            <div className="text-lg font-semibold">${product.price}</div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-sm">
                {product.type === 'product' ? `${product.stock} in stock` : 'Active'}
              </span>
            </div>
            <div className="text-sm text-white/60">⭐ {product.rating} ({product.reviews})</div>
            <div className="flex gap-2">
              <button 
                onClick={() => onEdit(product)}
                className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-sm"
              >
                ✏️
              </button>
              <button 
                onClick={() => onDuplicate(product)}
                className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-sm"
              >
                📋
              </button>
              <button 
                onClick={() => onDelete(product.id)}
                className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-sm"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
'use client';

export default function ProductCard({ product, onEdit, onDelete, onDuplicate }) {
  return (
    <div className="glass backdrop-blur-20 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/20 transition-all cursor-pointer bg-white/5 border border-white/10">
      <div className="h-48 bg-gradient-to-br from-violet-600/20 to-purple-600/20 flex items-center justify-center text-6xl relative">
        {product.icon}
        {product.badge && (
          <span className={`absolute top-4 right-4 px-3 py-1 ${product.badgeColor || 'bg-blue-500'} text-white text-xs rounded-full font-semibold`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2.5">
          <div>
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-sm text-white/60">{product.category}</p>
          </div>
          <div className="text-2xl font-bold gradient-text">${product.price}</div>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
          <span className="text-sm text-white/60 flex items-center gap-1">
            {product.type === 'product' ? (
              <>
                <span>📦</span> {product.stock} in stock
              </>
            ) : (
              <>
                <span>📅</span> {product.duration}
              </>
            )}
          </span>
          <span className="text-sm text-white/60 flex items-center gap-1">
            <span>⭐</span> {product.rating} ({product.reviews})
          </span>
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
              className="action-btn w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-sm"
              title="Edit"
            >
              ✏️
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate(product);
              }}
              className="action-btn w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-sm"
              title="Duplicate"
            >
              📋
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id);
              }}
              className="action-btn w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-sm"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
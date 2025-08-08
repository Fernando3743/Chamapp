'use client';

import ProductCard from './ProductCard';

export default function ProductGrid({ 
  products, 
  onEdit, 
  onDelete, 
  onDuplicate 
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'}}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      ))}
    </div>
  );
}
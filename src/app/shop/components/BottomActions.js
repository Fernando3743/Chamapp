export default function BottomActions({ onBuyNow, onAddToCart }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4">
      <div className="flex gap-3">
        <button 
          onClick={onBuyNow}
          className="flex-1 bg-white border border-gray-300 text-black py-3 rounded-full font-medium shadow-lg"
        >
          Buy Now
        </button>
        <button 
          onClick={onAddToCart}
          className="flex-1 bg-blue-600 text-white py-3 rounded-full font-medium shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
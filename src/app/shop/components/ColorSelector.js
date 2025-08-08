export default function ColorSelector({ colors, selectedColor, onSelectColor }) {
  return (
    <div className="px-4 py-4">
      <h3 className="text-base font-medium text-gray-700 mb-3">Color</h3>
      <div className="grid grid-cols-2 gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onSelectColor(color.name)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-full border ${
              selectedColor === color.name
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div 
              className="w-9 h-9 rounded-full border border-gray-300"
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-sm text-gray-700">{color.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
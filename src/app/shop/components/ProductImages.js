export default function ProductImages({ images, selectedImage, onSelectImage }) {
  return (
    <div>
      <div className="flex justify-center py-8">
        <div className="relative w-48 h-64 flex items-center justify-center">
          {/* White iPhone */}
          <div className="absolute left-0 w-24 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg"></div>
          {/* Black iPhone */}
          <div className="absolute right-0 w-24 h-32 bg-gray-900 rounded-2xl shadow-lg"></div>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex justify-center gap-3 pb-6">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => onSelectImage(index)}
            className={`w-14 h-14 rounded-lg overflow-hidden border-2 ${
              selectedImage === index
                ? "border-blue-600"
                : "border-gray-200"
            }`}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
          </button>
        ))}
      </div>
    </div>
  );
}
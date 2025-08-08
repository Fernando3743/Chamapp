export default function StorageSelector({ options, selectedStorage, onSelectStorage }) {
  return (
    <div className="px-4 py-4">
      <h3 className="text-base font-medium text-gray-700 mb-3">Storage</h3>
      <div className="flex gap-3">
        {options.map((storage) => (
          <button
            key={storage}
            onClick={() => onSelectStorage(storage)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
              selectedStorage === storage
                ? "border-blue-600 text-blue-600 bg-white"
                : "border-gray-300 text-gray-700 bg-white"
            }`}
          >
            {storage}
          </button>
        ))}
      </div>
    </div>
  );
}
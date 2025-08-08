export default function SnapshotView({ features }) {
  return (
    <div className="px-4 py-4">
      <h3 className="text-base font-medium text-gray-700 mb-3">
        A Snapshot View
      </h3>
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center">
              <span className="text-xs text-gray-400">✓</span>
            </div>
            <p className="text-sm text-gray-600">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
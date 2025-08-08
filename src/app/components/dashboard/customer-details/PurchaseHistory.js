"use client";

export default function PurchaseHistory({ purchases }) {
  return (
    <div className="glass border border-white/20 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Purchase History</h3>
      </div>
      <div className="space-y-4">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="bg-white/5 rounded-2xl p-5 flex justify-between items-center hover:bg-white/8 hover:translate-x-1 transition-all"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-2xl">
                {purchase.icon}
              </div>
              <div>
                <h4 className="text-base font-medium">{purchase.name}</h4>
                <span className="text-sm text-white/70">{purchase.date}</span>
              </div>
            </div>
            <div className="text-xl font-bold gradient-text">
              ${purchase.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
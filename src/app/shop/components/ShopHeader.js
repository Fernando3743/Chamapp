import CartBadge from "./CartBadge";

export default function ShopHeader({ cartCount = 0 }) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 px-4 py-3 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <button className="p-1.5">
          <div className="bg-white rounded-full p-2">
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </button>

        <div className="flex-1 mx-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 pl-10 bg-white border border-blue-100 rounded-full text-sm focus:outline-none placeholder-gray-500"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <button className="p-1.5">
          <div className="bg-white rounded-full p-2 relative">
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <CartBadge count={cartCount} />
          </div>
        </button>
      </div>
    </header>
  );
}
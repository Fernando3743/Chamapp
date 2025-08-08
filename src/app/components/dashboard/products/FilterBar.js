'use client';

export default function FilterBar({ 
  filterStatus, 
  setFilterStatus, 
  sortBy, 
  setSortBy, 
  viewMode, 
  setViewMode 
}) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
      <div className="flex flex-wrap gap-3">
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 glass backdrop-blur-20 rounded-xl cursor-pointer hover:bg-white/10 transition-all bg-white/5 border border-white/10"
        >
          <option value="all">All Products</option>
          <option value="products">Products Only</option>
          <option value="services">Services Only</option>
        </select>
        <select className="px-4 py-2.5 glass backdrop-blur-20 rounded-xl cursor-pointer hover:bg-white/10 transition-all bg-white/5 border border-white/10">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Out of Stock</option>
        </select>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 glass backdrop-blur-20 rounded-xl cursor-pointer hover:bg-white/10 transition-all bg-white/5 border border-white/10"
        >
          <option value="name">Sort by: Name</option>
          <option value="priceLow">Sort by: Price (Low to High)</option>
          <option value="priceHigh">Sort by: Price (High to Low)</option>
          <option value="stock">Sort by: Stock</option>
          <option value="date">Sort by: Date Added</option>
        </select>
      </div>
      <div className="flex gap-1 glass backdrop-blur-20 p-1.5 rounded-xl bg-white/5">
        <button 
          onClick={() => setViewMode('grid')}
          className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-violet-600/20 text-white' : 'text-white/60 hover:text-white'}`}
        >
          ⊞
        </button>
        <button 
          onClick={() => setViewMode('list')}
          className={`px-3 py-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-violet-600/20 text-white' : 'text-white/60 hover:text-white'}`}
        >
          ☰
        </button>
      </div>
    </div>
  );
}
export default function CartBadge({ count = 0 }) {
  if (count === 0) return null;
  
  return (
    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
      {count > 99 ? '99+' : count}
    </span>
  );
}
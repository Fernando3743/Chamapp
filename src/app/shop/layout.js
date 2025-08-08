import { CartProvider } from "./contexts/CartContext";

export default function ShopLayout({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
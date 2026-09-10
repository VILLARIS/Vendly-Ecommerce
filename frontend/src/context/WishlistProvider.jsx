import { useEffect, useState } from "react";
import { WishlistContext } from "./wishlistContext";

const STORAGE_KEY = "vendly:wishlist";

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const count = items.length;

  const isFavorite = (id) => items.some((item) => item.id === id);

  const toggleItem = (product) =>
    setItems((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product],
    );

  const clearAll = () => setItems([]);

  return (
    <WishlistContext.Provider value={{ items, count, isFavorite, toggleItem, clearAll }}>
      {children}
    </WishlistContext.Provider>
  );
}
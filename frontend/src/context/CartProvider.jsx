import { useEffect, useMemo, useState } from "react";
import { CartContext } from "./cartContext";

const STORAGE_KEY = "vendly:cart";

function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const addItem = (item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + quantity } : entry,
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, quantity: Math.max(1, quantity) } : entry,
      ),
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((entry) => entry.id !== id));
  };

  const clearCart = () => setItems([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const value = useMemo(() => {
    const count = items.reduce((sum, entry) => sum + entry.quantity, 0);
    const subtotal = items.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
    return {
      items,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
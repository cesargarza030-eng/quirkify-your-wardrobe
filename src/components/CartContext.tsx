import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/lib/products";

type CartItem = { product: Product; size: string; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, size: string) => void;
  remove: (id: string, size: string) => void;
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const add = (p: Product, size: string) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.product.id === p.id && x.size === size);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
        return copy;
      }
      return [...prev, { product: p, size, qty: 1 }];
    });
    setOpen(true);
  };

  const remove = (id: string, size: string) =>
    setItems((prev) => prev.filter((x) => !(x.product.id === id && x.size === size)));

  const count = items.reduce((a, x) => a + x.qty, 0);
  const total = items.reduce((a, x) => a + x.qty * x.product.price, 0);

  return (
    <Ctx.Provider value={{ items, add, remove, count, total, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("CartProvider missing");
  return c;
};

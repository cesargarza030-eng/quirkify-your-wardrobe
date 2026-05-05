import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartContext";

const SIZES = ["S", "M", "L", "XL"];

export function ProductCard({ p, accent }: { p: Product; accent: "zap" | "shock" | "ink" }) {
  const { add } = useCart();
  const [size, setSize] = useState("M");
  const shadow =
    accent === "zap"
      ? "group-hover:shadow-brutal-zap"
      : accent === "shock"
        ? "group-hover:shadow-brutal-shock"
        : "group-hover:shadow-brutal-lg";

  return (
    <div className="group relative">
      {p.badge && (
        <span className="absolute -top-3 -right-3 z-10 rotate-6 border-2 border-ink bg-shock px-3 py-1 font-display text-sm uppercase text-bone shadow-brutal-sm">
          {p.badge}
        </span>
      )}
      <div
        className={`relative aspect-square overflow-hidden border-4 border-ink bg-cream shadow-brutal transition-all duration-200 ${shadow}`}
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-xl uppercase leading-tight">{p.name}</h3>
          <p className="text-xs font-bold uppercase opacity-60">{p.color}</p>
          <p className="mt-1 text-xs italic opacity-70">"{p.tagline}"</p>
        </div>
        <span className="font-display text-2xl">${p.price}</span>
      </div>
      <div className="mt-3 flex gap-1">
        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`h-8 w-8 border-2 border-ink text-xs font-bold transition-colors ${
              size === s ? "bg-ink text-bone" : "bg-white hover:bg-zap"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <button
        onClick={() => add(p, size)}
        className="mt-3 w-full border-2 border-ink bg-zap py-3 font-display text-lg uppercase shadow-brutal-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      >
        Add to Cart +
      </button>
    </div>
  );
}

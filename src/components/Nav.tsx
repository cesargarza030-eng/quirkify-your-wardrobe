import { useCart } from "./CartContext";

export function Nav() {
  const { count, setOpen } = useCart();
  return (
    <nav className="sticky top-0 z-40 border-b-4 border-ink bg-bone">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <a href="#top" className="font-display text-2xl uppercase tracking-tighter md:text-3xl">
          Clown Corps<span className="text-shock">.</span>
        </a>
        <div className="hidden gap-8 text-xs font-bold uppercase tracking-widest md:flex">
          <a href="#shop" className="transition-colors hover:text-shock">Shop</a>
          <a href="#manifesto" className="transition-colors hover:text-shock">Manifesto</a>
          <a href="#reviews" className="transition-colors hover:text-shock">Reviews</a>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="border-2 border-ink bg-zap px-4 py-2 text-sm font-bold uppercase shadow-brutal-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          Cart ({count})
        </button>
      </div>
    </nav>
  );
}

import { Link } from "@tanstack/react-router";
import { useCart } from "./CartContext";

export function Nav() {
  const { count, setOpen } = useCart();
  return (
    <nav className="sticky top-0 z-40 border-b-4 border-ink bg-bone">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <Link to="/" className="font-display text-2xl uppercase tracking-tighter md:text-3xl">
          Clown Corps<span className="text-shock">.</span>
        </Link>
        <div className="hidden gap-8 text-xs font-bold uppercase tracking-widest md:flex">
          <Link to="/" hash="shop" className="transition-colors hover:text-shock">Shop</Link>
          <Link to="/" hash="manifesto" className="transition-colors hover:text-shock">Manifesto</Link>
          <Link to="/" hash="reviews" className="transition-colors hover:text-shock">Reviews</Link>
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

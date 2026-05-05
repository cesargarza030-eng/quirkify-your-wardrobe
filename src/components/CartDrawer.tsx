import { useCart } from "./CartContext";

export function CartDrawer() {
  const { items, remove, total, open, setOpen } = useCart();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-ink/60"
        onClick={() => setOpen(false)}
      />
      <aside className="relative flex h-full w-full max-w-md flex-col border-l-4 border-ink bg-bone">
        <header className="flex items-center justify-between border-b-4 border-ink px-6 py-4">
          <h2 className="font-display text-3xl uppercase">Your Cart</h2>
          <button
            onClick={() => setOpen(false)}
            className="border-2 border-ink bg-zap px-3 py-1 text-sm font-bold uppercase shadow-brutal-sm"
          >
            Close
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="font-bold uppercase opacity-60">
              Empty. Like your weekend plans.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li
                  key={it.product.id + it.size}
                  className="flex items-center gap-4 border-2 border-ink bg-white p-3"
                >
                  <img
                    src={it.product.image}
                    alt={it.product.name}
                    className="h-20 w-20 border-2 border-ink object-cover"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-display text-lg uppercase leading-tight">
                      {it.product.name}
                    </p>
                    <p className="font-bold uppercase opacity-60">
                      Size {it.size} · Qty {it.qty}
                    </p>
                    <p className="font-bold">${it.product.price * it.qty}</p>
                  </div>
                  <button
                    onClick={() => remove(it.product.id, it.size)}
                    className="text-xs font-bold uppercase underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <footer className="border-t-4 border-ink p-6">
          <div className="mb-4 flex items-center justify-between font-bold uppercase">
            <span>Subtotal</span>
            <span className="font-display text-2xl">${total}</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full border-2 border-ink bg-shock px-6 py-4 font-display text-2xl uppercase text-bone shadow-brutal transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50"
          >
            Checkout →
          </button>
          <p className="mt-2 text-center text-[10px] font-bold uppercase opacity-50">
            Free shipping over $60. No returns on bad decisions.
          </p>
        </footer>
      </aside>
    </div>
  );
}

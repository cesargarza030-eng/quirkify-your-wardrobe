import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/components/CartContext";
import { products, type Product } from "@/lib/products";

const SIZES = ["S", "M", "L", "XL"] as const;
const ACCENTS = ["zap", "shock", "ink"] as const;

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: p ? `${p.name} — Clown Corps` : "Tee — Clown Corps" },
        {
          name: "description",
          content: p
            ? `${p.tagline} 240gsm heavyweight cotton. Limited drop. Free US shipping over $60.`
            : "Limited drop tee from Clown Corps.",
        },
        { property: "og:title", content: p?.name ?? "Clown Corps" },
        { property: "og:description", content: p?.tagline ?? "" },
        ...(p?.image ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-bone">
      <Nav />
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-6xl uppercase">404 / Sold Out</h1>
        <p className="mt-4 font-bold uppercase opacity-70">
          This bad idea has left the building.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block border-4 border-ink bg-zap px-8 py-4 font-display text-2xl uppercase shadow-brutal-sm"
        >
          Back to the Drop
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-bone p-12 text-center">
      <p className="font-bold uppercase">Something broke: {error.message}</p>
    </div>
  ),
  component: ProductPage,
});

const REVIEWS = [
  { stars: 5, q: "Got 4 compliments before lunch. Wearing it again tomorrow.", n: "Casey M. · Verified Buyer" },
  { stars: 5, q: "Fits like a hug from a stranger you actually like.", n: "Morgan T. · Verified Buyer" },
  { stars: 5, q: "Cotton is THICC. No see-through nipple situation.", n: "Jordan P. · Verified Buyer" },
  { stars: 4, q: "Star removed because now I have to do laundry more.", n: "Alex R. · Verified Buyer" },
];

const FAQ = [
  { q: "How does it fit?", a: "True to size, slightly boxy. Size up for an oversized fit. We are not the boss of you." },
  { q: "When will it ship?", a: "Within 48 hours. Free US shipping over $60. International: 7–14 business days." },
  { q: "Returns?", a: "Free returns within 30 days. Tags on, no mystery stains, please." },
  { q: "Is this ethically made?", a: "Yes. 240gsm ringspun cotton, printed in small batches in a real garage in Portland." },
];

function StarRow({ n }: { n: number }) {
  return (
    <span className="text-shock">
      {"★".repeat(n)}
      <span className="opacity-30">{"★".repeat(5 - n)}</span>
    </span>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-bone">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=IBM+Plex+Mono:wght@400;500;700&display=swap"
      />
      <Nav />
      <Buy product={product} />
      <ValueProps />
      <Details product={product} />
      <Reviews />
      <Faq />
      <Related current={product} />
    </div>
  );
}

function Buy({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const [size, setSize] = useState<(typeof SIZES)[number]>("M");
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(product, size);
  };
  const handleBuyNow = () => {
    handleAdd();
    setOpen(true);
  };

  return (
    <section className="border-b-4 border-ink bg-bone px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-6 flex items-center gap-2 text-xs font-bold uppercase opacity-60">
          <Link to="/" className="hover:text-shock">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden border-4 border-ink bg-cream shadow-brutal">
              {product.badge && (
                <span className="absolute left-4 top-4 z-10 -rotate-3 border-2 border-ink bg-shock px-3 py-1 font-display text-sm uppercase text-bone shadow-brutal-sm">
                  {product.badge}
                </span>
              )}
              <span className="absolute right-4 top-4 z-10 rotate-3 border-2 border-ink bg-zap px-3 py-1 font-display text-sm uppercase shadow-brutal-sm">
                Drop 04
              </span>
              <img
                src={product.image}
                alt={product.name}
                width={1200}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((src, i) => (
                <div
                  key={i}
                  className={`aspect-square overflow-hidden border-2 border-ink bg-cream ${i === 0 ? "ring-4 ring-shock" : "opacity-70"}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="md:pt-2">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60">
              {product.color}
            </p>
            <h1 className="mt-1 font-display text-4xl uppercase leading-[0.95] md:text-6xl">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <StarRow n={5} />
              <span className="text-xs font-bold uppercase opacity-60">
                4.9 · 1,284 reviews
              </span>
            </div>
            <p className="mt-4 max-w-md text-base font-bold italic opacity-80">
              "{product.tagline}"
            </p>

            <div className="mt-6 flex items-end gap-3">
              <span className="font-display text-5xl">${product.price}</span>
              <span className="font-bold uppercase line-through opacity-40">
                ${product.price + 12}
              </span>
              <span className="border-2 border-ink bg-zap px-2 py-1 text-xs font-bold uppercase shadow-brutal-sm">
                Save ${12}
              </span>
            </div>
            <p className="mt-1 text-xs font-bold uppercase opacity-60">
              Or 4 × ${(product.price / 4).toFixed(2)} interest-free
            </p>

            {/* Urgency */}
            <div className="mt-6 flex flex-wrap items-center gap-2 border-2 border-ink bg-zap px-3 py-2 text-xs font-bold uppercase shadow-brutal-sm">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-shock" />
              Only 27 left in this drop · 18 people viewing now
            </div>

            {/* Size */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase">
                <span>Size: {size}</span>
                <button className="underline opacity-70 hover:opacity-100">
                  Size guide
                </button>
              </div>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-12 w-12 border-2 border-ink font-display text-lg transition-all ${
                      size === s
                        ? "bg-ink text-bone shadow-brutal-sm"
                        : "bg-white hover:bg-zap"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-bold uppercase">Quantity</p>
              <div className="inline-flex items-center border-2 border-ink bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="h-12 w-12 font-display text-2xl hover:bg-zap"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-12 text-center font-display text-xl">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="h-12 w-12 font-display text-2xl hover:bg-zap"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 grid gap-3">
              <button
                onClick={handleAdd}
                className="w-full border-4 border-ink bg-zap py-4 font-display text-2xl uppercase shadow-brutal transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
              >
                Add to Cart — ${product.price * qty}
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full border-4 border-ink bg-shock py-4 font-display text-2xl uppercase text-bone shadow-brutal transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
              >
                Buy It Now →
              </button>
            </div>

            {/* Trust */}
            <ul className="mt-6 grid grid-cols-2 gap-2 text-[11px] font-bold uppercase">
              {[
                "Free US shipping over $60",
                "30-day free returns",
                "Ships in 48 hours",
                "Secure checkout",
              ].map((t) => (
                <li
                  key={t}
                  className="border-2 border-ink bg-bone px-2 py-2 shadow-brutal-sm"
                >
                  ✓ {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
  return (
    <section className="border-b-4 border-ink bg-ink px-4 py-6 text-bone md:px-6">
      <div className="mx-auto grid max-w-7xl gap-4 text-center text-xs font-bold uppercase md:grid-cols-4 md:text-sm">
        <div>★ 240gsm Heavy Cotton</div>
        <div>★ Limited to 500 units</div>
        <div>★ Printed in Portland</div>
        <div>★ 1% donated to chaos</div>
      </div>
    </section>
  );
}

function Details({ product }: { product: Product }) {
  return (
    <section className="border-b-4 border-ink bg-cream px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl uppercase md:text-5xl">
            The Goods
          </h2>
          <p className="mt-4 max-w-md text-base font-bold opacity-80">
            The {product.name} is built from 240gsm pre-shrunk ringspun cotton.
            Heavyweight enough to outlive your group chat, soft enough to sleep
            in. Color: <span className="text-shock">{product.color}</span>.
          </p>
          <ul className="mt-6 space-y-2 text-sm font-bold uppercase">
            <li>→ Boxy, true-to-size unisex fit</li>
            <li>→ Reinforced double-stitched neck & hem</li>
            <li>→ Plastisol screen print, will not crack</li>
            <li>→ Machine wash cold, hang dry, no drama</li>
          </ul>
        </div>
        <div className="border-4 border-ink bg-bone p-6 shadow-brutal-sm">
          <h3 className="font-display text-2xl uppercase">Size Guide (inches)</h3>
          <table className="mt-4 w-full text-sm">
            <thead className="border-b-2 border-ink text-left font-display uppercase">
              <tr>
                <th className="py-2">Size</th>
                <th>Chest</th>
                <th>Length</th>
                <th>Sleeve</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {[
                ["S", "20", "27", "8"],
                ["M", "22", "28", "8.5"],
                ["L", "24", "29", "9"],
                ["XL", "26", "30", "9.5"],
              ].map(([s, c, l, sl]) => (
                <tr key={s} className="border-b border-ink/20">
                  <td className="py-2">{s}</td>
                  <td>{c}</td>
                  <td>{l}</td>
                  <td>{sl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="border-b-4 border-ink bg-shock px-4 py-16 text-bone md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl uppercase md:text-5xl">
              The Reviews <span className="text-zap">★★★★★</span>
            </h2>
            <p className="mt-2 text-xs font-bold uppercase opacity-80">
              4.9 / 5 from 1,284 verified menaces
            </p>
          </div>
          <button className="border-2 border-ink bg-bone px-4 py-2 font-display uppercase text-ink shadow-brutal-sm">
            Write a Review
          </button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <blockquote
              key={i}
              className="border-4 border-ink bg-bone p-5 text-ink shadow-brutal-sm"
              style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
            >
              <StarRow n={r.stars} />
              <p className="mt-3 font-display text-lg uppercase leading-tight">
                "{r.q}"
              </p>
              <footer className="mt-3 text-xs font-bold uppercase opacity-60">
                {r.n}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="border-b-4 border-ink bg-bone px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl uppercase md:text-5xl">FAQ</h2>
        <div className="mt-8 divide-y-2 divide-ink border-y-4 border-ink">
          {FAQ.map((f, i) => (
            <details key={i} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between font-display text-xl uppercase">
                {f.q}
                <span className="ml-4 border-2 border-ink bg-zap px-2 font-display text-2xl shadow-brutal-sm group-open:bg-shock group-open:text-bone">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm font-bold opacity-80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Related({ current }: { current: Product }) {
  const others = products.filter((p) => p.id !== current.id).slice(0, 4);
  return (
    <section className="bg-zap px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-4xl uppercase md:text-5xl">
          More Bad Ideas
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-6 md:gap-10 lg:grid-cols-4">
          {others.map((p, i) => (
            <ProductCard key={p.id} p={p} accent={ACCENTS[i % 3]} />
          ))}
        </div>
      </div>
    </section>
  );
}

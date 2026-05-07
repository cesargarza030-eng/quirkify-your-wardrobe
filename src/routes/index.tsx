import { createFileRoute } from "@tanstack/react-router";
import { CartProvider, useCart } from "@/components/CartContext";
import { Nav } from "@/components/Nav";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clown Corps — Funny T-Shirts for Slightly Unhinged People" },
      {
        name: "description",
        content:
          "Quirky, hilarious graphic tees for people who peaked online. Heavyweight cotton, low-stakes humor. Limited drops, free US shipping over $60.",
      },
      { property: "og:title", content: "Clown Corps — Funny T-Shirts" },
      {
        property: "og:description",
        content: "Quirky graphic tees for chronically online humans. Limited drops.",
      },
    ],
  }),
  component: Index,
});

const ACCENTS = ["zap", "shock", "ink"] as const;

const COLLECTIONS = {
  freshGarbage: {
    title: "Fresh Garbage",
    sub: "The current inventory of poor decisions →",
    chip: "6 styles · always selling out",
    bg: "bg-cream",
    ids: ["fine", "grass", "ghost", "overthinker", "banana", "nottoday"],
    cols: 3,
  },
  emotionalDamage: {
    title: "Emotional Damage",
    sub: "Therapy is expensive. Cotton isn't. ←",
    chip: "ships with a free apology",
    bg: "bg-zap",
    ids: ["fine", "overthinker", "ghost", "nottoday"],
    cols: 2,
  },
  hostileWholesome: {
    title: "Hostile & Wholesome",
    sub: "Smiling through the rage. ★",
    chip: "vibes: passive aggressive picnic",
    bg: "bg-bone",
    ids: ["grass", "banana", "nottoday", "fine"],
    cols: 2,
  },
  loudIntroverts: {
    title: "Loud Introverts Club",
    sub: "Screaming silently in cotton. ✕",
    chip: "members only · everyone welcome",
    bg: "bg-shock text-bone",
    ids: ["ghost", "overthinker", "banana", "grass"],
    cols: 2,
  },
} as const;

const REVIEWS = [
  { q: "My therapist asked where I got it.", n: "— Jamie, repeat offender" },
  { q: "Wore this to my ex's wedding. Worth it.", n: "— Sam, drama enthusiast" },
  { q: "10/10 my mom is concerned.", n: "— Riley, certified menace" },
  { q: "Finally a shirt that screams what I'm thinking.", n: "— Devon, loud thinker" },
];

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b-4 border-ink bg-zap"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-28 lg:py-36">
        <div className="mb-6 inline-block -rotate-2 border-2 border-ink bg-bone px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-brutal-sm">
          ★ Drop 04 — Live Now
        </div>
        <h1 className="mx-auto max-w-5xl font-display text-6xl uppercase leading-[0.9] sm:text-7xl md:text-8xl lg:text-[9rem]">
          Wear Your{" "}
          <span className="text-bone [text-shadow:4px_4px_0_var(--ink)]">
            Bad Ideas
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-base font-bold uppercase leading-tight md:text-lg">
          Highly questionable apparel for people who peaked online. Heavyweight
          cotton. Lightweight humor. Zero regrets.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#shop"
            className="border-4 border-ink bg-shock px-10 py-5 font-display text-2xl uppercase text-bone shadow-brutal transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none md:text-3xl"
          >
            Shop the Drop →
          </a>
          <a
            href="#manifesto"
            className="border-4 border-ink bg-bone px-10 py-5 font-display text-2xl uppercase shadow-brutal-sm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none md:text-3xl"
          >
            Read the Lore
          </a>
        </div>
      </div>
      <div className="absolute -top-2 right-4 hidden rotate-12 border-2 border-ink bg-shock px-3 py-1 font-bold uppercase text-bone shadow-brutal-sm md:block">
        100% Cotton-ish
      </div>
      <div className="absolute bottom-6 left-6 hidden -rotate-6 border-2 border-ink bg-ink px-3 py-1 font-bold uppercase text-bone shadow-brutal-sm md:block">
        500 units only
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "FREE US SHIPPING OVER $60",
    "LIMITED TO 500 UNITS",
    "PRINTED IN A GARAGE",
    "BUY 2 GET 1 SHRUG",
    "RATED E FOR EVERYONE'S MOM",
  ];
  const row = [...items, ...items, ...items];
  return (
    <div className="border-y-4 border-ink bg-ink py-3 text-bone">
      <div className="flex animate-marquee whitespace-nowrap gap-12 font-display text-xl uppercase">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            ★ {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="border-b-4 border-ink bg-bone px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        {[
          { t: "Heavyweight", d: "240gsm cotton. Built to outlive your situationships." },
          { t: "Limited", d: "When it's gone, it's gone. We do not restock vibes." },
          { t: "Unsponsored", d: "No influencers. No focus groups. Just bad ideas, bottled." },
        ].map((b, i) => (
          <div
            key={i}
            className="border-4 border-ink bg-bone p-6 shadow-brutal-sm"
            style={{ transform: `rotate(${i === 1 ? 1 : -1}deg)` }}
          >
            <h3 className="font-display text-3xl uppercase">{b.t}</h3>
            <p className="mt-2 text-sm font-bold uppercase opacity-70">{b.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

type CollectionKey = keyof typeof COLLECTIONS;

function Collection({ k, id }: { k: CollectionKey; id?: string }) {
  const c = COLLECTIONS[k];
  const items = c.ids.map((pid) => products.find((p) => p.id === pid)!).filter(Boolean);
  const gridCols = c.cols === 2 ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-3";
  return (
    <section id={id} className={`${c.bg} px-6 py-20`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-5xl uppercase md:text-6xl">{c.title}</h2>
            <p className="mt-2 text-sm font-bold uppercase opacity-60">{c.sub}</p>
          </div>
          <span className="border-2 border-ink bg-bone px-3 py-1 text-xs font-bold uppercase text-ink shadow-brutal-sm">
            {c.chip}
          </span>
        </div>
        <div className={`grid grid-cols-1 gap-12 ${gridCols}`}>
          {items.map((p, i) => (
            <ProductCard key={p.id} p={p} accent={ACCENTS[i % 3]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DividerMarquee({ text, bg = "bg-ink", fg = "text-bone" }: { text: string; bg?: string; fg?: string }) {
  const row = Array.from({ length: 8 }, () => text);
  return (
    <div className={`border-y-4 border-ink ${bg} py-3 ${fg}`}>
      <div className="flex animate-marquee whitespace-nowrap gap-12 font-display text-xl uppercase">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex items-center gap-12">★ {t}</span>
        ))}
      </div>
    </div>
  );
}

function DividerStitch() {
  return (
    <div className="relative h-10 border-y-4 border-ink overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--ink) 0 12px, var(--bone) 12px 24px)",
        }}
      />
    </div>
  );
}

function DividerTape() {
  return (
    <div className="relative bg-bone py-8">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6">
        <div className="h-2 flex-1 bg-ink" />
        <span className="-rotate-2 border-4 border-ink bg-zap px-4 py-1 font-display text-2xl uppercase shadow-brutal-sm">
          ⚠ Caution: Hot Drops
        </span>
        <div className="h-2 flex-1 bg-ink" />
      </div>
    </div>
  );
}

function DividerBigType() {
  return (
    <div className="overflow-hidden border-y-4 border-ink bg-zap">
      <p className="whitespace-nowrap text-center font-display text-[16vw] uppercase leading-none tracking-tighter md:text-[12vw]">
        ✕ More Bad Ideas ✕
      </p>
    </div>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="border-y-4 border-ink bg-shock px-6 py-20 text-bone">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-5xl uppercase md:text-6xl">
          Receipts <span className="text-zap">★★★★★</span>
        </h2>
        <p className="mt-2 text-sm font-bold uppercase opacity-80">
          12,042 verified menaces and counting.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <blockquote
              key={i}
              className="border-4 border-ink bg-bone p-5 text-ink shadow-brutal-sm"
              style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
            >
              <p className="font-display text-xl uppercase leading-tight">
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

function Newsletter() {
  return (
    <section className="bg-bone px-6 py-20">
      <div className="mx-auto max-w-3xl border-4 border-ink bg-zap p-8 shadow-brutal text-center md:p-12">
        <h2 className="font-display text-4xl uppercase md:text-5xl">
          Join the Hive Mind
        </h2>
        <p className="mt-3 font-bold uppercase">
          Get first dibs on drops. We email rarely. Mostly chaos.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("You're in. May god have mercy.");
          }}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <input
            required
            type="email"
            placeholder="YOUR_EMAIL@DUMB.COM"
            className="flex-1 border-4 border-ink bg-bone p-4 font-bold uppercase placeholder:opacity-40 focus:outline-none"
          />
          <button className="border-4 border-ink bg-ink px-6 py-4 font-display text-xl uppercase text-bone transition-all hover:bg-shock">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-4 border-ink bg-ink px-6 py-12 text-bone">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
        <div>
          <p className="font-display text-3xl uppercase">
            Clown Corps<span className="text-shock">.</span>
          </p>
          <p className="mt-2 text-xs font-bold uppercase opacity-60">
            © 2026 — Built on a series of poor life choices.
          </p>
        </div>
        <div className="flex gap-12 text-xs font-bold uppercase">
          <div className="space-y-2">
            <p className="opacity-50">Shop</p>
            <a href="#shop" className="block hover:text-zap">All Tees</a>
            <a href="#shop" className="block hover:text-zap">New Drop</a>
          </div>
          <div className="space-y-2">
            <p className="opacity-50">Help</p>
            <a href="#" className="block hover:text-zap">Shipping</a>
            <a href="#" className="block hover:text-zap">Returns</a>
          </div>
          <div className="space-y-2">
            <p className="opacity-50">Lurk</p>
            <a href="#" className="block hover:text-zap">Instagram</a>
            <a href="#" className="block hover:text-zap">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StickyCTA() {
  const { count, setOpen } = useCart();
  if (count === 0) return null;
  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-30 border-4 border-ink bg-shock px-6 py-3 font-display text-lg uppercase text-bone shadow-brutal transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none md:hidden"
    >
      Cart ({count})
    </button>
  );
}

function Index() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-bone">
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=IBM+Plex+Mono:wght@400;500;700&display=swap"
        />
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Manifesto />
          <Collection k="freshGarbage" id="shop" />
          <DividerStitch />
          <Collection k="emotionalDamage" id="emotional-damage" />
          <DividerTape />
          <Collection k="hostileWholesome" id="hostile-wholesome" />
          <DividerBigType />
          <Collection k="loudIntroverts" id="loud-introverts" />
          <DividerMarquee text="LIMITED · LOUD · LIGHTLY UNHINGED" bg="bg-ink" fg="text-bone" />
          <Reviews />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer />
        <StickyCTA />
      </div>
    </CartProvider>
  );
}

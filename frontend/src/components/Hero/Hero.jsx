import { useEffect, useState } from "react";
import {
  Search,
  Package,
  Handshake,
  Star,
  Smile,
  Flame,
  Truck,
  Heart,
} from "lucide-react";
import { useWishlist } from "../../context/useWishlist";

const popularTags = ["Headphones", "Sneakers", "Home décor", "Gaming"];

const metrics = [
  { icon: Package, value: "2M+", label: "Products" },
  { icon: Handshake, value: "10K+", label: "Sellers" },
  { icon: Star, value: "4.8*", label: "Avg. rating" },
  { icon: Smile, value: "1M+", label: "Happy orders" },
];

const dataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

const headphonesIllustration = dataUri(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </radialGradient>
    <linearGradient id="black" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <filter id="sh" x="-30%" y="-30%" width="160%" height="170%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-opacity="0.28"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <g filter="url(#sh)">
    <path d="M118 216 Q118 96 200 96 Q282 96 282 216" stroke="url(#black)" stroke-width="24" fill="none" stroke-linecap="round"/>
    <path d="M126 216 Q126 118 200 118 Q274 118 274 216" stroke="#475569" stroke-width="5" fill="none" opacity="0.35"/>
    <rect x="94" y="202" width="48" height="84" rx="22" fill="url(#black)"/>
    <rect x="258" y="202" width="48" height="84" rx="22" fill="url(#black)"/>
    <ellipse cx="118" cy="250" rx="13" ry="24" fill="#1e293b"/>
    <ellipse cx="282" cy="250" rx="13" ry="24" fill="#1e293b"/>
    <circle cx="200" cy="70" r="6" fill="#f59e0b"/>
  </g>
</svg>`);

const sneakerIllustration = dataUri(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </radialGradient>
    <linearGradient id="red" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#be123c"/>
    </linearGradient>
    <filter id="sh" x="-30%" y="-30%" width="160%" height="170%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-opacity="0.28"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <g filter="url(#sh)">
    <path d="M92 268 L92 246 Q90 208 122 188 L156 170 L174 164 Q208 158 238 176 L292 232 Q308 242 300 260 L298 268 Z" fill="url(#red)"/>
    <path d="M92 268 L92 256 Q92 232 124 230 L286 230 Q300 230 298 268 Z" fill="#881337"/>
    <rect x="88" y="266" width="220" height="24" rx="12" fill="#f1f5f9"/>
    <rect x="88" y="278" width="220" height="10" rx="5" fill="#cbd5e1"/>
    <path d="M120 188 L150 172 Q176 162 202 170" stroke="#fda4af" stroke-width="6" fill="none" stroke-linecap="round"/>
  </g>
</svg>`);

const speakerIllustration = dataUri(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </radialGradient>
    <linearGradient id="cyl" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="50%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <filter id="sh" x="-30%" y="-30%" width="160%" height="170%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <g filter="url(#sh)">
    <rect x="168" y="118" width="64" height="26" rx="6" fill="#475569"/>
    <path d="M130 170 Q130 134 200 134 Q270 134 270 170 L270 300 Q270 320 240 320 L160 320 Q130 320 130 300 Z" fill="url(#cyl)"/>
    <circle cx="200" cy="176" r="5" fill="#f87171"/>
    <rect x="158" y="204" width="84" height="84" rx="18" fill="#0b1020" opacity="0.85"/>
    <circle cx="200" cy="246" r="22" fill="#475569"/>
    <circle cx="200" cy="246" r="10" fill="#94a3b8"/>
  </g>
</svg>`);

const fallbackProducts = {
  headphones: {
    title: "soundcore Pro Wireless Headphones",
    brand: "soundcore",
    price: 129.99,
    illustration: headphonesIllustration,
  },
  sneakers: {
    title: "Nike Air Max 2090",
    brand: "Nike",
    price: 89.99,
    illustration: sneakerIllustration,
  },
  tech: {
    title: "Amazon Echo Plus",
    brand: "Amazon",
    price: 99.99,
    thumbnail: "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/thumbnail.webp",
    illustration: speakerIllustration,
  },
};

const matches = (product, keywords) => {
  const haystack = `${product.title} ${(product.tags ?? []).join(" ")}`.toLowerCase();
  return keywords.some((k) => haystack.includes(k));
};

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

function ProductImage({ src, fallbackSrc, alt, className }) {
  return (
    <img
      src={src || fallbackSrc}
      alt={alt}
      onError={(e) => {
        if (e.currentTarget.src !== fallbackSrc) {
          e.currentTarget.src = fallbackSrc;
        }
      }}
      className={`h-full w-full bg-slate-100 object-cover ${className}`}
    />
  );
}

function Hero() {
  const [products, setProducts] = useState(fallbackProducts);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { isFavorite, toggleItem } = useWishlist();

  useEffect(() => {
    let cancelled = false;

    fetch("https://dummyjson.com/products?limit=0&select=title,brand,price,thumbnail,tags")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const list = data.products ?? [];
        const find = (keywords) => list.find((p) => matches(p, keywords));

        setProducts({
          headphones: find(["headphone", "airpods", "earphone", "earbuds"]) ?? fallbackProducts.headphones,
          sneakers: find(["air jordan", "nike air", "sneaker", "nike"]) ?? fallbackProducts.sneakers,
          tech: find(["dualsense", "controller", "gamepad", "playstation", "xbox", "joystick"])
            ?? find(["watch"])
            ?? find(["homepod", "echo", "speaker"])
            ?? fallbackProducts.tech,
        });
      })
      .catch(() => {
        if (!cancelled) setProducts(fallbackProducts);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (!nav) return;

    const measure = () => setNavbarHeight(nav.getBoundingClientRect().height);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0d1137] via-[#1e1b5e] to-[#5b21b6] text-white"
      style={navbarHeight ? { minHeight: `calc(100svh - ${navbarHeight}px)` } : undefined}
    >
      <div className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-purple-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-16 px-4 py-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-24">
        {/* Left - Text Content */}
        <div>
          <h2 className="max-w-xl text-4xl font-extrabold leading-tight md:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
            Everything you need, all in one place.
          </h2>

          <p className="mt-4 max-w-xl text-lg text-white/70">
            Discover products from thousands of independent sellers — curated,
            trusted, delivered fast.
          </p>

          {/* Secondary Search Bar */}
          <div className="mt-8 flex max-w-xl items-center rounded-full bg-white p-1.5 shadow-xl focus-within:ring-4 focus-within:ring-purple-400/40">
            <Search className="ml-3 h-5 w-5 shrink-0 text-gray-400" />
            <input
              type="text"
              placeholder="Search millions of products"
              className="w-full min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            <button className="shrink-0 rounded-full bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700">
              Search
            </button>
          </div>

          {/* Popular Search Tags */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-white/60">Popular:</span>
            {popularTags.map((tag) => (
              <a
                key={tag}
                href="#"
                className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/90 transition-colors hover:bg-white/20"
              >
                {tag}
              </a>
            ))}
          </div>

          {/* Performance Metrics */}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/15 pt-7">
            {metrics.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10">
                  <Icon className="h-5 w-5 text-purple-300" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{value}</p>
                  <p className="text-xs text-white/60">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Floating Products */}
        <div className="relative mx-auto hidden h-[600px] w-full max-w-[560px] lg:block">
          {/* Floating Pills */}
          <div className="absolute top-44 -left-2 z-40 flex rotate-2 items-center gap-1.5 rounded-full bg-orange-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/30">
            <Flame className="h-4 w-4" />
            Trending
          </div>
          <div className="absolute -right-2 top-6 z-40 flex -rotate-3 items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30">
            <Truck className="h-4 w-4" />
            Free Shipping
          </div>
          <div className="absolute bottom-40 left-24 z-40 flex rotate-2 items-center gap-1.5 rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-bold text-slate-900 shadow-lg shadow-yellow-900/30">
            <Star className="h-4 w-4 fill-current" />
            4.9 Top Seller
          </div>

          {/* Card 1 - Headphones */}
          <div className="absolute right-8 top-8 z-10 w-60 rotate-3 rounded-2xl bg-white p-3 shadow-2xl shadow-black/40 transition-transform duration-300 hover:scale-[1.04]">
            <div className="relative">
              <ProductImage
                src={products.headphones.thumbnail}
                fallbackSrc={products.headphones.illustration}
                alt={products.headphones.title}
                className="h-44 rounded-xl"
              />
              <button
                onClick={() =>
                  toggleItem({
                    id: "hero-headphones",
                    title: products.headphones.title,
                    brand: products.headphones.brand,
                    price: products.headphones.price,
                    image: products.headphones.thumbnail || products.headphones.illustration,
                  })
                }
                className={`absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-white shadow-md transition-all ${
                  isFavorite("hero-headphones")
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
                title="Add to wishlist"
              >
                <Heart
                  className={`h-3.5 w-3.5 ${isFavorite("hero-headphones") ? "fill-red-500" : ""}`}
                />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-xs font-semibold text-slate-500">4.8</span>
            </div>
            <p className="mt-1 truncate text-sm font-bold text-slate-800">
              {products.headphones.title}
            </p>
            <p className="text-xs font-medium text-slate-400">{products.headphones.brand}</p>
            <p className="mt-1 text-base font-extrabold text-purple-700">
              {formatPrice(products.headphones.price)}
            </p>
          </div>

          {/* Card 2 - Sneakers */}
          <div className="absolute left-2 top-44 z-20 w-60 -rotate-6 rounded-2xl bg-white p-3 shadow-2xl shadow-black/40 transition-transform duration-300 hover:scale-[1.04]">
            <div className="relative">
              <ProductImage
                src={products.sneakers.thumbnail}
                fallbackSrc={products.sneakers.illustration}
                alt={products.sneakers.title}
                className="h-40 rounded-xl"
              />
              <button
                onClick={() =>
                  toggleItem({
                    id: "hero-sneakers",
                    title: products.sneakers.title,
                    brand: products.sneakers.brand,
                    price: products.sneakers.price,
                    image: products.sneakers.thumbnail || products.sneakers.illustration,
                  })
                }
                className={`absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-white shadow-md transition-all ${
                  isFavorite("hero-sneakers")
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
                title="Add to wishlist"
              >
                <Heart
                  className={`h-3.5 w-3.5 ${isFavorite("hero-sneakers") ? "fill-red-500" : ""}`}
                />
              </button>
            </div>
            <p className="mt-3 truncate text-sm font-bold text-slate-800">
              {products.sneakers.title}
            </p>
            <p className="text-xs font-medium text-slate-400">{products.sneakers.brand}</p>
            <p className="mt-1 text-base font-extrabold text-purple-700">
              {formatPrice(products.sneakers.price)}
            </p>
          </div>

          {/* Card 3 - Smart Speaker / Tech */}
          <div className="absolute bottom-0 left-16 z-30 w-60 rotate-2 rounded-2xl bg-white p-3 shadow-2xl shadow-black/40 transition-transform duration-300 hover:scale-[1.04]">
            <div className="relative">
              <ProductImage
                src={products.tech.thumbnail}
                fallbackSrc={products.tech.illustration}
                alt={products.tech.title}
                className="h-40 rounded-xl"
              />
              <button
                onClick={() =>
                  toggleItem({
                    id: "hero-tech",
                    title: products.tech.title,
                    brand: products.tech.brand,
                    price: products.tech.price,
                    image: products.tech.thumbnail || products.tech.illustration,
                  })
                }
                className={`absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-white shadow-md transition-all ${
                  isFavorite("hero-tech")
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
                title="Add to wishlist"
              >
                <Heart
                  className={`h-3.5 w-3.5 ${isFavorite("hero-tech") ? "fill-red-500" : ""}`}
                />
              </button>
            </div>
            <p className="mt-3 truncate text-sm font-bold text-slate-800">
              {products.tech.title}
            </p>
            <p className="text-xs font-medium text-slate-400">{products.tech.brand}</p>
            <p className="mt-1 text-base font-extrabold text-purple-700">
              {formatPrice(products.tech.price)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
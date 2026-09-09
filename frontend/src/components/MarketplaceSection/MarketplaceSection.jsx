import { useEffect, useRef, useState } from "react";
import { Star, Truck, ChevronLeft, ChevronRight } from "lucide-react";

const formatPrice = (value) => {
  const [whole, cents] = Number(value).toFixed(2).split(".");
  return (
    <>
      <span className="align-top text-xs">$</span>
      <span>{Number(whole).toLocaleString()}</span>
      <span className="align-top text-xs">{cents}</span>
    </>
  );
};

function MarketplaceSection() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const scrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    fetch(
      "https://dummyjson.com/products?limit=24&select=title,brand,price,discountPercentage,rating,thumbnail",
    )
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setProducts(data.products ?? []);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleScroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Trending now
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll(-1)}
              className="hidden size-9 place-items-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:text-purple-600 md:grid"
              title="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleScroll(1)}
              className="hidden size-9 place-items-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:text-purple-600 md:grid"
              title="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <a
              href="#"
              className="text-sm font-semibold text-purple-600 transition-colors hover:text-purple-700 md:text-base"
            >
              See more →
            </a>
          </div>
        </div>

        {status === "error" && (
          <p className="text-sm text-gray-400">Couldn't load products.</p>
        )}

        {status === "loading" ? (
          <div className="flex gap-3 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-44 shrink-0 sm:w-52 md:w-56">
                <div className="aspect-square w-full animate-pulse rounded-xl bg-gray-100" />
                <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-100" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative -mx-4 px-4">
            <div
              ref={scrollRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {status === "ready" &&
                products.map((product, i) => (
                  <div
                    key={product.id}
                    className="w-44 shrink-0 snap-start sm:w-52 md:w-56"
                    style={{
                      animation: "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
                      animationDelay: `${Math.min(i * 60, 900)}ms`,
                    }}
                  >
                    <a
                      href="#"
                      className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      {/* Image */}
                      <div className="relative aspect-square w-full bg-white p-3">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          loading="lazy"
                          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col px-3 pb-3">
                        <div className="flex items-baseline gap-1 text-lg font-semibold text-slate-900">
                          {formatPrice(product.price)}
                        </div>

                        {product.discountPercentage > 0 && (
                          <p className="text-sm font-medium text-emerald-600">
                            -{Math.round(product.discountPercentage)}%
                          </p>
                        )}

                        {product.discountPercentage >= 10 && (
                          <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <Truck className="h-3.5 w-3.5" />
                            Free shipping
                          </p>
                        )}

                        {product.rating > 0 && (
                          <p className="mt-1 flex items-center gap-0.5 text-xs text-gray-400">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {product.rating.toFixed(1)}
                          </p>
                        )}

                        <p className="mt-1 line-clamp-2 text-sm leading-snug text-gray-700">
                          <span className="font-semibold text-gray-800">
                            {product.brand}
                          </span>{" "}
                          {product.title}
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MarketplaceSection;
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useWishlist } from "../../context/useWishlist";
import { useCart } from "../../context/useCart";

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

const oldPriceFromDiscount = (price, discount) =>
  discount > 0 ? price / (1 - discount / 100) : null;

function MarketplaceSection() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const scrollRef = useRef(null);
  const { isFavorite, toggleItem } = useWishlist();
  const { addItem } = useCart();

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
    <section className="bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-7 flex items-center justify-between gap-4 md:mb-9">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Trending now
          </h2>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleScroll(-1)}
              className="hidden size-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-blue-200 hover:text-blue-600 md:grid"
              title="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleScroll(1)}
              className="hidden size-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-blue-200 hover:text-blue-600 md:grid"
              title="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <Link
              to="/browse/all"
              className="group/more flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              See more
              <span className="inline-block transition-transform duration-300 group-hover/more:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {status === "error" && (
          <p className="text-sm text-slate-400">Couldn't load products.</p>
        )}

        {status === "loading" ? (
          <div className="flex gap-4 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-44 shrink-0 sm:w-52 md:w-56">
                <div className="aspect-square w-full animate-pulse rounded-2xl bg-slate-100" />
                <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div
              ref={scrollRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {status === "ready" &&
                products.map((product, i) => {
                  const oldPrice = oldPriceFromDiscount(
                    product.price,
                    product.discountPercentage || 0,
                  );
                  return (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="group w-44 shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 sm:w-52 md:w-56"
                      style={{
                        animation: "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
                        animationDelay: `${Math.min(i * 60, 900)}ms`,
                      }}
                    >
                      {/* Image */}
                      <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                        {product.discountPercentage > 0 && (
                          <span className="absolute left-2.5 top-2.5 rounded-lg bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                            -{Math.round(product.discountPercentage)}%
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleItem({
                              id: product.id,
                              title: product.title,
                              brand: product.brand,
                              price: product.price,
                              image: product.thumbnail,
                            });
                          }}
                          className={`absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full border border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-sm ${
                            isFavorite(product.id)
                              ? "text-red-500"
                              : "text-slate-500 hover:text-blue-600"
                          }`}
                          title={isFavorite(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <Heart
                            className={`h-4 w-4 ${isFavorite(product.id) ? "fill-red-500" : ""}`}
                          />
                        </button>
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col p-3.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-600">
                          {product.brand}
                        </p>
                        <p className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-slate-900">
                          {product.title}
                        </p>

                        <div className="mt-1.5 flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-[11px] font-semibold text-slate-600">
                            {product.rating.toFixed(1)}
                          </span>
                        </div>

                        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <span className="text-base font-bold text-slate-900">
                            {formatPrice(product.price)}
                          </span>
                          {oldPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              {formatPrice(oldPrice)}
                            </span>
                          )}
                          {product.discountPercentage > 0 && (
                            <span className="text-[10px] font-semibold text-emerald-600">
                              -{Math.round(product.discountPercentage)}%
                            </span>
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addItem({
                              id: product.id,
                              title: product.title,
                              brand: product.brand,
                              price: product.price,
                              image: product.thumbnail,
                            });
                          }}
                          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to cart
                        </button>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MarketplaceSection;
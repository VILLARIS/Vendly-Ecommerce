import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "../../context/useWishlist";
import { useCart } from "../../context/useCart";
import { localDeals } from "../../data/products";

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

const getSavings = (price, oldPrice) => {
  if (!oldPrice || price >= oldPrice) return null;
  return Math.round((1 - price / oldPrice) * 100);
};

function DealsSection() {
  const { isFavorite, toggleItem } = useWishlist();
  const { addItem } = useCart();

  return (
    <section className="bg-slate-50 py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-7 flex items-center justify-between gap-4 md:mb-9">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Deals you'll love
            </h2>
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 ring-1 ring-red-100">
              SALE
            </span>
          </div>
          <Link
            to="/browse/all"
            className="group/more flex shrink-0 items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            See all deals
            <span className="inline-block transition-transform duration-300 group-hover/more:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {localDeals.map((deal) => (
            <Link
              key={deal.id}
              to={`/product/${deal.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={deal.image}
                  alt={deal.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {deal.discount && (
                  <span className="absolute left-2.5 top-2.5 rounded-lg bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {deal.discount}
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleItem({
                      id: deal.id,
                      title: deal.title,
                      brand: deal.store,
                      price: deal.price,
                      image: deal.image,
                    });
                  }}
                  className={`absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full border border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-sm ${
                    isFavorite(deal.id)
                      ? "text-red-500"
                      : "text-slate-500 hover:text-blue-600"
                  }`}
                  title={isFavorite(deal.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite(deal.id) ? "fill-red-500" : ""}`}
                  />
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-600">
                  {deal.store}
                </p>

                <p className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-slate-900">
                  {deal.title}
                </p>

                <div className="mt-1.5 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-[11px] font-semibold text-slate-600">
                    {deal.rating.toFixed(1)}
                  </span>
                  <span className="text-[11px] text-slate-400">({deal.reviews})</span>
                </div>

                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-base font-bold text-slate-900">
                    {formatPrice(deal.price)}
                  </span>
                  {deal.oldPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(deal.oldPrice)}
                    </span>
                  )}
                  {getSavings(deal.price, deal.oldPrice) && (
                    <span className="text-[10px] font-semibold text-emerald-600">
                      {getSavings(deal.price, deal.oldPrice)}% off
                    </span>
                  )}
                </div>

                <p
                  className={`mt-1 text-[11px] font-medium ${
                    deal.shipping === "Free shipping"
                      ? "text-emerald-600"
                      : "text-slate-400"
                  }`}
                >
                  {deal.shipping}
                </p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem({
                      id: deal.id,
                      title: deal.title,
                      brand: deal.store,
                      price: deal.price,
                      image: deal.image,
                    });
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DealsSection;
import { Star, Heart } from "lucide-react";
import { useWishlist } from "../../context/useWishlist";

const deals = [
  {
    id: "deal-soundcore-pro",
    store: "TechWorld",
    title: "SoundCore Pro Wireless Headphones",
    rating: 4.5,
    reviews: 324,
    price: 129.99,
    oldPrice: 159.99,
    discount: "-19%",
    shipping: "Free shipping",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "deal-samsung-qled",
    store: "TechWorld",
    title: 'Samsung 65" 4K QLED Smart TV',
    rating: 4.8,
    reviews: 512,
    price: 899.99,
    oldPrice: 1199.99,
    discount: "-25%",
    shipping: "Free shipping",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "deal-macbook-air-m3",
    store: "TechWorld",
    title: 'Apple MacBook Air M3 13"',
    rating: 4.9,
    reviews: 891,
    price: 1099.0,
    oldPrice: 1299.0,
    discount: "-15%",
    shipping: "Free shipping",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "deal-sony-wh1000xm5",
    store: "TechWorld",
    title: "Sony WH-1000XM5 Headphones",
    rating: 4.7,
    reviews: 1203,
    price: 279.99,
    oldPrice: 349.99,
    discount: "-20%",
    shipping: "Free shipping",
    image:
      "https://images.unsplash.com/photo-1618366712010-e4bc9fdb21de?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "deal-nike-airmax-270",
    store: "UrbanWear",
    title: "Nike Air Max 270 Sneakers",
    rating: 4.6,
    reviews: 445,
    price: 89.99,
    oldPrice: 130.0,
    discount: "-31%",
    shipping: "Shipping calculated",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "deal-linen-pillow",
    store: "HomeNest",
    title: "Minimalist Linen Throw Pillow Set",
    rating: 4.4,
    reviews: 178,
    price: 34.99,
    oldPrice: 49.99,
    discount: "-30%",
    shipping: "Free shipping",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=60",
  },
];

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

function DealsSection() {
  const { isFavorite, toggleItem } = useWishlist();

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Deals you'll love
            </h2>
            <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">
              SALE
            </span>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-purple-600 transition-colors hover:text-purple-700 md:text-base"
          >
            See all deals →
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {deals.map((deal) => (
            <a
              key={deal.id}
              href="#"
              className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                  src={deal.image}
                  alt={deal.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                  {deal.discount}
                </span>
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
                  className={`absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white shadow-sm transition-all ${
                    isFavorite(deal.id)
                      ? "text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                  title={isFavorite(deal.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite(deal.id) ? "fill-red-500" : ""}`}
                  />
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-semibold text-purple-600">{deal.store}</p>

                <p className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-slate-800">
                  {deal.title}
                </p>

                <div className="mt-2 flex items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.round(deal.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">({deal.reviews})</span>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-slate-900">
                    {formatPrice(deal.price)}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(deal.oldPrice)}
                  </span>
                </div>

                <p
                  className={`mt-1 text-xs font-medium ${
                    deal.shipping === "Free shipping"
                      ? "text-emerald-600"
                      : "text-gray-400"
                  }`}
                >
                  {deal.shipping}
                </p>

                <button className="mt-3 w-full rounded-lg bg-purple-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700">
                  Add to cart
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DealsSection;
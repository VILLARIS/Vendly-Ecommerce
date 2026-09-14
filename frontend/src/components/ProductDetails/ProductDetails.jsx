import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  RefreshCcw,
  Truck,
  Package,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";
import { useWishlist } from "../../context/useWishlist";
import { useCart } from "../../context/useCart";
import { localDeals } from "../../data/products";
import { departmentOfCategory } from "../../data/categories";

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

const sellerInitials = (name) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const mapLocalDeal = (deal) => ({
  id: deal.id,
  title: deal.title,
  brand: deal.store,
  category: deal.category,
  price: Number(deal.price),
  oldPrice: deal.oldPrice != null ? Number(deal.oldPrice) : null,
  discount: parseInt((deal.discount || "").replace(/\D/g, ""), 10) || null,
  rating: Number(deal.rating) || 4.8,
  reviews: deal.reviews,
  image: deal.image,
  gallery: [deal.image],
  shipping: deal.shipping,
  sales: 1240,
});

const mapDummyProduct = (product) => {
  const price = Number(product.price);
  const discount = Number(product.discountPercentage) > 0 ? Math.round(product.discountPercentage) : null;
  const oldPrice = discount ? Number((price / (1 - discount / 100)).toFixed(2)) : null;
  const gallery =
    Array.isArray(product.images) && product.images.length
      ? product.images
      : [product.thumbnail];
  return {
    id: product.id,
    title: product.title,
    brand: product.brand || "TechWorld",
    category: product.category,
    price,
    oldPrice,
    discount,
    rating: Number(product.rating) || 4.8,
    reviews: Array.isArray(product.reviews) ? product.reviews.length : null,
    image: gallery[0],
    gallery,
    shipping: "Free shipping",
    sales: null,
  };
};

const tabs = ["Description", "Specifications", "Reviews", "Shipping"];

const similarProducts = [
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
    id: "deal-iphone-15-pro",
    store: "TechWorld",
    title: "iPhone 15 Pro 256GB Natural Titanium",
    rating: 4.9,
    reviews: 3421,
    price: 999.0,
    oldPrice: null,
    discount: null,
    shipping: "Free shipping",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=60",
  },
];

const sampleReviews = [
  {
    author: "Daniel R.",
    initials: "DR",
    rating: 5,
    date: "2 weeks ago",
    title: "Worth every penny",
    text: "The sound quality is outstanding and the noise cancellation completely blocks out the office around me. The battery easily lasts me the whole week.",
  },
  {
    author: "Sofia M.",
    initials: "SM",
    rating: 4,
    date: "1 month ago",
    title: "Great for long sessions",
    text: "Really comfortable over-ear design and pairing is instant. The companion app could be better, but overall I am very happy with this purchase.",
  },
];

const descriptionFeatures = [
  "Hybrid active noise cancellation — up to 35dB reduction",
  "30-hour battery with ANC on; 40 hours without",
  "Fast charging: 15 minutes = 3 hours playback",
  "Multi-device pairing (up to 3 devices)",
  "Hi-Res Audio certified",
  "Premium memory foam ear cushions",
  "Built-in voice assistant support",
];

const shippingOptions = [
  {
    icon: Truck,
    title: "Free shipping",
    text: "Delivered free to your door with no minimum order.",
  },
  {
    icon: Package,
    title: "Fast delivery",
    text: "Arrives within 3-5 business days after dispatch.",
  },
  {
    icon: RefreshCcw,
    title: "30-day returns",
    text: "Changed your mind? Send it back within 30 days for a full refund.",
  },
  {
    icon: ShieldCheck,
    title: "Buyer protection",
    text: "We protect your purchase from order to delivery.",
  },
];

function ProductDetails() {
  const { id } = useParams();
  const { isFavorite, toggleItem } = useWishlist();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");

  useEffect(() => {
    let cancelled = false;
    const refresh = (next) => {
      if (!cancelled) {
        setProduct(next);
        setSelectedImg(next.image);
      }
    };

    const local = localDeals.find((deal) => deal.id === id);
    if (local) {
      refresh(mapLocalDeal(local));
      return () => {
        cancelled = true;
      };
    }

    if (/^\d+$/.test(id)) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => refresh(mapDummyProduct(data)))
        .catch(() => refresh(mapLocalDeal(localDeals[0])));
    } else {
      refresh(mapLocalDeal(localDeals[0]));
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  const favorite = product ? isFavorite(product.id) : false;
  const filledStars = product ? Math.round(product.rating) : 0;
  const activeImg = selectedImg ?? product?.image;

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-xl bg-gray-100" />
          <div className="flex flex-col gap-4">
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
            <div className="h-12 w-1/2 animate-pulse rounded bg-gray-100" />
            <div className="h-28 w-full animate-pulse rounded-xl bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link to="/" className="text-slate-500 transition-colors hover:text-indigo-600">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          {(() => {
            const dept = product.category
              ? departmentOfCategory(product.category)
              : null;
            return dept ? (
              <>
                <Link
                  to={`/browse/${dept.slug}`}
                  className="text-slate-500 transition-colors hover:text-indigo-600"
                >
                  {dept.name}
                </Link>
                <span className="text-slate-400">/</span>
              </>
            ) : null;
          })()}
          <span className="truncate text-slate-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left - Image gallery */}
          <div className="h-fit overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex aspect-square w-full items-center justify-center bg-white p-8">
              <img
                src={activeImg}
                alt={product.title}
                className="h-full w-full object-contain"
              />
            </div>
            {product.gallery.length > 1 && (
              <div className="flex gap-2 border-t border-gray-100 bg-gray-50/60 p-3">
                {product.gallery.slice(0, 4).map((img) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImg(img)}
                    className={`grid size-16 shrink-0 place-items-center overflow-hidden rounded-lg border bg-white p-1 transition-all ${
                      activeImg === img
                        ? "border-indigo-600 ring-2 ring-indigo-600/20"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                    title="View image"
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Info */}
          <div className="flex flex-col">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold leading-snug text-slate-900 md:text-3xl">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < filledStars
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-indigo-600">
                  {product.rating.toFixed(1)}
                </span>
                {product.reviews != null && (
                  <>
                    <span className="text-slate-300">|</span>
                    <span className="text-indigo-600 underline-offset-2 hover:underline">
                      {product.reviews} reviews
                    </span>
                  </>
                )}
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">Sold by {product.brand}</span>
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2.5">
                {product.oldPrice != null && (
                  <p className="text-lg font-medium text-slate-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </p>
                )}
                {product.discount != null && (
                  <span className="text-sm font-bold text-emerald-600">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <p className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900">
                {formatPrice(product.price)}
              </p>
              {product.oldPrice != null && (
                <p className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-emerald-600">
                    You save {formatPrice(product.oldPrice - product.price)}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    Free delivery
                  </span>
                </p>
              )}
            </div>

            {/* Seller */}
            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo-600 font-bold text-white">
                  {sellerInitials(product.brand)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{product.brand}</p>
                  <div className="mt-0.5 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs text-slate-500">
                      {product.rating.toFixed(1)}
                      {product.sales ? ` · ${product.sales} sales` : ""}
                    </span>
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="flex items-center gap-1 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
              >
                Visit store
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Buy controls */}
            <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                <span className="size-2 rounded-full bg-emerald-500" />
                In Stock
                <span className="font-normal text-slate-500">— ships within 24 hours</span>
              </p>

              <div className="flex gap-3">
                <div className="flex w-32 shrink-0 items-center justify-between rounded-lg border border-slate-200 bg-white px-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="grid size-9 place-items-center text-slate-500 transition-colors hover:text-indigo-600"
                    title="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-semibold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="grid size-9 place-items-center text-slate-500 transition-colors hover:text-indigo-600"
                    title="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() =>
                    addItem(
                      {
                        id: product.id,
                        title: product.title,
                        brand: product.brand,
                        price: product.price,
                        image: product.image,
                      },
                      quantity,
                    )
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to cart
                </button>
              </div>

              <button className="w-full rounded-lg bg-slate-900 py-3 font-semibold text-white transition-colors hover:bg-slate-800">
                Buy now
              </button>

              <button
                onClick={() =>
                  toggleItem({
                    id: product.id,
                    title: product.title,
                    brand: product.brand,
                    price: product.price,
                    image: product.image,
                  })
                }
                className={`flex w-full items-center justify-center gap-2 rounded-lg border py-3 font-medium transition-all ${
                  favorite
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Heart className={`h-5 w-5 ${favorite ? "fill-red-500" : ""}`} />
                {favorite ? "In wishlist" : "Add to wishlist"}
              </button>
            </div>

            {/* Trust */}
            <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6">
              {[
                { icon: Truck, label: "Free shipping" },
                { icon: RefreshCcw, label: "30-day returns" },
                { icon: ShieldCheck, label: "Buyer protection" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-indigo-600" />
                  <p className="text-sm text-slate-600">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info tabs */}
        <div className="mt-16">
          <div className="flex gap-6 overflow-x-auto border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 border-b-2 py-3 text-sm transition-colors ${
                  activeTab === tab
                    ? "border-indigo-600 font-semibold text-indigo-600"
                    : "border-transparent font-medium text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Description" && (
            <div className="pt-8">
              <p className="mb-4 leading-relaxed text-slate-600">
                Experience premium audio with the SoundCore Pro — featuring hybrid active noise
                cancellation, 30-hour battery life with fast charging, and Hi-Res Audio
                certification. The ergonomic over-ear design with memory foam cushions ensures
                comfort during long listening sessions.
              </p>
              <p className="mb-6 leading-relaxed text-slate-600">
                The SoundCore Pro combines advanced hybrid active noise cancellation technology
                with a 30-hour battery life, making it perfect for long commutes, travel, and
                intensive work sessions. The Hi-Res Audio certification ensures you hear every
                detail of your music as the artist intended.
              </p>
              <ul className="list-disc space-y-2 pl-5 text-slate-600">
                {descriptionFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "Specifications" && (
            <div className="pt-8">
              <dl className="divide-y divide-gray-100">
                {[
                  ["Brand", product.brand],
                  ["Model", product.title],
                  ["Price", formatPrice(product.price)],
                  ["Rating", `${product.rating.toFixed(1)} / 5`],
                  ["Availability", "In stock"],
                  ["Shipping", product.shipping],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-4 py-3">
                    <dt className="text-sm text-slate-500">{label}</dt>
                    <dd className="text-right text-sm font-medium text-slate-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="flex flex-col gap-6 pt-8">
              {sampleReviews.map((review) => (
                <div
                  key={review.author}
                  className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo-50 font-bold text-indigo-600">
                      {review.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{review.author}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-200 text-slate-200"
                            }`}
                          />
                        ))}
                        <span>{review.date}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{review.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Shipping" && (
            <div className="flex flex-col gap-6 pt-8">
              {shippingOptions.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-indigo-50">
                    <Icon className="h-5 w-5 text-indigo-600" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{title}</p>
                    <p className="mt-0.5 text-sm text-slate-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Similar products */}
        <section className="mb-12 mt-24">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Similar products</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similarProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {item.discount && (
                    <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                      {item.discount}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleItem({
                        id: item.id,
                        title: item.title,
                        brand: item.store,
                        price: item.price,
                        image: item.image,
                      });
                    }}
                    className={`absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white shadow-sm transition-all ${
                      isFavorite(item.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    }`}
                    title={isFavorite(item.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(item.id) ? "fill-red-500" : ""}`} />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-semibold text-purple-600">{item.store}</p>

                  <p className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>

                  <div className="mt-2 flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < Math.round(item.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">({item.reviews})</span>
                  </div>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-slate-900">
                      {formatPrice(item.price)}
                    </span>
                    {item.oldPrice != null && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(item.oldPrice)}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs font-medium text-emerald-600">{item.shipping}</p>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addItem({
                        id: item.id,
                        title: item.title,
                        brand: item.store,
                        price: item.price,
                        image: item.image,
                      });
                    }}
                    className="mt-3 w-full rounded-lg bg-purple-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;
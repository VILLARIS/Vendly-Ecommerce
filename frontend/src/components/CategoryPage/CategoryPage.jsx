import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  Star,
  Heart,
  Truck,
  ShoppingCart,
  ChevronRight,
  ArrowUpDown,
  Layers,
} from "lucide-react";
import { useWishlist } from "../../context/useWishlist";
import { useCart } from "../../context/useCart";
import { localDeals } from "../../data/products";
import { departments, findDepartment } from "../../data/categories";

const SELECT = "id,title,brand,price,discountPercentage,rating,thumbnail,category";

const formatPrice = (value) => {
  const [whole, cents] = Number(value).toFixed(2).split(".");
  return (
    <>
      <span className="align-top text-xs font-semibold">$</span>
      <span>{Number(whole).toLocaleString()}</span>
      <span className="align-top text-xs font-semibold">{cents}</span>
    </>
  );
};

const dealDiscount = (deal) =>
  parseInt((deal.discount || "").replace(/\D/g, ""), 10) || 0;

const mapLocalDeals = () =>
  localDeals.map((deal) => ({
    id: deal.id,
    title: deal.title,
    brand: deal.store,
    price: Number(deal.price),
    discountPercentage: dealDiscount(deal),
    rating: Number(deal.rating) || 4.8,
    thumbnail: deal.image,
    category: deal.category,
    subcategory: deal.subcategory,
    freeShipping: /free/i.test(deal.shipping || ""),
  }));

const sortOptions = [
  { key: "recommended", label: "Recommended" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "top-rated", label: "Top Rated" },
];

function ProductCard({ product }) {
  const { isFavorite, toggleItem } = useWishlist();
  const { addItem } = useCart();
  const favorite = isFavorite(product.id);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
      {/* Image */}
      <Link
        to={`/product/${product.id}`}
        className="group relative block aspect-square w-full bg-slate-50 p-3"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        {product.discountPercentage >= 10 && (
          <span className="absolute left-3 top-3 rounded-md bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
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
          className={`absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white shadow-sm transition-all ${
            favorite
              ? "text-red-500"
              : "text-slate-400 hover:scale-110 hover:text-red-500"
          }`}
          title={favorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4 w-4 ${favorite ? "fill-red-500" : ""}`} />
        </button>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-blue-500">
          {product.brand}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 min-h-[2.5rem] text-[13px] font-medium leading-snug text-slate-800 transition-colors hover:text-blue-600"
        >
          {product.title}
        </Link>

        {product.rating > 0 && (
          <p className="flex items-center gap-1 text-xs text-slate-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)}
          </p>
        )}

        <p className="mt-1 flex items-center gap-1.5 text-lg font-extrabold tracking-tight text-slate-900">
          {formatPrice(product.price)}
          {product.discountPercentage >= 10 && (
            <span className="text-[11px] font-bold text-emerald-600">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </p>

        <p className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
          <Truck className="h-3.5 w-3.5" />
          Free shipping
        </p>

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
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </button>
      </div>
    </div>
  );
}

const sortedProducts = (items, sortKey) => {
  if (sortKey === "price-asc") return [...items].sort((a, b) => a.price - b.price);
  if (sortKey === "price-desc") return [...items].sort((a, b) => b.price - a.price);
  if (sortKey === "top-rated") return [...items].sort((a, b) => b.rating - a.rating);
  return items;
};

function CategoryDetails({ slug, initialSub }) {
  const department = findDepartment(slug);
  const isAll = slug === "all";
  const valid = isAll || Boolean(department);

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [sub, setSub] = useState(initialSub);
  const [sortKey, setSortKey] = useState("recommended");

  useEffect(() => {
    if (!valid) return;

    let cancelled = false;

    const subcategories = isAll
      ? departments.flatMap((dept) => dept.subcategories.map((item) => item.slug))
      : department.subcategories.map((item) => item.slug);

    const fetches = subcategories.map((categorySlug) =>
      fetch(
        `https://dummyjson.com/products/category/${categorySlug}?limit=8&select=${SELECT}`,
      )
        .then((res) => (res.ok ? res.json() : { products: [] }))
        .then((data) =>
          (data.products ?? []).map((product) => ({
            ...product,
            subcategory: categorySlug,
            freeShipping: false,
          })),
        )
        .catch(() => []),
    );

    Promise.all(fetches)
      .then((results) => {
        if (cancelled) return;
        const fetched = results.flat();
        const local = isAll
          ? mapLocalDeals()
          : mapLocalDeals().filter((deal) => deal.category === slug);

        const seen = new Set();
        const items = [...local, ...fetched].filter((product) => {
          if (seen.has(product.id)) return false;
          seen.add(product.id);
          return true;
        });

        setProducts(items);
        setStatus(items.length > 0 ? "ready" : "error");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [slug, valid, isAll]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeLabel = slug === "all" ? "All departments" : department?.name ?? slug;

  const filteredSub = sub
    ? products.filter((product) => product.subcategory === sub)
    : products;
  const visible = sortedProducts(filteredSub, sortKey);
  const activeSubCategory = sub
    ? department?.subcategories.find((item) => item.slug === sub)
    : null;

  return (
    <div className="min-h-[60vh] bg-slate-50 py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-[13px]">
          <Link
            to="/"
            className="font-medium text-slate-500 transition-colors hover:text-blue-600"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="font-semibold text-slate-900">{activeLabel}</span>
          {activeSubCategory && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              <span className="font-medium text-slate-500">
                {activeSubCategory.label}
              </span>
            </>
          )}
        </nav>

        {/* Title */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <span className="grid size-13 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
            <Layers className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              {activeLabel}
            </h1>
            {valid && (
              <p className="mt-1 text-sm text-slate-500">
                {status === "ready"
                  ? `${products.length} products from trusted Vendly sellers`
                  : "Curated by Vendly's categories"}
              </p>
            )}
            {!valid && (
              <p className="mt-1 text-sm text-amber-600">
                This category doesn't exist. Try another one.
              </p>
            )}
          </div>
        </div>

        {/* Not found */}
        {!valid && (
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-4 py-20 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-800">Category not found</p>
            <p className="mt-1 text-sm text-slate-500">
              We couldn't find a department matching "{slug}".
            </p>
            <Link
              to="/"
              className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Back to home
            </Link>
          </div>
        )}

        {/* Loading */}
        {valid && status === "loading" && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="aspect-square w-full animate-pulse bg-slate-100" />
                <div className="space-y-2.5 p-3.5">
                  <div className="h-2.5 w-1/3 animate-pulse rounded bg-slate-100" />
                  <div className="h-3.5 w-5/6 animate-pulse rounded bg-slate-100" />
                  <div className="h-5 w-1/2 animate-pulse rounded bg-slate-100" />
                  <div className="h-9 w-full animate-pulse rounded-lg bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {valid && status === "error" && (
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-4 py-20 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-800">No products found</p>
            <p className="mt-1 text-sm text-slate-500">
              We couldn't load anything for this category right now.
            </p>
            <Link
              to="/browse/all"
              className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Browse all departments
            </Link>
          </div>
        )}

        {/* Ready */}
        {valid && status === "ready" && (
          <div className="grid gap-6 lg:grid-cols-[230px_1fr]">
            {/* Sidebar (MercadoLibre style) */}
            <aside className="hidden h-fit self-start rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-32 lg:block">
              <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Shop by category
              </p>
              <ul className="mt-2 flex flex-col gap-0.5">
                <li>
                  <Link
                    to="/browse/all"
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      isAll
                        ? "bg-blue-50 font-semibold text-blue-600"
                        : "font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    All departments
                    <ChevronRight className="h-4 w-4 text-slate-300" />
                  </Link>
                </li>
                {departments.map((dept) => (
                  <li key={dept.slug}>
                    <Link
                      to={`/browse/${dept.slug}`}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                        slug === dept.slug
                          ? "bg-blue-50 font-semibold text-blue-600"
                          : "font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                      }`}
                    >
                      {dept.name}
                      <ChevronRight
                        className={`h-4 w-4 ${
                          slug === dept.slug ? "text-blue-400" : "text-slate-300"
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              {department && (
                <>
                  <div className="my-4 h-px bg-slate-100" />
                  <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Filter by
                  </p>
                  <ul className="mt-2 flex flex-col gap-0.5">
                    <li>
                      <button
                        onClick={() => setSub(null)}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          sub === null
                            ? "bg-blue-50 font-semibold text-blue-600"
                            : "font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        All {department.name}
                      </button>
                    </li>
                    {department.subcategories.map((item) => (
                      <li key={item.slug}>
                        <button
                          onClick={() => setSub(item.slug)}
                          className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            sub === item.slug
                              ? "bg-blue-50 font-semibold text-blue-600"
                              : "font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </aside>

            {/* Main */}
            <div>
              {/* Toolbar: sub chips (Temu style) + sort */}
              <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  {department ? (
                    <>
                      <button
                        onClick={() => setSub(null)}
                        className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                          sub === null
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        All
                      </button>
                      {department.subcategories.map((item) => (
                        <button
                          key={item.slug}
                          onClick={() => setSub(item.slug)}
                          className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                            sub === item.slug
                              ? "bg-blue-600 text-white shadow-sm"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </>
                  ) : (
                    departments.map((dept) => (
                      <Link
                        key={dept.slug}
                        to={`/browse/${dept.slug}`}
                        className="rounded-full bg-slate-100 px-3.5 py-1.5 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
                      >
                        {dept.name}
                      </Link>
                    ))
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                  <p className="text-[13px] text-slate-500">
                    <span className="font-semibold text-slate-800">
                      {visible.length}
                    </span>{" "}
                    result{visible.length === 1 ? "" : "s"}
                    {activeSubCategory ? ` in ${activeSubCategory.label}` : ""}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <ArrowUpDown className="h-4 w-4 text-slate-400" />
                    <label htmlFor="sort" className="text-[13px] text-slate-500">
                      Sort by
                    </label>
                    <select
                      id="sort"
                      value={sortKey}
                      onChange={(e) => setSortKey(e.target.value)}
                      className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm outline-none transition-colors hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {visible.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-16 text-center shadow-sm">
                  <p className="text-sm font-semibold text-slate-800">
                    Nothing matched your filter
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try removing the subcategory filter to see more products.
                  </p>
                  <button
                    onClick={() => setSub(null)}
                    className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Clear filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                  {visible.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <CategoryDetails
      key={slug}
      slug={slug}
      initialSub={searchParams.get("sub") || null}
    />
  );
}

export default CategoryPage;
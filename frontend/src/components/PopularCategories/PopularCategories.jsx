import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    count: "1,284 products",
    slug: "electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Fashion",
    count: "3,421 products",
    slug: "fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Home & Living",
    count: "2,156 products",
    slug: "home",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Beauty & Care",
    count: "891 products",
    slug: "beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Sports",
    count: "743 products",
    slug: "sports",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Groceries",
    count: "562 products",
    slug: "groceries",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Automotive",
    count: "421 products",
    slug: "automotive",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "All departments",
    count: "Browse everything",
    slug: "all",
    image:
      "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=600&q=60",
  },
];

function PopularCategories() {
  return (
    <section className="bg-white pt-10 pb-8 lg:pt-12 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4 md:mb-8">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            Popular categories
          </h2>
          <Link
            to="/browse/all"
            className="group/view flex shrink-0 items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            View all
            <span className="inline-block transition-transform duration-300 group-hover/view:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Category tiles - horizontal scroll */}
        <div className="-mx-4 snap-x snap-mandatory overflow-x-auto px-4 pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 md:snap-proximity lg:-mx-8 lg:px-8">
          <div className="flex w-max gap-3.5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/browse/${cat.slug}`}
                className="group w-40 shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-950/5 bg-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 sm:w-44 lg:w-44"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-white via-white/85 to-transparent px-3.5 pb-2.5 pt-7">
                    <p className="text-[13px] font-semibold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                      {cat.name}
                    </p>
                    <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                      {cat.count}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularCategories;
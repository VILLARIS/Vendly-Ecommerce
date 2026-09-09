const categories = [
  {
    name: "Electronics",
    count: "1284 items",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Fashion",
    count: "3421 items",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Home & Living",
    count: "2156 items",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Beauty",
    count: "891 items",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Sports",
    count: "743 items",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Gaming",
    count: "562 items",
    image:
      "https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Books",
    count: "2880 items",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=60",
  },
  {
    name: "Automotive",
    count: "421 items",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=60",
  },
];

function PopularCategories() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Popular categories
          </h2>
          <a
            href="#"
            className="text-sm font-semibold text-purple-600 transition-colors hover:text-purple-700 md:text-base"
          >
            View all →
          </a>
        </div>

        {/* Cards */}
        <div className="-mx-4 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0 lg:overflow-visible">
          <div className="flex w-max gap-4 lg:grid lg:w-full lg:grid-cols-8 lg:gap-5">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href="#"
                className="w-44 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md sm:w-48 lg:w-auto"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="px-3 py-4 text-center">
                  <p className="text-sm font-semibold text-slate-800">{cat.name}</p>
                  <p className="mt-1 text-xs text-gray-400">{cat.count}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularCategories;
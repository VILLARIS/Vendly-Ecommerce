import { Star } from "lucide-react";

const sellers = [
  {
    name: "Samsung",
    initials: "SM",
    colorClass: "bg-blue-600",
    rating: "4.8",
    sales: "15,240 sales",
  },
  {
    name: "Oppo",
    initials: "OP",
    colorClass: "bg-pink-600",
    rating: "4.6",
    sales: "8,420 sales",
  },
  {
    name: "SHEIN",
    initials: "SH",
    colorClass: "bg-green-600",
    rating: "4.7",
    sales: "24,892 sales",
  },
  {
    name: "Sony",
    initials: "SN",
    colorClass: "bg-purple-600",
    rating: "4.9",
    sales: "12,156 sales",
  },
];

function PopularSellers() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <h2 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
          Popular sellers
        </h2>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sellers.map((seller) => (
            <div
              key={seller.name}
              className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center transition-shadow hover:shadow-md"
            >
              {/* Avatar */}
              <div
                className={`grid size-16 place-items-center rounded-full ${seller.colorClass}`}
              >
                <span className="text-lg font-bold text-white">{seller.initials}</span>
              </div>

              {/* Name */}
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                {seller.name}
              </h3>

              {/* Rating */}
              <div className="mt-1 flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {seller.rating}
                </span>
              </div>

              {/* Sales */}
              <p className="mt-1 text-sm text-gray-400">{seller.sales}</p>

              {/* Follow */}
              <button className="mt-5 w-full rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularSellers;
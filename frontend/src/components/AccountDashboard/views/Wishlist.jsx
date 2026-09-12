import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "../../../context/useWishlist";

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

function Wishlist() {
  const { items, count, toggleItem, clearAll } = useWishlist();

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My wishlist</h2>
          <p className="mt-1 text-sm text-gray-500">
            {count === 0
              ? "No items saved yet"
              : `${count} item${count === 1 ? "" : "s"} saved`}
          </p>
        </div>
        {count > 0 && (
          <button
            onClick={clearAll}
            className="text-sm font-medium text-red-600 transition-colors hover:text-red-700"
          >
            Clear all
          </button>
        )}
      </div>

      {count === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-32 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-indigo-50">
            <Heart className="h-7 w-7 text-indigo-500" />
          </span>
          <p className="mt-4 text-lg font-semibold text-slate-800">Your wishlist is empty</p>
          <p className="mt-1 text-sm text-slate-500">
            Add items you love by tapping the heart icon
          </p>
          <Link
            to="/"
            className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-700"
          >
            Browse products
          </Link>
        </div>
      ) : (
        /* Products list */
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`flex flex-col gap-4 p-4 sm:flex-row sm:items-center ${
                i > 0 ? "border-t border-gray-100" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 shrink-0 rounded-lg border border-gray-100 object-cover"
              />

              <div className="min-w-0 flex-1">
                {item.brand && (
                  <p className="text-xs font-semibold text-purple-600">{item.brand}</p>
                )}
                <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-slate-800">
                  {item.title}
                </p>
                <p className="mt-1 text-base font-extrabold text-slate-900 sm:text-sm sm:font-bold">
                  {formatPrice(item.price)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  onClick={() => toggleItem(item)}
                  className="grid size-9 place-items-center rounded-lg border border-gray-200 text-red-500 transition-colors hover:border-red-200 hover:bg-red-50"
                  title="Remove from wishlist"
                >
                  <Heart className="h-4 w-4 fill-red-500" />
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700">
                  <ShoppingCart className="h-4 w-4" />
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
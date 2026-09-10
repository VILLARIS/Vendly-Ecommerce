import { Link } from "react-router-dom";
import { useWishlist } from "../../context/useWishlist";
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Star,
  Settings,
  LogOut,
  ShoppingCart,
} from "lucide-react";

const menuItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/account" },
  { label: "Orders", icon: Package, href: "#" },
  { label: "Wishlist", icon: Heart, href: "#", active: true },
  { label: "Addresses", icon: MapPin, href: "#" },
  { label: "Payment methods", icon: CreditCard, href: "#" },
  { label: "Reviews", icon: Star, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
];

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

function AccountDashboard() {
  const { items, count, toggleItem, clearAll } = useWishlist();

  return (
    <div className="bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <aside className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-1">
            {/* Profile */}
            <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-full bg-indigo-100 text-indigo-600">
                <span className="font-bold">FT</span>
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-900">Farid Tabare</p>
                <p className="truncate text-sm text-gray-500">farid@example.com</p>
              </div>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={
                      item.active
                        ? "flex items-center gap-3 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700"
                        : "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}

              {/* Log out */}
              <button className="mt-4 flex items-center gap-3 rounded-lg border-t border-gray-100 px-3 py-2 pt-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                <LogOut className="h-5 w-5" />
                Log out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My wishlist</h2>
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
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 text-center lg:py-32">
                <Heart className="h-12 w-12 text-slate-400" />
                <p className="mt-4 text-lg font-semibold text-slate-800">
                  Your wishlist is empty
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Add items you love by tapping the heart icon
                </p>
                <Link
                  to="/"
                  className="mt-6 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Browse products
                </Link>
              </div>
            ) : (
              /* Products List */
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                {items.map((item, i) => (
                  <div
                    key={item.id}
                    className={`flex flex-col gap-4 p-4 sm:flex-row sm:items-center ${
                      i > 0 ? "border-t border-gray-100" : ""
                    }`}
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 shrink-0 rounded-lg border border-gray-100 object-cover"
                    />

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      {item.brand && (
                        <p className="text-xs font-semibold text-purple-600">{item.brand}</p>
                      )}
                      <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-slate-800 sm:font-medium">
                        {item.title}
                      </p>
                      <p className="mt-1 text-base font-extrabold text-slate-900 sm:text-sm sm:font-bold">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Actions */}
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
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
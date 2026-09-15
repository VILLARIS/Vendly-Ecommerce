import { useState } from "react";
import { Star } from "lucide-react";
import { useWishlist } from "../../../context/useWishlist";

const ORDERS_KEY = "vendly:orders";
const ADDRESSES_KEY = "vendly:addresses";
const METHODS_KEY = "vendly:payment-methods";

const mockOrders = [
  {
    key: "vd-48291",
    title: "SoundCore Pro Wireless Headphones",
    meta: "VD-48291 · Sep 5, 2026",
    status: "Processing",
    badgeClass: "bg-orange-100 text-orange-700",
    price: "$129.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=60",
  },
  {
    key: "vd-46102",
    title: "Nike Air Max 270 Sneakers",
    meta: "VD-46102 · Aug 28, 2026",
    status: "Delivered",
    badgeClass: "bg-green-100 text-green-700",
    price: "$89.99",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=60",
  },
];

const readStore = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const money = (value) => `$${Number(value).toFixed(2)}`;

const statusClass = {
  Processing: "bg-orange-100 text-orange-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

function Overview({ onNavigate }) {
  const { count } = useWishlist();

  const [orders] = useState(() => readStore(ORDERS_KEY, []));
  const [addressCount] = useState(() => readStore(ADDRESSES_KEY, []).length);
  const [methodsCount] = useState(() => readStore(METHODS_KEY, []).length);

  const displayedOrders = orders.length > 0 ? orders : mockOrders;

  const recentOrders = displayedOrders.map((order) => {
    if (order.items?.length) {
      return {
        key: order.key ?? order.id,
        title: order.items[0].title,
        image: order.items[0].image,
        meta: `${order.id} · ${formatDate(order.date)}`,
        status: order.status,
        badgeClass: statusClass[order.status] ?? "bg-orange-100 text-orange-700",
        price: money(order.total),
        extraCount: order.items.length - 1,
      };
    }
    return order;
  });

  const stats = [
    { value: displayedOrders.length, label: "Orders" },
    { value: null, label: "Wishlist items" },
    { value: methodsCount, label: "Payment methods" },
    { value: addressCount, label: "Saved addresses" },
  ];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Account overview</h2>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 text-center"
          >
            <p className="text-3xl font-bold text-slate-900">
              {stat.label === "Wishlist items" ? count : stat.value}
            </p>
            <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <p className="font-semibold text-slate-900">Recent orders</p>
          <button
            onClick={() => onNavigate && onNavigate("orders")}
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            View all
          </button>
        </div>

        {recentOrders.map((order) => (
          <div
            key={order.key}
            className="flex items-center justify-between border-b border-slate-100 p-4 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <img
                src={order.image}
                alt={order.title}
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-slate-900">
                  {order.title}
                  {order.extraCount > 0 && (
                    <span className="ml-1 text-sm font-normal text-slate-400">
                      +{order.extraCount} more
                    </span>
                  )}
                </p>
                <p className="text-sm text-slate-500">{order.meta}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${order.badgeClass}`}
              >
                {order.status}
              </span>
              <span className="text-sm font-bold text-slate-900">{order.price}</span>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-1 px-4 py-3 text-xs text-slate-400">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          Rated 4.8 across {recentOrders.length} recent orders
        </div>
      </div>
    </div>
  );
}

export default Overview;
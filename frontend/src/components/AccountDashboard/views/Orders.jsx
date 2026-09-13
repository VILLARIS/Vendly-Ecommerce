import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag } from "lucide-react";

const STORAGE_KEY = "vendly:orders";

const money = (value) => `$${Number(value).toFixed(2)}`;

const statusClass = {
  Processing: "bg-orange-100 text-orange-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};

const statusClassFor = (status) => statusClass[status] ?? statusClass.Processing;

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

function Orders() {
  const [orders] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Orders</h2>
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-32 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-indigo-50">
            <Package className="h-7 w-7 text-indigo-500" />
          </span>
          <p className="mt-4 text-lg font-semibold text-slate-800">
            You don't have any orders yet
          </p>
          <p className="mt-1 text-sm text-slate-500">
            When you place an order it will show up here.
          </p>
          <Link
            to="/"
            className="mt-6 flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            <ShoppingBag className="h-4 w-4" />
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
          <p className="mt-1 text-sm text-gray-500">
            Track and review the orders you've placed.
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500 ring-1 ring-gray-200">
          {orders.length} placed
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
          >
            {/* Order header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/60 px-5 py-3.5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <p className="text-sm font-bold text-slate-900">{order.id}</p>
                <p className="text-xs text-slate-500">Placed {formatDate(order.date)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClassFor(order.status)}`}
                >
                  {order.status}
                </span>
                <p className="text-sm font-extrabold text-slate-900">{money(order.total)}</p>
              </div>
            </div>

            {/* Items */}
            <ul className="divide-y divide-gray-100">
              {order.items?.map((item) => (
                <li
                  key={`${order.id}-${item.id}`}
                  className="flex items-center gap-4 px-5 py-3"
                >
                  <Link
                    to={`/product/${item.id}`}
                    className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-1"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${item.id}`}
                      className="line-clamp-1 text-sm font-semibold text-slate-800 hover:text-indigo-600"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-slate-500">
                      {item.brand} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-slate-900">
                    {money(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
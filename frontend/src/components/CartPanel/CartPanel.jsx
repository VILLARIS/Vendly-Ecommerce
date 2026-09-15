import { Link } from "react-router-dom";
import { X, ShoppingCart, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { useCart } from "../../context/useCart";

const money = (value) => `$${Number(value).toFixed(2)}`;
const FREE_SHIPPING_THRESHOLD = 50;

function CartPanel() {
  const {
    items,
    count,
    subtotal,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl shadow-slate-900/20 transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-blue-50">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </span>
              <div>
                <p className="text-lg font-bold text-slate-900">Shopping cart</p>
                <p className="text-xs text-slate-500">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="grid size-9 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
              title="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-blue-50">
                <ShoppingCart className="h-7 w-7 text-blue-500" />
              </span>
              <p className="text-base font-semibold text-slate-800">Your cart is empty</p>
              <p className="text-sm text-slate-500">
                Items you add will appear here, ready to check out.
              </p>
              <button
                onClick={closeCart}
                className="mt-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Start shopping
              </button>
            </div>
          ) : (
            <>
              {/* Free shipping progress */}
              <div className="border-b border-slate-100 px-6 py-3">
                <p className="text-xs text-slate-500">
                  {remaining > 0 ? (
                    <>
                      Add{" "}
                      <span className="font-semibold text-blue-600">{money(remaining)}</span> more
                      for free shipping
                    </>
                  ) : (
                    <span className="font-semibold text-emerald-600">
                      You've unlocked free shipping
                    </span>
                  )}
                </p>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Items */}
              <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto px-6">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 py-3">
                    <Link
                      to={`/product/${item.id}`}
                      onClick={closeCart}
                      className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50 p-1"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-semibold text-slate-800">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500">{item.brand}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex w-fit items-center justify-between gap-2 rounded-md border border-slate-200 px-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="grid size-7 place-items-center text-slate-500 transition-colors hover:text-blue-600"
                            title="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-6 text-center text-sm font-semibold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="grid size-7 place-items-center text-slate-500 transition-colors hover:text-blue-600"
                            title="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1 text-xs font-medium text-red-500 transition-colors hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>

                    <p className="shrink-0 text-sm font-bold text-slate-900">
                      {money(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="border-t border-slate-100 px-6 py-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-medium text-slate-500">Subtotal</p>
                  <p className="text-xl font-extrabold text-slate-900">
                    {money(subtotal)}
                  </p>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={closeCart}
                    className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Continue shopping
                  </button>
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </>
          )}
      </aside>
    </>
  );
}

export default CartPanel;
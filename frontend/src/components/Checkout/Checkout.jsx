import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  MapPin,
  CreditCard,
  Truck,
  Zap,
  Check,
  Plus,
  X,
  CheckCircle2,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import { useCart } from "../../context/useCart";

const money = (value) => `$${Number(value).toFixed(2)}`;

const ADDRESSES_KEY = "vendly:addresses";
const METHODS_KEY = "vendly:payment-methods";
const ORDERS_KEY = "vendly:orders";

const defaultAddresses = [
  {
    id: 1,
    label: "Home",
    isDefault: true,
    street: "123 Main St, Apt 4B",
    city: "San Francisco, CA 94102",
    country: "United States",
  },
  {
    id: 2,
    label: "Work",
    isDefault: false,
    street: "456 Market St, Floor 12",
    city: "San Francisco, CA 94105",
    country: "United States",
  },
];

const defaultMethods = [
  { id: 1, network: "Visa", holder: "Farid Tabare", last4: "4242", expiry: "12/27", isDefault: true },
  { id: 2, network: "Mastercard", holder: "Farid Tabare", last4: "4830", expiry: "09/26", isDefault: false },
];

const networks = [
  { label: "Visa", gradient: "from-indigo-500 to-blue-600" },
  { label: "Mastercard", gradient: "from-red-500 to-orange-500" },
  { label: "Amex", gradient: "from-slate-700 to-slate-900" },
];

const networkGradient = (network) =>
  networks.find((n) => n.label === network)?.gradient ?? networks[0].gradient;

const readStore = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

const deliveryOptions = [
  {
    id: "free",
    icon: Truck,
    title: "Standard delivery",
    detail: "Arrives in 3-5 business days",
    price: 0,
  },
  {
    id: "express",
    icon: Zap,
    title: "Express delivery",
    detail: "Arrives in 1-2 business days",
    price: 9.99,
  },
];

function SectionCard({ step, icon: Icon, title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo-50 text-indigo-600">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="flex items-center gap-2 text-base font-bold text-slate-900">
            <span className="text-xs font-bold text-indigo-500">STEP {step}</span>
            {title}
          </p>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function RadioCard({ selected, onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
        selected
          ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600"
          : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
      } ${className}`}
    >
      <span
        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 ${
          selected ? "border-indigo-600" : "border-gray-300"
        }`}
      >
        {selected && <span className="size-2.5 rounded-full bg-indigo-600" />}
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </button>
  );
}

function Checkout() {
  const { items, count, subtotal, clearCart } = useCart();

  const [addresses] = useState(() => readStore(ADDRESSES_KEY, defaultAddresses));
  const [methods] = useState(() => readStore(METHODS_KEY, defaultMethods));

  const [contact, setContact] = useState({ name: "", email: "" });
  const [addressId, setAddressId] = useState(
    () => (readStore(ADDRESSES_KEY, defaultAddresses).find((a) => a.isDefault) ?? addresses[0])?.id ?? null,
  );
  const [showNewAddress, setShowNewAddress] = useState(addresses.length === 0);
  const [newAddress, setNewAddress] = useState({ street: "", city: "", country: "" });

  const [delivery, setDelivery] = useState("free");

  const [methodId, setMethodId] = useState(
    () => (readStore(METHODS_KEY, defaultMethods).find((m) => m.isDefault) ?? methods[0])?.id ?? null,
  );
  const [showNewCard, setShowNewCard] = useState(methods.length === 0);
  const [newCard, setNewCard] = useState({ network: "Visa", holder: "", number: "", expiry: "", cvc: "" });

  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const shippingCost = deliveryOptions.find((o) => o.id === delivery)?.price ?? 0;
  const total = subtotal + shippingCost;

  const updateContact = (field) => (e) =>
    setContact((prev) => ({ ...prev, [field]: e.target.value }));
  const updateAddress = (field) => (e) =>
    setNewAddress((prev) => ({ ...prev, [field]: e.target.value }));
  const updateCard = (field) => (e) =>
    setNewCard((prev) => ({ ...prev, [field]: e.target.value }));

  const cardValid =
    newCard.holder.trim() &&
    newCard.number.replace(/\D/g, "").length >= 12 &&
    newCard.expiry.length >= 5 &&
    newCard.cvc.replace(/\D/g, "").length >= 3;

  const placeOrder = (e) => {
    e.preventDefault();
    setError("");

    if (!contact.name.trim() || !contact.email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    if (
      !showNewAddress
        ? !addressId
        : !newAddress.street.trim() || !newAddress.city.trim() || !newAddress.country.trim()
    ) {
      setError("Please provide a valid shipping address.");
      return;
    }
    if (!showNewCard ? !methodId : !cardValid) {
      setError("Please provide valid payment details.");
      return;
    }

    const orderId = `VL-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderEntry = {
      id: orderId,
      date: new Date().toISOString(),
      status: "Processing",
      itemCount: count,
      total,
      items: items.map((item) => ({ ...item })),
    };

    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      const saved = raw ? JSON.parse(raw) : [];
      localStorage.setItem(ORDERS_KEY, JSON.stringify([orderEntry, ...saved]));
    } catch {
      /* storage unavailable */
    }

    setOrder({
      id: orderId,
      total,
      itemCount: count,
      email: contact.email.trim(),
    });
    clearCart();
    window.scrollTo(0, 0);
  };

  if (order) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-lg px-4">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white text-center shadow-sm">
            <div className="flex flex-col items-center gap-3 px-8 py-10">
              <span className="grid size-16 place-items-center rounded-full bg-emerald-50">
                <CheckCircle2 className="h-9 w-9 text-emerald-600" />
              </span>
              <h1 className="text-2xl font-bold text-slate-900">Order placed</h1>
              <p className="text-sm text-slate-500">
                Thank you, {contact.name || "there"}! Your order is confirmed and will be
                processed shortly.
              </p>
            </div>

            <div className="grid grid-cols-2 border-t border-gray-100">
              <div className="border-r border-gray-100 px-6 py-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Order number</p>
                <p className="mt-1 text-sm font-bold text-slate-900">{order.id}</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Total paid</p>
                <p className="mt-1 text-sm font-bold text-slate-900">{money(order.total)}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 px-8 py-6">
              <p className="text-xs text-slate-500">
                A confirmation email was sent to{" "}
                <span className="font-medium text-slate-700">{order.email || "your inbox"}</span>.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Continue shopping
                </Link>
                <Link
                  to="/account"
                  className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  View my orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-lg px-4 text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-indigo-50">
            <ShoppingBag className="h-8 w-8 text-indigo-500" />
          </span>
          <h1 className="mt-4 text-xl font-bold text-slate-900">Your cart is empty</h1>
          <p className="mt-1 text-sm text-slate-500">
            Add some products before heading to checkout.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <form onSubmit={placeOrder} className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
            <p className="mt-1 text-sm text-slate-500">
              Complete your order in a few simple steps.
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 ring-1 ring-gray-200">
            <Lock className="h-3.5 w-3.5 text-emerald-600" />
            Secure checkout
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left - Steps */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Step 1 - Shipping */}
            <SectionCard
              step={1}
              icon={MapPin}
              title="Shipping details"
              subtitle="Where should we deliver your order?"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={updateContact("name")}
                    placeholder="Farid Tabare"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={updateContact("email")}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-sm font-semibold text-gray-700">Shipping address</p>

                {addresses.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {addresses.map((address) => (
                      <RadioCard
                        key={address.id}
                        selected={!showNewAddress && addressId === address.id}
                        onClick={() => {
                          setShowNewAddress(false);
                          setAddressId(address.id);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-slate-900">{address.label}</p>
                          {address.isDefault && (
                            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          {address.street}, {address.city}, {address.country}
                        </p>
                      </RadioCard>
                    ))}
                  </div>
                )}

                {!showNewAddress ? (
                  <button
                    type="button"
                    onClick={() => setShowNewAddress(true)}
                    className="mt-3 flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
                  >
                    <Plus className="h-4 w-4" />
                    Use a different address
                  </button>
                ) : (
                  <div className="mt-3 flex flex-col gap-4 rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-800">New address</p>
                      {addresses.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setShowNewAddress(false)}
                          className="grid size-7 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-gray-100 hover:text-slate-600"
                          title="Cancel"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={newAddress.street}
                      onChange={updateAddress("street")}
                      placeholder="Street address, Apt"
                      className={inputClass}
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={updateAddress("city")}
                        placeholder="City, State, ZIP"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        value={newAddress.country}
                        onChange={updateAddress("country")}
                        placeholder="Country"
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>

            {/* Step 2 - Delivery */}
            <SectionCard
              step={2}
              icon={Truck}
              title="Delivery method"
              subtitle="Choose how fast you want your order"
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {deliveryOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <RadioCard
                      key={option.id}
                      selected={delivery === option.id}
                      onClick={() => setDelivery(option.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-indigo-600" />
                          <p className="text-sm font-semibold text-slate-900">{option.title}</p>
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {option.price === 0 ? "Free" : money(option.price)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{option.detail}</p>
                    </RadioCard>
                  );
                })}
              </div>
            </SectionCard>

            {/* Step 3 - Payment */}
            <SectionCard
              step={3}
              icon={CreditCard}
              title="Payment method"
              subtitle="All transactions are encrypted and secure"
            >
              {methods.length > 0 && (
                <div className="flex flex-col gap-3">
                  {methods.map((method) => (
                    <RadioCard
                      key={method.id}
                      selected={!showNewCard && methodId === method.id}
                      onClick={() => {
                        setShowNewCard(false);
                        setMethodId(method.id);
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`grid h-8 w-12 place-items-center rounded-md bg-gradient-to-br text-white ${networkGradient(method.network)}`}
                          >
                            <CreditCard className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {method.network} •••• {method.last4}
                            </p>
                            <p className="text-xs text-slate-500">
                              {method.holder} · Exp {method.expiry}
                            </p>
                          </div>
                        </div>
                        {method.isDefault && (
                          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                            Default
                          </span>
                        )}
                      </div>
                    </RadioCard>
                  ))}
                </div>
              )}

              {!showNewCard ? (
                <button
                  type="button"
                  onClick={() => setShowNewCard(true)}
                  className="mt-3 flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
                >
                  <Plus className="h-4 w-4" />
                  Pay with a different card
                </button>
              ) : (
                <div className="mt-3 flex flex-col gap-4 rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">New card</p>
                    {methods.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowNewCard(false)}
                        className="grid size-7 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-gray-100 hover:text-slate-600"
                        title="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {networks.map((network) => {
                      const selected = newCard.network === network.label;
                      return (
                        <button
                          type="button"
                          key={network.label}
                          onClick={() =>
                            updateCard("network")({ target: { value: network.label } })
                          }
                          className={`flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-sm font-medium transition-all ${
                            selected
                              ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-gray-50"
                          }`}
                        >
                          <CreditCard className="h-4 w-4" />
                          {network.label}
                        </button>
                      );
                    })}
                  </div>

                  <input
                    type="text"
                    value={newCard.holder}
                    onChange={updateCard("holder")}
                    placeholder="Cardholder name"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={newCard.number}
                    onChange={updateCard("number")}
                    placeholder="4242 4242 4242 4242"
                    className={inputClass}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={newCard.expiry}
                      onChange={updateCard("expiry")}
                      placeholder="MM/YY"
                      className={inputClass}
                    />
                    <input
                      type="password"
                      inputMode="numeric"
                      value={newCard.cvc}
                      onChange={updateCard("cvc")}
                      placeholder="CVC"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}
            </SectionCard>
          </div>

          {/* Right - Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">Order summary</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                {count} {count === 1 ? "item" : "items"} in your cart
              </p>

              <ul className="mt-4 max-h-64 divide-y divide-gray-100 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 py-3">
                    <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-1">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                      <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </span>
                    <p className="line-clamp-2 min-w-0 flex-1 text-xs font-medium text-slate-700">
                      {item.title}
                    </p>
                    <p className="shrink-0 text-xs font-semibold text-slate-900">
                      {money(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium text-slate-900">{money(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-medium text-slate-900">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600">Free</span>
                    ) : (
                      money(shippingCost)
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between border-t border-gray-100 pt-4">
                <span className="text-sm font-medium text-slate-500">Total</span>
                <span className="text-2xl font-extrabold text-slate-900">{money(total)}</span>
              </div>

              {error && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                <Lock className="h-4 w-4" />
                Place order · {money(total)}
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Your data is protected
              </div>
            </div>
          </div>
        </div>

        {/* Continue shopping */}
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Continue shopping
        </Link>
      </form>
    </div>
  );
}

export default Checkout;
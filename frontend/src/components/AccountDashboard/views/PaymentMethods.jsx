import { useEffect, useState } from "react";
import { CreditCard, Plus, X, Pencil, Trash2 } from "lucide-react";

const STORAGE_KEY = "vendly:payment-methods";

const defaultMethods = [
  {
    id: 1,
    network: "Visa",
    holder: "Farid Tabare",
    last4: "4242",
    expiry: "12/27",
    isDefault: true,
  },
  {
    id: 2,
    network: "Mastercard",
    holder: "Farid Tabare",
    last4: "4830",
    expiry: "09/26",
    isDefault: false,
  },
];

const networks = [
  { label: "Visa", gradient: "from-indigo-500 to-blue-600" },
  { label: "Mastercard", gradient: "from-red-500 to-orange-500" },
  { label: "Amex", gradient: "from-slate-700 to-slate-900" },
];

const emptyForm = {
  network: "Visa",
  holder: "",
  number: "",
  expiry: "",
  cvc: "",
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

const networkGradient = (network) =>
  networks.find((n) => n.label === network)?.gradient ?? networks[0].gradient;

function PaymentMethods() {
  const [methods, setMethods] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultMethods;
    } catch {
      return defaultMethods;
    }
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(methods));
    } catch {
      /* storage unavailable */
    }
  }, [methods]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (method) => {
    setEditing(method);
    setForm({
      network: method.network,
      holder: method.holder,
      number: `\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ${method.last4}`,
      expiry: method.expiry,
      cvc: "",
    });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const digits = form.number.replace(/\D/g, "");
    if (
      !form.holder.trim() ||
      digits.length < 12 ||
      form.expiry.length < 5 ||
      form.cvc.replace(/\D/g, "").length < 3
    ) {
      return;
    }
    setConfirm({ type: editing ? "edit" : "create", method: editing });
  };

  const requestRemove = (method) => setConfirm({ type: "delete", method });

  const applyConfirm = () => {
    if (!confirm) return;

    if (confirm.type === "delete") {
      setMethods((prev) => {
        const next = prev.filter((m) => m.id !== confirm.method.id);
        if (confirm.method.isDefault && next.length) next[0].isDefault = true;
        return next;
      });
    } else {
      const digits = form.number.replace(/\D/g, "");
      if (confirm.type === "create") {
        const newId = methods.length ? Math.max(...methods.map((m) => m.id)) + 1 : 1;
        setMethods((prev) => [
          ...prev,
          {
            id: newId,
            network: form.network,
            holder: form.holder.trim(),
            last4: digits.slice(-4),
            expiry: form.expiry,
            isDefault: prev.length === 0,
          },
        ]);
      } else {
        setMethods((prev) =>
          prev.map((m) =>
            m.id === confirm.method.id
              ? {
                  ...m,
                  network: form.network,
                  holder: form.holder.trim(),
                  last4: digits.slice(-4),
                  expiry: form.expiry,
                }
              : m,
          ),
        );
      }
      setModalOpen(false);
    }
    setConfirm(null);
  };

  const preview = confirm
    ? confirm.type === "delete"
      ? confirm.method
      : { network: form.network, last4: form.number.replace(/\D/g, "").slice(-4) }
    : null;

  const confirmTitle = confirm
    ? confirm.type === "delete"
      ? "Remove payment method?"
      : confirm.type === "create"
        ? "Add payment method"
        : "Save changes?"
    : "";

  const confirmText = confirm
    ? confirm.type === "delete"
      ? `Your ${confirm.method.network} ending in ${confirm.method.last4} will be removed.`
      : confirm.type === "create"
        ? "This payment method will be added to your account."
        : `Your changes to the ${confirm.method.network} ending in ${confirm.method.last4} will be saved.`
    : "";

  const confirmAction =
    confirm?.type === "delete"
      ? "Remove"
      : confirm?.type === "create"
        ? "Add"
        : "Save changes";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage the cards used to pay for your orders.
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500 ring-1 ring-gray-200">
          {methods.length} saved
        </span>
      </div>

      {methods.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-32 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-indigo-50">
            <CreditCard className="h-7 w-7 text-indigo-500" />
          </span>
          <p className="mt-4 text-lg font-semibold text-slate-800">
            You don't have any payment methods yet
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Add a card to check out faster on your next order.
          </p>
          <button
            onClick={openCreate}
            className="mt-6 flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Add payment method
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {methods.map((method) => (
            <div
              key={method.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-200/70"
            >
              <div
                className={`bg-gradient-to-br p-5 text-white ${networkGradient(method.network)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    <p className="text-sm font-bold">{method.network}</p>
                  </div>
                  {method.isDefault && (
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">
                      Default
                    </span>
                  )}
                </div>

                <p className="mt-6 text-lg font-semibold tracking-widest">
                  {"\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 "}
                  {method.last4}
                </p>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/60">
                      Card holder
                    </p>
                    <p className="text-sm font-medium">{method.holder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-white/60">
                      Expires
                    </p>
                    <p className="text-sm font-medium">{method.expiry}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 px-4 py-3">
                <button
                  onClick={() => openEdit(method)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-600 transition-all hover:bg-indigo-50"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => requestRemove(method)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={openCreate}
            className="group flex min-h-[170px] w-full flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-gray-300 p-6 text-slate-500 transition-all hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-600"
          >
            <span className="grid size-12 place-items-center rounded-full bg-gray-100 transition-all group-hover:scale-110 group-hover:bg-white">
              <Plus className="h-6 w-6" />
            </span>
            <span className="text-sm font-semibold">Add payment method</span>
            <span className="text-xs text-slate-400 transition-colors group-hover:text-indigo-500">
              Adds a new card to your account
            </span>
          </button>
        </div>
      )}

      {/* Payment Method Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                  <CreditCard className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-gray-900">
                  {editing ? "Edit payment method" : "Add payment method"}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="grid size-8 place-items-center rounded-lg text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Network</span>
                <div className="grid grid-cols-3 gap-2">
                  {networks.map((network) => {
                    const selected = form.network === network.label;
                    return (
                      <button
                        type="button"
                        key={network.label}
                        onClick={() =>
                          updateField("network")({ target: { value: network.label } })
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
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Cardholder name
                </label>
                <input
                  type="text"
                  value={form.holder}
                  onChange={updateField("holder")}
                  placeholder="Farid Tabare"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Card number
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.number}
                  onChange={updateField("number")}
                  placeholder="4242 4242 4242 4242"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={form.expiry}
                    onChange={updateField("expiry")}
                    placeholder="12/27"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">CVC</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    value={form.cvc}
                    onChange={updateField("cvc")}
                    placeholder="\u2022\u2022\u2022"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-3 flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition-all hover:bg-indigo-700"
                >
                  {editing ? "Save changes" : "Add payment method"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {confirm && preview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-full ${
                  confirm.type === "delete" ? "bg-red-50 text-red-600" : "bg-indigo-50 text-indigo-600"
                }`}
              >
                {confirm.type === "delete" ? (
                  <Trash2 className="h-5 w-5" />
                ) : (
                  <CreditCard className="h-5 w-5" />
                )}
              </span>
              <div>
                <h3 className="text-base font-bold text-gray-900">{confirmTitle}</h3>
                <p className="mt-1 text-sm text-gray-500">{confirmText}</p>
              </div>
            </div>

            <div
              className={`mt-4 flex items-center justify-between rounded-xl bg-gradient-to-br p-4 text-white ${networkGradient(preview.network)}`}
            >
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <p className="text-sm font-bold">{preview.network}</p>
              </div>
              <p className="text-sm font-semibold tracking-widest">
                {"\u2022\u2022\u2022\u2022 "}
                {preview.last4}
              </p>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setConfirm(null)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={applyConfirm}
                className={`rounded-lg px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all ${
                  confirm.type === "delete"
                    ? "bg-red-600 shadow-red-600/30 hover:bg-red-700"
                    : "bg-indigo-600 shadow-indigo-600/30 hover:bg-indigo-700"
                }`}
              >
                {confirmAction}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentMethods;
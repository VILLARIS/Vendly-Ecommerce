import { useEffect, useState } from "react";
import {
  MapPin,
  Plus,
  X,
  Pencil,
  Trash2,
  House,
  Briefcase,
  Trees,
  Dumbbell,
  Mountain,
} from "lucide-react";

const STORAGE_KEY = "vendly:addresses";

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

const addressCategories = [
  { label: "Home", icon: House },
  { label: "Work", icon: Briefcase },
  { label: "Park", icon: Trees },
  { label: "Gym", icon: Dumbbell },
  { label: "Cabin", icon: Mountain },
  { label: "Other", icon: MapPin },
];

const labelIcon = (label) =>
  addressCategories.find((cat) => cat.label.toLowerCase() === label.toLowerCase())?.icon ??
  MapPin;

const emptyForm = { label: "", street: "", city: "", country: "" };

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

function Addresses() {
  const [addresses, setAddresses] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultAddresses;
    } catch {
      return defaultAddresses;
    }
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
    } catch {
      /* storage unavailable */
    }
  }, [addresses]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (address) => {
    setEditing(address);
    setForm({
      label: address.label,
      street: address.street,
      city: address.city,
      country: address.country,
    });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const visibleCategories =
    form.label && !addressCategories.some((cat) => cat.label === form.label)
      ? [...addressCategories, { label: form.label, icon: MapPin }]
      : addressCategories;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.label.trim() ||
      !form.street.trim() ||
      !form.city.trim() ||
      !form.country.trim()
    ) {
      return;
    }
    setConfirm({ type: editing ? "edit" : "create", address: editing });
  };

  const requestRemove = (address) => setConfirm({ type: "delete", address });

  const applyConfirm = () => {
    if (!confirm) return;

    if (confirm.type === "delete") {
      setAddresses((prev) => {
        const next = prev.filter((a) => a.id !== confirm.address.id);
        if (confirm.address.isDefault && next.length) next[0].isDefault = true;
        return next;
      });
    } else if (confirm.type === "create") {
      const newId = addresses.length ? Math.max(...addresses.map((a) => a.id)) + 1 : 1;
      setAddresses((prev) => [...prev, { id: newId, ...form, isDefault: false }]);
      setModalOpen(false);
    } else {
      setAddresses((prev) =>
        prev.map((a) => (a.id === confirm.address.id ? { ...a, ...form } : a)),
      );
      setModalOpen(false);
    }
    setConfirm(null);
  };

  const confirmTitle = confirm
    ? confirm.type === "delete"
      ? "Remove address?"
      : confirm.type === "create"
        ? "Add new address"
        : "Save changes?"
    : "";

  const confirmText = confirm
    ? confirm.type === "delete"
      ? `"${confirm.address.label}" will be permanently removed from your saved addresses.`
      : confirm.type === "create"
        ? "This address will be added to your saved addresses."
        : `Your changes to "${confirm.address.label}" will be saved.`
    : "";

  const confirmAction =
    confirm?.type === "delete"
      ? "Remove"
      : confirm?.type === "create"
        ? "Add address"
        : "Save changes";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Saved addresses</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage the shipping addresses used for your orders.
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
          {addresses.length} saved
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {addresses.map((address) => {
          const Icon = labelIcon(address.label);
          return (
            <div
              key={address.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/70"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="font-bold text-slate-900">{address.label}</p>
                </div>
                {address.isDefault && (
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    Default
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-start gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-blue-400" />
                <div className="text-sm leading-relaxed text-slate-600">
                  <p>{address.street}</p>
                  <p>{address.city}</p>
                  <p>{address.country}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                <button
                  onClick={() => openEdit(address)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition-all hover:bg-blue-50"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => requestRemove(address)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        <button
          onClick={openCreate}
          className={`group flex min-h-[170px] w-full flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-slate-300 p-6 text-slate-500 transition-all hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-600 ${
            addresses.length === 0 ? "md:col-span-2" : ""
          }`}
        >
          <span className="grid size-12 place-items-center rounded-full bg-slate-100 transition-all group-hover:scale-110 group-hover:bg-white">
            <Plus className="h-6 w-6" />
          </span>
          <span className="text-sm font-semibold">Add new address</span>
          <span className="text-xs text-slate-400 transition-colors group-hover:text-blue-500">
            Creates a new shipping address
          </span>
        </button>
      </div>

      {/* Address Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {editing ? "Edit address" : "Add new address"}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="grid size-8 place-items-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">Label</span>
                <div className="grid grid-cols-3 gap-2">
                  {visibleCategories.map((cat) => {
                    const Icon = cat.icon;
                    const selected = form.label === cat.label;
                    return (
                      <button
                        type="button"
                        key={cat.label}
                        onClick={() =>
                          updateField("label")({ target: { value: cat.label } })
                        }
                        className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-all ${
                          selected
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Street address
                </label>
                <input
                  type="text"
                  value={form.street}
                  onChange={updateField("street")}
                  placeholder="123 Main St, Apt 4B"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  City / State / ZIP
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={updateField("city")}
                  placeholder="San Francisco, CA 94102"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Country
                </label>
                <input
                  type="text"
                  value={form.country}
                  onChange={updateField("country")}
                  placeholder="United States"
                  className={inputClass}
                />
              </div>

              <div className="mt-3 flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/30 transition-all hover:bg-blue-700"
                >
                  {editing ? "Save changes" : "Add address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {confirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-full ${
                  confirm.type === "delete" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                }`}
              >
                {confirm.type === "delete" ? (
                  <Trash2 className="h-5 w-5" />
                ) : (
                  <MapPin className="h-5 w-5" />
                )}
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">{confirmTitle}</h3>
                <p className="mt-1 text-sm text-slate-500">{confirmText}</p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-slate-50 p-3 ring-1 ring-slate-100">
              <p className="text-sm font-semibold text-slate-800">
                {(confirm.type === "delete" ? confirm.address : form).label}
              </p>
              <p className="mt-0.5 line-clamp-1 text-sm text-slate-400">
                {(confirm.type === "delete" ? confirm.address : form).street} ·{" "}
                {(confirm.type === "delete" ? confirm.address : form).city}
              </p>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setConfirm(null)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={applyConfirm}
                className={`rounded-lg px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all ${
                  confirm.type === "delete"
                    ? "bg-red-600 shadow-red-600/30 hover:bg-red-700"
                    : "bg-blue-600 shadow-blue-600/30 hover:bg-blue-700"
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

export default Addresses;
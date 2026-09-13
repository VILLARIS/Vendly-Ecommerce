import { useNavigate, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
} from "lucide-react";
import Overview from "./views/Overview";
import Orders from "./views/Orders";
import Wishlist from "./views/Wishlist";
import Addresses from "./views/Addresses";
import PaymentMethods from "./views/PaymentMethods";

const menuItems = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "orders", label: "Orders", icon: Package },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "payments", label: "Payment methods", icon: CreditCard },
];

function AccountDashboard() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const active = tab || "overview";

  const selectTab = (key) => {
    navigate(key === "overview" ? "/account" : `/account/${key}`);
  };

  const renderView = () => {
    switch (active) {
      case "overview":
        return <Overview onNavigate={selectTab} />;
      case "orders":
        return <Orders />;
      case "addresses":
        return <Addresses />;
      case "payments":
        return <PaymentMethods />;
      case "wishlist":
        return <Wishlist />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-1">
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
                const isActive = active === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => selectTab(item.key)}
                    className={
                      isActive
                        ? "flex items-center gap-3 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700"
                        : "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-gray-900"
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}

              {/* Log out */}
              <button className="mt-4 flex items-center gap-3 rounded-lg border-t border-gray-100 px-3 py-2 pt-4 text-sm font-medium text-red-600 transition-all hover:bg-red-50">
                <LogOut className="h-5 w-5" />
                Log out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderView()}</div>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/useWishlist";
import { useCart } from "../../context/useCart";
import Logo from "../../assets/Navbar/Logo.jpg";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { departments, findDepartment } from "../../data/categories";

function Navbar() {
  const { count } = useWishlist();
  const { count: cartCount, openCart } = useCart();
  const [panel, setPanel] = useState(null);

  const closePanel = () => setPanel(null);

  const allPanel = panel === "all";
  const flyout = !allPanel ? findDepartment(panel) : null;

  return (
    <nav className="bg-white w-full shadow-sm sticky top-0 z-50">
      {/* Level 1 - Top Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 gap-4">
        {/* Left - Brand */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={Logo} alt="Vendly Logo" className="h-10 w-10 object-contain" />
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            VENDLY
          </h1>
        </Link>

        {/* Center - Search Bar */}
        <div className="flex flex-1 max-w-2xl mx-4">
          <div className="flex w-full items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition-all">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-50 outline-none placeholder:text-gray-400"
            />
            <button className="bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 flex items-center justify-center">
              <Search className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/account/wishlist"
            className="relative text-gray-600 hover:text-purple-600 transition-colors"
            title="Wishlist"
          >
            <Heart className={`h-6 w-6 ${count > 0 ? "fill-purple-600 text-purple-600" : ""}`} />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={openCart}
            className="relative text-gray-600 hover:text-purple-600 transition-colors"
            title="Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <Link
            to="/account"
            className="flex items-center gap-1.5 text-gray-600 hover:text-purple-600 transition-colors"
            title="Account"
          >
            <User className="h-6 w-6" />
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">Account</span>
          </Link>

          <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
            Sell on Vendly
          </button>
        </div>
      </div>

      {/* Level 2 - Categories Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative" onMouseLeave={closePanel}>
            <div className="flex items-center py-1.5">
              {/* All (Amazon style) */}
              <button
                onClick={() => setPanel(allPanel ? null : "all")}
                onMouseEnter={() => setPanel("all")}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-semibold transition-colors ${
                  allPanel
                    ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                    : "border-transparent text-slate-700 hover:border-gray-200 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                <Menu className="h-4 w-4" />
                All
              </button>

              <span className="hidden h-5 w-px shrink-0 bg-gray-200 sm:block" />

              {/* Departments (Temu style, horizontally scrollable) */}
              <ul className="flex flex-1 items-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {departments.map((dept) => (
                  <li key={dept.slug} onMouseEnter={() => setPanel(dept.slug)}>
                    <Link
                      to={`/browse/${dept.slug}`}
                      onClick={closePanel}
                      className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                        panel === dept.slug
                          ? "bg-indigo-50 font-semibold text-indigo-700"
                          : "text-slate-600 hover:bg-gray-50 hover:text-indigo-600"
                      }`}
                    >
                      {dept.name}
                      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Flyout */}
            {(allPanel || flyout) && (
              <div className="absolute inset-x-0 top-full z-40 mt-0.5 rounded-b-2xl border border-t-0 border-gray-100 bg-white shadow-2xl ring-1 ring-black/5">
                <div className="mx-auto max-w-7xl px-8 py-6">
                  {/* Panel header */}
                  <div className="flex items-end justify-between gap-6 border-b border-gray-100 pb-4">
                    <div>
                      <p className="text-base font-extrabold tracking-tight text-slate-900">
                        {allPanel ? "All departments" : flyout.name}
                      </p>
                      <p className="mt-0.5 text-[13px] text-slate-500">
                        {allPanel
                          ? "Everything Vendly has to offer"
                          : `Shop every subcategory in ${flyout.name}`}
                      </p>
                    </div>
                    <Link
                      to={allPanel ? "/browse/all" : `/browse/${flyout.slug}`}
                      onClick={closePanel}
                      className="flex shrink-0 items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                    >
                      {allPanel ? "Browse everything" : `See all ${flyout.name}`}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Panel content */}
                  {allPanel ? (
                    <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                      {departments.map((dept) => (
                        <div key={dept.slug}>
                          <Link
                            to={`/browse/${dept.slug}`}
                            onClick={closePanel}
                            className="flex items-center justify-between text-sm font-bold text-slate-900 transition-colors hover:text-indigo-600"
                          >
                            {dept.name}
                            <ChevronRight className="h-4 w-4 text-slate-300" />
                          </Link>
                          <ul className="mt-2.5 space-y-1">
                            {dept.subcategories.map((sub) => (
                              <li key={sub.slug}>
                                <Link
                                  to={`/browse/${dept.slug}?sub=${sub.slug}`}
                                  onClick={closePanel}
                                  className="group flex items-center justify-between rounded-md px-1.5 py-1 text-[13px] text-slate-500 transition-colors hover:bg-gray-50 hover:text-indigo-600"
                                >
                                  {sub.label}
                                  <ChevronRight className="h-3.5 w-3.5 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {flyout.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          to={`/browse/${flyout.slug}?sub=${sub.slug}`}
                          onClick={closePanel}
                          className="group flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3 text-sm font-medium text-slate-600 transition-all hover:border-indigo-200 hover:bg-white hover:text-indigo-700 hover:shadow-sm"
                        >
                          {sub.label}
                          <ChevronRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-indigo-500" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Panel footer */}
                  <div className="mt-6 border-t border-gray-100 pt-4 text-center">
                    <Link
                      to="/browse/all"
                      onClick={closePanel}
                      className="text-[13px] font-medium text-slate-500 transition-colors hover:text-indigo-600"
                    >
                      Browse all departments →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
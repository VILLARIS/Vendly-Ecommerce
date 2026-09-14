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

  const iconButton =
    "relative grid size-10 place-items-center rounded-full text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700";

  const badge = (value) =>
    value > 0 ? (
      <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-blue-600 px-1 text-[10px] font-bold leading-4 text-white">
        {value}
      </span>
    ) : null;

  return (
    <nav className="sticky top-0 z-50 bg-white">
      {/* Level 1 - Main bar */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-5 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img
              src={Logo}
              alt="Vendly"
              className="size-9 object-contain"
            />
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              VENDLY
            </h1>
          </Link>

          {/* Search */}
          <div className="relative min-w-0 flex-1">
            <div className="flex h-11 w-full items-center gap-2 rounded-xl border border-gray-200 bg-slate-50 px-3 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <Search className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                type="text"
                placeholder="Search for products, brands or categories..."
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button className="flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <Link
              to="/account/wishlist"
              className={iconButton}
              title="Wishlist"
            >
              <Heart
                className={`h-5 w-5 ${count > 0 ? "fill-blue-600 text-blue-600" : ""}`}
              />
              {badge(count)}
            </Link>

            <button onClick={openCart} className={iconButton} title="Cart">
              <ShoppingCart className="h-5 w-5" />
              {badge(cartCount)}
            </button>

            <Link to="/account" className={iconButton} title="Account">
              <User className="h-5 w-5" />
            </Link>

            <Link
              to="/account"
              className="ml-1 hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow lg:inline-block"
            >
              Sell on Vendly
            </Link>
          </div>
        </div>
      </div>

      {/* Level 2 - Categories bar */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative" onMouseLeave={closePanel}>
            <div className="flex items-center">
              {/* All */}
              <button
                onClick={() => setPanel(allPanel ? null : "all")}
                onMouseEnter={() => setPanel("all")}
                className={`flex h-9 shrink-0 items-center gap-1.5 rounded-lg border px-3.5 text-sm font-semibold transition-colors ${
                  allPanel
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-transparent text-slate-800 hover:border-gray-100 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <Menu className="h-4 w-4" />
                All
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>

              <span className="mx-2 hidden h-4 w-px shrink-0 bg-gray-200 sm:block" />

              {/* Departments */}
              <ul className="flex flex-1 items-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {departments.map((dept) => (
                  <li key={dept.slug} onMouseEnter={() => setPanel(dept.slug)}>
                    <Link
                      to={`/browse/${dept.slug}`}
                      onClick={closePanel}
                      className={`flex h-9 items-center gap-1 whitespace-nowrap rounded-lg px-3 text-[13px] font-medium transition-colors ${
                        panel === dept.slug
                          ? "bg-blue-50 font-semibold text-blue-700"
                          : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
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
              <div className="absolute top-full z-40 mt-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5 left-4 right-4 sm:left-6 sm:right-6 sm:p-7 lg:left-8 lg:right-8">
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
                    className="flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
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
                          className="flex items-center justify-between text-sm font-bold text-slate-900 transition-colors hover:text-blue-600"
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
                                className="group flex items-center justify-between rounded-md px-1.5 py-1 text-[13px] text-slate-500 transition-colors hover:bg-gray-50 hover:text-blue-600"
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
                        className="group flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3 text-sm font-medium text-slate-600 transition-all hover:border-blue-200 hover:bg-white hover:text-blue-700 hover:shadow-sm"
                      >
                        {sub.label}
                        <ChevronRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-blue-500" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Panel footer */}
                <div className="mt-6 border-t border-gray-100 pt-4 text-center">
                  <Link
                    to="/browse/all"
                    onClick={closePanel}
                    className="text-[13px] font-medium text-slate-500 transition-colors hover:text-blue-600"
                  >
                    Browse all departments →
                  </Link>
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
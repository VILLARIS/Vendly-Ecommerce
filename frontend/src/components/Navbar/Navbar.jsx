import Logo from "../../assets/Navbar/Logo.jpg";
import { Search, Heart, ShoppingCart, User } from "lucide-react";

const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Gaming",
  "Books",
  "Automotive",
  "Groceries",
  "More",
];

function Navbar() {
  return (
    <nav className="bg-white w-full shadow-sm sticky top-0 z-50">
      {/* Level 1 - Top Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 gap-4">
        {/* Left - Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <img src={Logo} alt="Vendly Logo" className="h-10 w-10 object-contain" />
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            VENDLY
          </h1>
        </div>

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
          <button className="text-gray-600 hover:text-purple-600 transition-colors" title="Favorites">
            <Heart className="h-6 w-6" />
          </button>

          <button className="text-gray-600 hover:text-purple-600 transition-colors" title="Cart">
            <ShoppingCart className="h-6 w-6" />
          </button>

          <button className="flex items-center gap-1.5 text-gray-600 hover:text-purple-600 transition-colors" title="Account">
            <User className="h-6 w-6" />
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">Account</span>
          </button>

          <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
            Sell on Vendly
          </button>
        </div>
      </div>

      {/* Level 2 - Categories Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-6 py-2.5 overflow-x-auto text-sm font-medium text-slate-500">
            {categories.map((cat) => (
              <li key={cat}>
                <a
                  href="#"
                  className="whitespace-nowrap hover:text-purple-600 transition-colors"
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

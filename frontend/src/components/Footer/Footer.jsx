import Logo from "../../assets/Navbar/Logo.jpg";

const columns = [
  {
    title: "Shop",
    links: ["Categories", "Deals", "New Arrivals", "Best Sellers"],
  },
  {
    title: "Help",
    links: ["Help Center", "Track Order", "Returns", "Contact Us"],
  },
  {
    title: "Company",
    links: ["About Vendly", "Careers", "Press", "Blog"],
  },
];

const socials = [
  {
    label: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z",
  },
  {
    label: "Instagram",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  },
  {
    label: "Facebook",
    path: "M22 12a10 10 0 1 0-11.563 9.875v-6.98H7.898V12h2.539V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.895h-2.33v6.98A10 10 0 0 0 22 12z",
  },
];

const payments = ["Visa", "Mastercard", "PayPal", "Apple Pay", "G Pay"];

function Footer() {
  return (
    <footer className="bg-[#0f172a] pb-8 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Links Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <img
                src={Logo}
                alt="Vendly Logo"
                className="h-10 w-10 rounded-xl object-contain"
              />
              <span className="text-xl font-extrabold tracking-tight text-white">
                VENDLY
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Everything you need, all in one place.
            </p>

            {/* Newsletter */}
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 p-1.5 pl-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button className="shrink-0 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Subscribe
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="grid size-9 place-items-center rounded-full border border-slate-700 text-slate-400 transition-colors hover:border-blue-500/70 hover:text-blue-400"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <p>© 2026 Vendly, Inc. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {payments.map((payment) => (
              <span
                key={payment}
                className="rounded-md border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-xs font-medium text-slate-300"
              >
                {payment}
              </span>
            ))}
          </div>

          <div className="flex gap-6">
            {["Terms of Service", "Privacy Policy", "Accessibility"].map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-white">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import { Search, Star, Store, Users, Truck } from "lucide-react";
import heroImage from "../../assets/Hero/HeroImage.png";
import phoneImage from "../../assets/Hero/PhoneImage.png";

const trust = [
  { icon: Star, text: "4.8 average rating" },
  { icon: Store, text: "10K+ sellers" },
  { icon: Users, text: "1M+ happy customers" },
];

function Hero() {
  return (
    <section className="relative min-h-[75svh] w-full overflow-hidden bg-[#F8FAFC] md:h-[75svh] md:min-h-[560px]">
      {/* Full-bleed hero image touching both edges */}
      <img
        src={heroImage}
        alt="Curated premium products for everyday life"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Soft scrim to keep the text readable over the image */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent sm:via-white/60" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 px-4 sm:px-6 md:h-full md:grid-cols-2 md:grid-rows-1 lg:px-8">
        {/* Left column */}
        <div className="flex w-full items-center md:h-full">
          <div className="w-full max-w-md xl:max-w-lg">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 ring-1 ring-blue-100">
              Curated marketplace
            </span>

            <h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-4xl xl:text-5xl">
              Find better products
              <br />
              for <span className="text-blue-600">everyday life.</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
              Shop products from independent sellers, trusted brands and emerging
              creators — all in one place.
            </p>

            {/* Search */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex max-w-md items-center rounded-xl border border-slate-200 bg-white py-2 pl-4 pr-2 shadow-sm shadow-slate-900/5 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10"
            >
              <Search className="h-[18px] w-[18px] shrink-0 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, brands or categories"
                className="w-full min-w-0 flex-1 bg-transparent px-3 py-2 text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button className="shrink-0 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Search
              </button>
            </form>

            {/* Trust */}
            <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-medium text-slate-500">
              {trust.map(({ icon: Icon, text }, i) => (
                <span key={text} className="flex items-center gap-1.5">
                  {i > 0 && <span className="mr-0.5 text-slate-300">•</span>}
                  <Icon
                    className={
                      Icon === Star
                        ? "h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        : "h-3.5 w-3.5 text-blue-500"
                    }
                  />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Phone below the content on mobile, in normal flow */}
          <img
            src={phoneImage}
            alt="Oppo F19 Pro Plus"
            className="mx-auto mt-10 w-full max-w-[340px] object-contain drop-shadow-[0_16px_22px_rgba(15,23,42,0.2)] md:hidden"
          />
        </div>

        {/* Right column - product showcase */}
        <div className="relative hidden md:block">
          {/* Phone + halo standing on the podium */}
          <div className="absolute bottom-[6%] left-1/2 z-10 w-[58%] max-w-[360px] -translate-x-1/2">
            <img
              src={phoneImage}
              alt="Oppo F19 Pro Plus"
              className="relative z-10 w-full object-contain"
            />
            {/* Soft contact shadow under the phone */}
            <div className="absolute bottom-[9%] left-1/2 z-0 h-4 w-[34%] -translate-x-1/2 rounded-full bg-slate-950/30 blur-md" />
          </div>

          {/* Secondary badges */}
          <div className="absolute right-[10%] top-[45%] z-20 flex flex-col items-end gap-1.5">
            <span className="flex items-center gap-1.5 rounded-full border border-slate-100/80 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
              <Truck className="h-3.5 w-3.5 text-blue-600" />
              Free shipping
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-slate-100/80 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              Top rated
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
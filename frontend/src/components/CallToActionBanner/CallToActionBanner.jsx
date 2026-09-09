function CallToActionBanner() {
  return (
    <div className="bg-white py-16">
      <div className="w-full bg-[#0f172a]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 md:flex-row md:py-12">
          {/* Left - Texts */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-3xl font-bold text-white">
              Turn your products into a business.
            </h3>
            <p className="text-lg text-slate-400">
              Start selling on Vendly and reach customers looking for what you
              offer.
            </p>
          </div>

          {/* Right - Button */}
          <button className="mt-6 shrink-0 rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 md:mt-0">
            Start selling
          </button>
        </div>
      </div>
    </div>
  );
}

export default CallToActionBanner;
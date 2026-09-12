function EmptyView({ icon: Icon, title, subtitle }) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-32 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-indigo-50">
          <Icon className="h-7 w-7 text-indigo-500" />
        </span>
        <p className="mt-4 text-lg font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default EmptyView;
const Loading = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl shadow-sm p-4 animate-pulse border border-slate-100 h-32 flex items-center space-x-4"
      >
        <div className="w-20 h-20 bg-slate-200 rounded-full flex-shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-slate-200 rounded w-12"></div>
            <div className="h-6 bg-slate-200 rounded w-12"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Loading;

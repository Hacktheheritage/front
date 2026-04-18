function Hero() {
  return (
    <section className="relative overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-sky-50 to-white" />
      <div className="absolute -z-10 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl sm:left-10 sm:top-10" />
      <div className="absolute right-10 top-24 -z-10 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 -z-10">
        {Array.from({ length: 20 }).map((_, index) => (
          <span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-indigo-200/70"
            style={{
              left: `${(index * 13) % 100}%`,
              top: `${(index * 17) % 80}%`,
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 text-center sm:px-6 lg:px-8">
        <p className="text-base font-medium text-indigo-600 sm:text-lg">
          Өткөндү сактап, келечекке жеткирүү
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl text-5xl font-semibold leading-tight text-slate-900 sm:text-6xl md:text-7xl">
          Ыйык билимди технология аркылуу сактоо
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
          Bilge платформасы маданий мурасты келечек муундарга жеткирүү үчүн
          ыйык жерлерди, календардагы окуяларды жана жандуу баяндарды бириктирет.
        </p>
        <button
          type="button"
          className="mt-10 rounded-full bg-indigo-600 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500"
        >
          Ыйык жерлерди изилдөө
        </button>
      </div>
    </section>
  );
}

export default Hero;

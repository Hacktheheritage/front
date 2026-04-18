function HomePage() {
  return (
    <main className="bg-[#f4efe5]">
      <section className="relative isolate min-h-[92vh] overflow-hidden pt-24">
        <div
          className="parallax-bg absolute inset-0 -z-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1591646540849-3122ca9f6f10?auto=format&fit=crop&w=1900&q=80')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0f1b3d]/75 via-[#0f1b3d]/35 to-[#f4efe5]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),rgba(255,255,255,0))]" />

        <div className="mx-auto max-w-6xl px-4 py-24 text-center text-white sm:px-6">
          <p className="text-sm tracking-[0.22em] text-amber-100">𐰴𐰃𐰺𐰏𐰃𐰕 · РУХАНИЙ МУРАС</p>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            Талаанын <span className="text-amber-300">руханий</span> жүрөгүн ач
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-slate-100 sm:text-xl">
            Кыргызстандын ыйык жерлерин, петроглифтерин жана салттуу билимдерин изилде
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a className="rounded-full bg-amber-700 px-6 py-3 text-sm font-medium hover:bg-amber-600" href="/map">
              Картадан көрүү
            </a>
            <a
              className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-white/20"
              href="/places"
            >
              Изилдөөнү баштоо
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 h-24 w-full bg-gradient-to-b from-transparent to-[#f4efe5]" />
      </section>
    </main>
  );
}

export default HomePage;

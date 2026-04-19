import { Link } from "react-router-dom";
import PLACES from "../data/places";

function PlacesPage() {
  const places = Object.values(PLACES);

  return (
    <main className="bg-[#f4efe5]">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700">
            Белгилүү жайлар
          </p>
          <h1
            className="mt-3 text-4xl font-semibold text-slate-800 sm:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Ыйык жерлер
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
            Кыргызстандын тарыхый жана руханий мурасын тааныңыз.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {places.map((p) => (
            <Link
              key={p.slug}
              to={`/places/${p.slug}`}
              className="group relative overflow-hidden rounded-3xl shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <img
                src={p.heroImage}
                alt={p.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
              <div className="relative flex h-72 flex-col justify-between p-8 sm:h-80">
                <span className="w-fit rounded-full border border-amber-400/50 bg-amber-900/50 px-3 py-1 text-xs font-medium text-amber-100 backdrop-blur-sm">
                  {p.badge}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                    {p.region}
                  </p>
                  <h2
                    className="mt-1.5 text-3xl font-semibold text-amber-200 sm:text-4xl"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {p.name}
                  </h2>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-amber-200 transition-all group-hover:gap-3">
                    Толук маалымат
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default PlacesPage;

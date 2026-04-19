import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PLACES from "../data/places";

function GlanceItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-200 last:border-none">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-slate-800 transition hover:bg-slate-50"
      >
        {item.title}
        <svg
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600">
          {item.body}
        </div>
      )}
    </div>
  );
}

export default function PlacePage() {
  const { slug } = useParams();
  const place = PLACES[slug];

  const [openGlance, setOpenGlance] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!place) {
    return (
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-32 text-center">
        <h1
          className="text-3xl font-semibold text-slate-800"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Жер табылган жок
        </h1>
        <Link
          to="/places"
          className="mt-6 inline-block text-sm text-amber-700 underline underline-offset-4"
        >
          ← Жерлерге кайтуу
        </Link>
      </main>
    );
  }

  const score = submitted
    ? place.quiz.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0)
    : 0;

  return (
    <main className="bg-[#f4efe5]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#0d1117] pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid min-h-[520px] grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2">
            {/* Text */}
            <div className="order-2 text-white lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400/80">
                {place.heroSubtitle}
              </p>
              <h1
                className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {place.name}.
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
                {place.tagline}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-amber-400/40 bg-amber-900/30 px-3 py-1 text-xs font-medium text-amber-200">
                  {place.badge}
                </span>
                <span className="rounded-full border border-slate-600 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300">
                  {place.region}
                </span>
              </div>
              <Link
                to="/places"
                className="mt-8 inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-amber-300"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Бардык жерлер
              </Link>
            </div>
            {/* Image */}
            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <div className="w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/60 lg:max-w-none">
                <img
                  src={place.heroImage}
                  alt={place.name}
                  className="h-72 w-full object-cover lg:h-[420px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AT A GLANCE ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h2
          className="mb-8 text-center text-3xl font-semibold text-slate-800 sm:text-4xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Кыскача маалымат
        </h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {place.glance.map((item, i) => (
            <GlanceItem
              key={i}
              item={item}
              isOpen={openGlance === i}
              onToggle={() => setOpenGlance(openGlance === i ? -1 : i)}
            />
          ))}
        </div>
      </section>

      {/* ── NARRATIVE SECTIONS ───────────────────────────────────────────── */}
      {place.sections.map((sec, i) => (
        <section key={i} className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className={sec.imageLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
              <h2
                className="text-3xl font-semibold text-slate-800 sm:text-4xl"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {sec.heading}
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {sec.body}
              </p>
            </div>
            <div className={sec.imageLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={sec.image}
                  alt={sec.imageAlt}
                  className="h-72 w-full object-cover sm:h-80"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── VISUAL ARCHIVE ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        <div className="mb-6 flex items-baseline justify-between">
          <h2
            className="text-3xl font-semibold text-slate-800 sm:text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Сүрөт архиви.
          </h2>
          <p className="text-xs text-slate-400">Сайланма перспективалар жыйнагы.</p>
        </div>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "200px 200px" }}
        >
          <div className="row-span-2 overflow-hidden rounded-xl">
            <img
              src={place.gallery[0]}
              alt={`${place.name} 1`}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          {place.gallery.slice(1).map((src, i) => (
            <div key={i} className="overflow-hidden rounded-xl">
              <img
                src={src}
                alt={`${place.name} ${i + 2}`}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── QUIZ ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 pb-24 pt-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2
            className="text-3xl font-semibold text-slate-800 sm:text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Билимиңизди текшериңиз.
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {place.quiz.length} questions to reflect on the history of {place.name}.
          </p>
        </div>
        <div className="space-y-8 rounded-3xl border border-amber-100 bg-white p-6 shadow-lg sm:p-8">
          {place.quiz.map((q, qi) => (
            <div key={qi}>
              <p className="text-sm font-semibold text-slate-800">
                {qi + 1}. {q.question}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const isSelected = answers[qi] === oi;
                  const isCorrect = submitted && oi === q.answer;
                  const isWrong = submitted && isSelected && oi !== q.answer;
                  return (
                    <label
                      key={oi}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm transition ${
                        isCorrect
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : isWrong
                          ? "border-red-300 bg-red-50 text-red-700"
                          : isSelected
                          ? "border-amber-400 bg-amber-50 text-amber-800"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-300 hover:bg-amber-50/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${qi}`}
                        value={oi}
                        disabled={submitted}
                        checked={isSelected}
                        onChange={() =>
                          setAnswers((prev) => ({ ...prev, [qi]: oi }))
                        }
                        className="accent-amber-700"
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {submitted ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
              <p
                className="text-4xl font-semibold text-amber-800"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {score} / {place.quiz.length}
              </p>
              <p className="mt-1 text-sm text-amber-700">
                {score === place.quiz.length
                  ? "Мыкты! Баары туура."
                  : score >= 5
                  ? "Жакшы! Дагы аракет кылыңыз."
                  : "Дагы бир жолу аракет кылыңыз."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="mt-3 rounded-full border border-amber-300 px-5 py-1.5 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
              >
                Кайра аракет
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button
                type="button"
                disabled={Object.keys(answers).length < place.quiz.length}
                onClick={() => {
                  if (Object.keys(answers).length < place.quiz.length) return;
                  setSubmitted(true);
                }}
                className={`rounded-full px-8 py-3 text-sm font-medium text-white shadow-lg transition ${
                  Object.keys(answers).length < place.quiz.length
                    ? "cursor-not-allowed bg-slate-400"
                    : "bg-amber-700 shadow-amber-900/30 hover:bg-amber-600 hover:scale-105 active:scale-100"
                }`}
              >
                Жоопторду жөнөтүү
              </button>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}

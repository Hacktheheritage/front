import { useEffect, useRef, useState } from "react";
import { HERO_SLIDES } from "../data/heroLandmarks";

const HERO_ROTATE_MS = 5 * 60 * 1000;

// ── Chatbot helpers ──────────────────────────────────────────────────────────
const initialBotMessages = [
  { role: "bot", text: "Салам! Мен Bilge Bot. Бул сайт боюнча суроолоруңузга жардам берем." },
  { role: "bot", text: 'Мисалы: "Бул сайтта эмне таба алам?" же "Карта бөлүмү эмне үчүн керек?"' },
];

function getBilgeReply(text) {
  const q = text.toLowerCase();
  if (q.includes("салам") || q.includes("hello") || q.includes("привет"))
    return "Салам! Кош келиңиз. Bilge сайтын чогуу изилдейли.";
  if (q.includes("сайт") || q.includes("вебсайт"))
    return "Бул вебсайт кыргыз тарыхын, ыйык жерлерди жана маданий мурастарды тааныштыруу үчүн түзүлгөн.";
  if (q.includes("карта") || q.includes("map"))
    return "Карта бөлүмүндө ыйык жана тарыхый жайлардын жайгашкан жерин көрө аласыз.";
  if (q.includes("жылнаама") || q.includes("calendar"))
    return "Жылнаама бөлүмү тарыхый даталарды жана маданий окуяларды айлар боюнча көрсөтөт.";
  return "Сурооңуз жакшы экен. Кааласаңыз сайттагы бөлүмдөр тууралуу тактап сураңыз: башкы бет, жерлер, карта, жылнаама.";
}

// ── Static data ──────────────────────────────────────────────────────────────
const STATS = [
  { value: "120+", label: "Тарыхый жайлар" },
  { value: "7", label: "Облус" },
  { value: "3 000+", label: "Жыл тарых" },
  { value: "50+", label: "Петроглиф" },
];

const FEATURES = [
  {
    href: "/places",
    gradient: "from-amber-50 to-orange-50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-9 w-9 text-amber-700">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Ыйык Жерлер",
    desc: "Сулайман-Тоо, Манас Ордо жана ондогон тарыхый жайларды изилдеңиз. Петроглифтерди AI аркылуу талдаңыз.",
    cta: "Жерлерди ачуу",
  },
  {
    href: "/map",
    gradient: "from-sky-50 to-teal-50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-9 w-9 text-teal-700">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
    title: "Интерактив Карта",
    desc: "Кыргызстандын тарыхый жана маданий жайларын интерактив картадан таап, байланыштарды ачыңыз.",
    cta: "Картаны ачуу",
  },
  {
    href: "/calendar",
    gradient: "from-rose-50 to-amber-50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-9 w-9 text-rose-700">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    title: "Жылнаама 2026",
    desc: "Мүчөл жылдарын, маданий майрамдарды жана тарыхый даталарды толук жылдык форматта карап чыгыңыз.",
    cta: "Жылнааманы ачуу",
  },
];

const PLACES = [
  {
    name: "Сулайман-Тоо",
    region: "Ош облусу",
    badge: "ЮНЕСКО мурасы",
    desc: "Ыйык тоо — байыркы зыярат жери. Кыргыздардын руханий дүйнөтаанымы жана табият менен байланышы ушул жерде чагылдырылат.",
    img: "/assets/places/sulaiman_too.jpg",
    accent: "text-violet-200",
    badgeStyle: "border-violet-300/50 bg-violet-900/50 text-violet-100",
  },
  {
    name: "Манас Ордо",
    region: "Талас облусу",
    badge: "Улуттук комплекс",
    desc: "Баатыр Манастын мемориалдык комплекси — кыргыз эпосунун жүрөгү жана улуттук руханий кайнар булагы.",
    img: "/assets/places/manas_ordo.jpg",
    accent: "text-amber-200",
    badgeStyle: "border-amber-400/50 bg-amber-900/50 text-amber-100",
  },
];

// ── Ornamental SVG ────────────────────────────────────────────────────────────
function KyrgyzOrnament({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="100,6 194,100 100,194 6,100" stroke="#b45309" strokeWidth="1.5" opacity="0.35" />
      <polygon points="100,28 172,100 100,172 28,100" stroke="#b45309" strokeWidth="1.5" opacity="0.45" />
      <polygon points="100,52 148,100 100,148 52,100" stroke="#b45309" strokeWidth="1.5" opacity="0.55" />
      <polygon points="100,76 124,100 100,124 76,100" fill="#b45309" fillOpacity="0.18" stroke="#b45309" strokeWidth="1.5" opacity="0.7" />
      <circle cx="100" cy="100" r="5" fill="#b45309" opacity="0.55" />
      <line x1="100" y1="6" x2="100" y2="0" stroke="#b45309" strokeWidth="1.5" opacity="0.3" />
      <line x1="100" y1="194" x2="100" y2="200" stroke="#b45309" strokeWidth="1.5" opacity="0.3" />
      <line x1="6" y1="100" x2="0" y2="100" stroke="#b45309" strokeWidth="1.5" opacity="0.3" />
      <line x1="194" y1="100" x2="200" y2="100" stroke="#b45309" strokeWidth="1.5" opacity="0.3" />
      <circle cx="100" cy="6" r="3" fill="#b45309" opacity="0.35" />
      <circle cx="194" cy="100" r="3" fill="#b45309" opacity="0.35" />
      <circle cx="100" cy="194" r="3" fill="#b45309" opacity="0.35" />
      <circle cx="6" cy="100" r="3" fill="#b45309" opacity="0.35" />
    </svg>
  );
}

// ── Reusable intersection-observer hook ─────────────────────────────────────
function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

// ── Component ────────────────────────────────────────────────────────────────
function HomePage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialBotMessages);
  const [heroIndex, setHeroIndex] = useState(0);

  const currentHero = HERO_SLIDES[heroIndex] ?? HERO_SLIDES[0];

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, HERO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const [statsRef, statsVisible] = useVisible(0.2);
  const [featuresRef, featuresVisible] = useVisible(0.1);
  const [placesRef, placesVisible] = useVisible(0.1);
  const [missionRef, missionVisible] = useVisible(0.15);
  const [quoteRef, quoteVisible] = useVisible(0.35);
  const [botRef, botVisible] = useVisible(0.2);

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "bot", text: getBilgeReply(trimmed) },
    ]);
    setMessage("");
  };

  return (
    <main className="bg-[#f4efe5]">

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[92vh] overflow-hidden pt-24">
        <div
          className="parallax-bg absolute inset-0 -z-20"
          style={{ backgroundImage: "url('/hero-kyrgyz-mountains.jpeg')" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#130c24]/82 via-[#151636]/58 to-[#f4efe5]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_15%,rgba(255,196,196,0.25),rgba(255,255,255,0))]" />

        <div className="mx-auto max-w-6xl px-4 py-24 text-center text-white sm:px-6">
          <p className="text-sm tracking-[0.22em] text-amber-100/80">БАШКЫ БЕТ · КЫРГЫЗ РУХУ</p>
          <h1
            className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Кыргыз тоолорунун фонунда
            <span className="block text-amber-300">тарыхтын үнүн ук</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-slate-200 sm:text-xl">
            Тарых, ыйык жерлер жана маданий мурас тууралуу маалыматты заманбап форматта таба аласыз.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              className="rounded-full bg-amber-700 px-7 py-3 text-sm font-medium shadow-lg shadow-amber-900/40 transition hover:bg-amber-600 hover:scale-105 active:scale-100"
              href="/map"
            >
              Картадан көрүү
            </a>
            <a
              className="rounded-full border border-white/60 bg-white/10 px-7 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/20 hover:scale-105 active:scale-100"
              href="/places"
            >
              Изилдөөнү баштоо
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">Ылдый</span>
          <div className="animate-bounce">
            <svg className="h-5 w-5 text-amber-300/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 h-28 w-full bg-gradient-to-b from-transparent to-[#f4efe5]" />
      </section>

      {/* ── 2. STATS BAR ────────────────────────────────────────────────── */}
      <section ref={statsRef} className="mx-auto max-w-5xl px-4 pb-4 sm:px-6">
        <div
          className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-amber-100 bg-amber-100/80 shadow-lg shadow-amber-100/60 transition-all duration-700 sm:grid-cols-4 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-[#fdfaf4] px-4 py-7"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span
                className="text-4xl font-semibold text-amber-700 sm:text-5xl"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {s.value}
              </span>
              <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. FEATURE CARDS ────────────────────────────────────────────── */}
      <section ref={featuresRef} className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-amber-700 uppercase">Платформа</p>
          <h2
            className="mt-3 text-3xl font-semibold text-slate-800 sm:text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Эмнени таба аласыз?
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <a
              key={i}
              href={f.href}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-b ${f.gradient} p-7 shadow-md transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
              style={featuresVisible
                ? { animation: `slideUpFade 600ms ease both`, animationDelay: `${i * 110 + 80}ms` }
                : { opacity: 0 }}
            >
              <div className="w-fit rounded-2xl bg-white/80 p-3 shadow-sm">
                {f.icon}
              </div>
              <h3
                className="mt-5 text-2xl font-semibold text-slate-800"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {f.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-amber-700 transition-all group-hover:gap-3">
                {f.cta}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── 4. FEATURED PLACES ──────────────────────────────────────────── */}
      <section ref={placesRef} className="mx-auto max-w-6xl px-4 py-6 pb-16 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-amber-700 uppercase">Белгилүү жайлар</p>
          <h2
            className="mt-3 text-3xl font-semibold text-slate-800 sm:text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Ыйык мурас
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PLACES.map((p, i) => (
            <a
              key={i}
              href="/places"
              className="group relative overflow-hidden rounded-3xl shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              style={placesVisible
                ? { animation: `${i === 0 ? "slideInLeft" : "slideInRight"} 700ms ease both`, animationDelay: `${i * 150}ms` }
                : { opacity: 0 }}
            >
              {/* Photo background */}
              <img
                src={p.img}
                alt={p.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Layered overlay: dark gradient at bottom for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              {/* Subtle color tint at top */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />

              {/* Content sits above overlays */}
              <div className="relative flex h-72 flex-col justify-between p-8 sm:h-80">
                {/* Top: badge */}
                <span className={`w-fit rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${p.badgeStyle}`}>
                  {p.badge}
                </span>
                {/* Bottom: text */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{p.region}</p>
                  <h3
                    className={`mt-1.5 text-3xl font-semibold sm:text-4xl ${p.accent}`}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {p.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/75">{p.desc}</p>
                  <div className={`mt-5 flex items-center gap-1.5 text-sm font-medium ${p.accent} transition-all group-hover:gap-3`}>
                    Толук маалымат
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Corner ornament */}
              <div className="pointer-events-none absolute right-2 top-2 h-28 w-28 opacity-[0.15]">
                <KyrgyzOrnament className="h-full w-full" />
              </div>
            </a>
          ))}
        </div>
        <div className="mt-7 text-center">
          <a
            href="/places"
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-6 py-2.5 text-sm font-medium text-amber-800 shadow-sm transition hover:bg-amber-50 hover:shadow-md"
          >
            Бардык жерлерди көрүү
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── 5. MISSION TEASER ───────────────────────────────────────────── */}
      <section ref={missionRef} className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div
          className={`overflow-hidden rounded-3xl border border-slate-100 bg-white/80 shadow-xl shadow-slate-200/50 transition-all duration-700 ${missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text side */}
            <div className="p-10 sm:p-14">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-amber-700 uppercase">Биздин миссия</p>
              <h2
                className="mt-4 text-3xl font-semibold leading-snug text-slate-800 sm:text-4xl"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Маданий мурасты технология аркылуу сактоо
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                Bilge платформасы кыргыз элинин байыркы тарыхын, ыйык жерлерин жана маданий мурасын заманбап технологиялар аркылуу келечек муундарга жеткирүү үчүн иштеп жатат.
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Интерактив карта, AI-талдоо жана мүчөл жылнаамасы аркылуу тарых жандуу болуп, баарына жеткиликтүү болот.
              </p>
              <a
                href="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-amber-700"
              >
                Биз жөнүндө
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
            {/* Ornament panel */}
            <div className="relative hidden items-center justify-center bg-gradient-to-br from-[#130c24] to-[#1e1040] lg:flex">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #b45309 0, #b45309 1px, transparent 0, transparent 50%)",
                  backgroundSize: "14px 14px",
                }}
              />
              <KyrgyzOrnament className="h-52 w-52 opacity-55" />
              <div className="absolute bottom-7 right-8 text-right">
                <p className="text-xs tracking-widest text-amber-400/60 uppercase">𐰉𐰃𐰠𐰏𐰀</p>
                <p className="mt-0.5 text-[10px] text-white/30">Билге · Bilge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. QUOTE ────────────────────────────────────────────────────── */}
      <section ref={quoteRef} className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div
          className={`relative overflow-hidden rounded-3xl bg-white/90 px-8 py-12 text-center shadow-xl shadow-slate-200/40 sm:px-16 transition-all duration-700 ${quoteVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          <span
            className="pointer-events-none absolute left-5 top-0 select-none leading-none text-9xl font-bold text-amber-100"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            "
          </span>
          <blockquote
            className="relative text-2xl italic leading-relaxed text-slate-700 sm:text-3xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            "Өзүнүн тарыхын билбеген элдин тагдыры тайкы, келечеги бүдөмүк"
          </blockquote>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            — Асылбек Жээнбеков
          </p>
        </div>
      </section>

      {/* ── 7. CHATBOT ──────────────────────────────────────────────────── */}
      <section ref={botRef} className="mx-auto max-w-3xl px-4 pb-24 pt-4 sm:px-6">
        <div className="mb-7 text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-amber-700 uppercase">Жардамчы бот</p>
          <h2
            className="mt-2 text-2xl font-semibold text-slate-800 sm:text-3xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Суроолоруңуз барбы?
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">Сайт боюнча Bilge Ботко сурансаңыз болот</p>
        </div>
        <div
          className={`w-full rounded-3xl border border-amber-100 bg-white/95 p-5 shadow-2xl shadow-slate-300/30 transition-all duration-700 sm:p-6 ${botVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          {/* Bot header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white shadow-md">
              B
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Bilge Bot</p>
              <p className="text-xs text-emerald-500">● Онлайн</p>
            </div>
          </div>

          <div className="mt-4 h-64 space-y-3 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-4">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm sm:text-base ${item.role === "user"
                  ? "ml-auto bg-amber-700 text-white"
                  : "bg-white text-slate-700 shadow-sm"
                  }`}
              >
                {item.text}
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              type="text"
              placeholder="Суроо жазыңыз..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-amber-500"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="rounded-xl bg-amber-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
            >
              Жөнөт
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}

export default HomePage;

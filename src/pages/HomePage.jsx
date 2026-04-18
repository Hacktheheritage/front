import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HERO_SLIDES } from "../data/heroLandmarks";

const HERO_ROTATE_MS = 5 * 60 * 1000;

const initialBotMessages = [
  {
    role: "bot",
    text: "Салам! Мен Belgi Bot. Бул сайт боюнча суроолоруңузга жардам берем.",
  },
  {
    role: "bot",
    text: "Мисалы: \"Бул сайтта эмне таба алам?\" же \"Карта бөлүмү эмне үчүн керек?\"",
  },
];

function getBelgiReply(text) {
  const q = text.toLowerCase();

  if (q.includes("салам") || q.includes("hello") || q.includes("привет")) {
    return "Салам! Кош келиңиз. Bilge сайтын чогуу изилдейли.";
  }
  if (q.includes("сайт") || q.includes("вебсайт")) {
    return "Бул вебсайт кыргыз тарыхын, ыйык жерлерди жана маданий мурастарды тааныштыруу үчүн түзүлгөн.";
  }
  if (q.includes("карта") || q.includes("map")) {
    return "Карта бөлүмүндө ыйык жана тарыхый жайлардын жайгашкан жерин көрө аласыз.";
  }
  if (q.includes("жылнаама") || q.includes("calendar")) {
    return "Жылнаама бөлүмү тарыхый даталарды жана маданий окуяларды айлар боюнча көрсөтөт.";
  }
  return "Сурооңуз жакшы экен. Кааласаңыз сайттагы бөлүмдөр тууралуу тактап сураңыз: башкы бет, жерлер, карта, жылнаама.";
}

function HomePage() {
  const quoteRef = useRef(null);
  const botRef = useRef(null);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [botVisible, setBotVisible] = useState(false);
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

  useEffect(() => {
    const quoteObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setQuoteVisible(true);
      },
      { threshold: 0.35 }
    );
    const botObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setBotVisible(true);
      },
      { threshold: 0.25 }
    );

    if (quoteRef.current) quoteObserver.observe(quoteRef.current);
    if (botRef.current) botObserver.observe(botRef.current);

    return () => {
      quoteObserver.disconnect();
      botObserver.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "bot", text: getBelgiReply(trimmed) },
    ]);
    setMessage("");
  };

  return (
    <main className="bg-[#f4efe5]">
      <section className="relative isolate min-h-[92vh] overflow-hidden pt-24">
        <div className="absolute inset-0 -z-20">
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className="parallax-bg absolute inset-0 transition-opacity duration-[2000ms] ease-out"
              style={{
                backgroundImage: `url('${slide.image}')`,
                opacity: i === heroIndex ? 1 : 0,
                pointerEvents: "none",
              }}
              aria-hidden={i !== heroIndex}
            />
          ))}
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#130c24]/82 via-[#151636]/58 to-[#f4efe5]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_15%,rgba(255,196,196,0.25),rgba(255,255,255,0))]" />

        <div className="mx-auto max-w-6xl px-4 py-24 text-center text-white sm:px-6">
          <p className="text-sm tracking-[0.22em] text-amber-100">БАШКЫ БЕТ · КЫРГЫЗ РУХУ</p>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            Кыргыз тоолорунун фонунда
            <span className="block text-amber-300">тарыхтын үнүн ук</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-slate-100 sm:text-xl">
            Башкы беттен тарых, ыйык жерлер жана маданий мурас тууралуу маалыматты
            заманбап форматта таба аласыз.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              className="rounded-full bg-amber-700 px-6 py-3 text-sm font-medium hover:bg-amber-600"
              to={`/map?place=${currentHero.id}`}
            >
              Картадан көрүү
            </Link>
            <Link
              className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-white/20"
              to="/places"
            >
              Изилдөөнү баштоо
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-0 right-0 z-10 flex justify-center px-4 sm:bottom-7">
          <div
            className="flex max-w-[min(100%,28rem)] items-center gap-3 rounded-full border border-white/25 bg-gradient-to-r from-black/45 to-black/35 px-4 py-2.5 pl-4 shadow-lg shadow-black/20 ring-1 ring-white/10 backdrop-blur-md sm:gap-3.5 sm:px-5 sm:py-3"
            aria-label={`Сүрөттүн жайгашуусу: ${currentHero.caption}`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/25 text-amber-100 ring-1 ring-amber-200/40">
              <svg
                className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
            </span>
            <p
              key={currentHero.id}
              className="min-w-0 text-left font-['Cormorant_Garamond',Georgia,serif] text-base font-semibold leading-snug tracking-[0.04em] text-amber-50/95 sm:text-lg"
            >
              {currentHero.caption}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 h-24 w-full bg-gradient-to-b from-transparent to-[#f4efe5]" />
      </section>

      <section ref={quoteRef} className="flex min-h-[70vh] items-center justify-center px-4 py-20 sm:px-6">
        <div
          className={`mx-auto max-w-4xl rounded-3xl bg-white/90 p-8 text-center shadow-xl shadow-slate-300/35 transition-all duration-700 sm:p-12 ${
            quoteVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <blockquote className="text-2xl italic leading-relaxed text-slate-700 sm:text-4xl">
            "Өзүнүн тарыхын билбеген элдин тагдыры тайкы, келечеги бүдөмүк"
          </blockquote>
          <p className="mt-6 text-base font-medium text-slate-500 sm:text-lg">Асылбек Жээнбеков</p>
        </div>
      </section>

      <section ref={botRef} className="px-4 pb-24 sm:px-6">
        <div
          className={`mx-auto w-full max-w-3xl rounded-3xl border border-amber-100 bg-white/95 p-5 shadow-2xl shadow-slate-300/30 transition-all duration-700 sm:p-6 ${
            botVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-center text-2xl font-semibold text-slate-800 sm:text-3xl">Belgi Bot</h2>
          <p className="mt-2 text-center text-sm text-slate-500 sm:text-base">
            Сайт боюнча жардамчы. Төмөндө суроо жазыңыз.
          </p>

          <div className="mt-5 h-72 space-y-3 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-4">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm sm:text-base ${
                  item.role === "user"
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
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
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

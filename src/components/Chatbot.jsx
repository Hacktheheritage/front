import { useState } from "react";

function getGuideAnswer(text) {
  const q = text.toLowerCase();
  if (q.includes("сулайман") || q.includes("кайда")) {
    return "Сулайман-Тоо Ош шаарында жайгашкан. Бул жай элдин зыярат салтында өзгөчө орунга ээ болуп, ниет кылуу жана руханий тазалануу менен байланышкан.";
  }
  if (q.includes("манас ордо")) {
    return "Манас Ордо — Таластагы тарыхый-маданий комплекс. Ал Манас мурасы аркылуу элдин эс тутумун, урмат-сыйын жана биримдик идеясын сактап турат.";
  }
  if (q.includes("петроглиф")) {
    return "Петроглиф — таш бетине түшүрүлгөн байыркы белги. Анда аңчылык, жаратылыш жана адамдын руханий дүйнөсү чагылдырылып, салттуу билим муундан муунга өткөн.";
  }
  return "Сурооңуз үчүн рахмат. Бул тема боюнча салт, тарых жана руханий маани жагын түшүндүрүп бере алам. Кааласаңыз, конкреттүү жердин атын жазыңыз.";
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(
    "Саламатсызбы! Мен сизге Кыргызстандын ыйык жерлерин түшүндүрүп бере алам."
  );

  const handleSend = () => {
    if (!message.trim()) return;
    setReply(getGuideAnswer(message));
    setMessage("");
  };

  return (
    <div className="fixed bottom-5 right-4 z-50 md:right-6">
      {isOpen && (
        <div className="mb-3 w-[20rem] rounded-2xl border border-amber-100 bg-white/95 p-4 shadow-2xl shadow-slate-300/40 backdrop-blur-md transition-all duration-300 sm:w-[22rem]">
          <h3 className="text-base font-semibold text-slate-800">Мурас гид</h3>
          <p className="mt-1 text-sm text-slate-500">
            Жандуу архив тарабынан иштелген
          </p>

          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600">
            {reply}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {["Сулайман-Тоо кайда?", "Манас Ордо жөнүндө", "Петроглиф деген эмне?"].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setReply(getGuideAnswer(q))}
                className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-800"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSend();
              }}
              type="text"
              placeholder="Суроо жазыңыз..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-amber-500"
            />
            <button
              type="button"
              onClick={handleSend}
              className="rounded-xl bg-amber-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
            >
              Жөнөт
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-full bg-amber-700 px-6 py-3 text-base font-medium text-white shadow-lg shadow-amber-300 transition hover:bg-amber-600"
      >
        <span>{isOpen ? "Жабуу" : "Мурас гид"}</span>
        <span className={`text-lg leading-none transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ↑
        </span>
      </button>
    </div>
  );
}

export default Chatbot;

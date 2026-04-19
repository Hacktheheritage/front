import { useState } from "react";
import { sendChatMessage } from "../api/apiClient";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(
    "Саламатсызбы! Мен сизге Кыргызстандын ыйык жерлерин түшүндүрүп бере алам."
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    setIsLoading(true);
    try {
      const response = await sendChatMessage(trimmed);
      setReply(response?.reply || "Ката чыкты. Бир аздан кийин кайра аракет кылыңыз.");
    } catch (error) {
      setReply(
        "Сураныч, серверге туташуу учурунда ката чыкты. Жалпысынан жооп алуу үчүн кайра аракет кылыңыз."
      );
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-5 right-4 z-[999] md:right-6">
      {isOpen && (
        <div className="mb-3 w-[20rem] rounded-2xl border border-amber-100 bg-white/95 p-4 shadow-2xl shadow-slate-300/40 backdrop-blur-md transition-all duration-300 sm:w-[22rem]">
          <h3 className="text-base font-semibold text-slate-800">Bilge гид</h3>
          <p className="mt-1 text-sm text-slate-500">Сурооңузду жазып, серверден жооп алыңыз.</p>

          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600">
            {reply}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSend();
                }
              }}
              type="text"
              placeholder="Суроо жазыңыз..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-amber-500"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={isLoading}
              className="rounded-xl bg-amber-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Жүктөө..." : "Жөнөт"}
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-full bg-amber-700 px-6 py-3 text-base font-medium text-white shadow-lg shadow-amber-300 transition hover:bg-amber-600"
      >
        <span>{isOpen ? "Жабуу" : "Bilge гид"}</span>
        <span className={`text-lg leading-none transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ↑
        </span>
      </button>
    </div>
  );
}

export default Chatbot;

import { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      {isOpen && (
        <div className="mb-3 w-[20rem] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-300/40 sm:w-[22rem]">
          <h3 className="text-base font-semibold text-slate-800">Чат жардамчы</h3>
          <p className="mt-1 text-sm text-slate-500">
            Ыйык жерлер жана мурас боюнча суроо бериңиз.
          </p>

          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-500">
            Мен сизге маалымат табууга жардам берүүгө даярмын.
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              type="text"
              placeholder="Кабар жазыңыз..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400"
            />
            <button
              type="button"
              className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Жөнөт
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-lg shadow-indigo-300 transition hover:bg-indigo-500"
      >
        <span>{isOpen ? "Чатты жабуу" : "Чат-бот"}</span>
        <span className={`text-lg leading-none transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ↑
        </span>
      </button>
    </div>
  );
}

export default Chatbot;

import { useMemo, useState } from "react";

const traditionalMonths = [
  "Бирдин айы",
  "Жалган куран",
  "Чын куран",
  "Бугу",
  "Кулжа",
  "Теке",
  "Баш оона",
  "Аяк оона",
  "Тогуздун айы",
  "Жетинин айы",
  "Бештин айы",
  "Үчтүн айы",
];

function CalendarPage() {
  const [mode, setMode] = useState("Азыркы");
  const today = new Date();

  const traditionalInfo = useMemo(() => {
    const monthName = traditionalMonths[(today.getMonth() + 1) % 12];
    return {
      month: monthName === "Кулжа" ? "Жалган куран" : monthName,
      phase: "Ай өсүүдө",
      meaning: "Жайлоого даярдык",
    };
  }, [today]);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Календарь</h1>
      <p className="mt-3 max-w-3xl text-slate-600">Азыркы жана салттуу календарь режимдери.</p>

      <div className="mt-5 flex gap-2">
        {["Азыркы", "Салттуу"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={`rounded-full px-4 py-2 text-sm ${
              mode === item
                ? "bg-amber-700 text-white"
                : "border border-amber-200 bg-white text-amber-800"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Бүгүнкү дата</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">
          {today.toLocaleDateString("ky-KG", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        {mode === "Салттуу" && (
          <div className="mt-5 space-y-2 rounded-xl border border-amber-100 bg-amber-50/60 p-4">
            <p><strong>Ай:</strong> {traditionalInfo.month}</p>
            <p><strong>Фаза:</strong> {traditionalInfo.phase}</p>
            <p><strong>Мааниси:</strong> {traditionalInfo.meaning}</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default CalendarPage;

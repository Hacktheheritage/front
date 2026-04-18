import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { mucholYears } from "../data/mucholYears";

const YEAR = 2026;
const weekDays = ["Дүйшөмбү", "Шейшемби", "Шаршемби", "Бейшемби", "Жума", "Ишемби", "Жекшемби"];
const weekDaysShort = ["Дш", "Шш", "Шр", "Бш", "Жм", "Иш", "Жк"];
const kyrgyzMonths = [
  { name: "Бирдин айы", range: "15-январьдан 18-февралга чейин" },
  { name: "Жалган куран", range: "19-февральдан 16-мартка чейин" },
  { name: "Чын куран", range: "17-марттан 14-апрелге чейин" },
  { name: "Бугу", range: "15-апрельден 14-майга чейин" },
  { name: "Кулжа", range: "15-майдан 13-июнга чейин" },
  { name: "Теке", range: "14-июндан 13-июлга чейин" },
  { name: "Баш оона", range: "14-июлдан 12-августка чейин" },
  { name: "Аяк оона", range: "13-августтан 11-сентябрга чейин" },
  { name: "Тогуздун айы", range: "12-сентябрдан 11-октябрга чейин" },
  { name: "Жетинин айы", range: "12-октябрдан 10-ноябрга чейин" },
  { name: "Бештин айы", range: "11-ноябрдан 10-декабрга чейин" },
  { name: "Үчтүн айы", range: "11-декабрдан 14-январга чейин" },
];

const monthIcons = ["🐭", "🐄", "🐆", "🐇", "🦉", "🐍", "🐎", "🐑", "🐒", "🐓", "🐕", "🐗"];

function toMondayFirstIndex(dayValue) {
  return (dayValue + 6) % 7;
}

function getKyrgyzDate(date) {
  const d = dayjs(date);
  const index = d.month();
  const monthInfo = kyrgyzMonths[index];
  const animalIndex = ((d.year() - 2020) % 12 + 12) % 12;
  return {
    month: monthInfo.name,
    range: monthInfo.range,
    muchol: mucholYears[animalIndex],
  };
}

function buildMonthDays(monthIndex) {
  const first = new Date(YEAR, monthIndex, 1);
  const daysInMonth = new Date(YEAR, monthIndex + 1, 0).getDate();
  const offset = toMondayFirstIndex(first.getDay());
  const cells = [];

  for (let i = 0; i < offset; i += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

function CalendarPage() {
  const now = dayjs();
  const initialMonth = now.year() === YEAR ? now.month() : 0;
  const initialDay = now.year() === YEAR ? now.date() : 1;
  const [activeMonth, setActiveMonth] = useState(initialMonth);
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const [flipped, setFlipped] = useState({});

  const monthCells = useMemo(() => buildMonthDays(activeMonth), [activeMonth]);
  const selectedDate = dayjs(new Date(YEAR, activeMonth, selectedDay));
  const selectedInfo = getKyrgyzDate(selectedDate.toDate());
  const todayInfo = getKyrgyzDate(now.toDate());

  const handleMonthChange = (delta) => {
    setActiveMonth((prev) => (prev + delta + 12) % 12);
    setSelectedDay(1);
  };

  const isToday = (day) =>
    day &&
    now.year() === YEAR &&
    now.month() === activeMonth &&
    now.date() === day;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-[#14213d]">Кыргыз календары</h1>

      <section className="mt-6 rounded-2xl border border-[#e7dccd] bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">📅 Бүгүн</p>
            <p className="text-lg font-semibold text-[#14213d]">{now.format("DD.MM.YYYY")}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">🌙 Кыргыз календары</p>
            <p className="text-lg font-semibold text-[#14213d]">Ай: {todayInfo.month}</p>
            <p className="text-sm text-slate-600">📍 {todayInfo.range}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#e7dccd] bg-white p-5 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleMonthChange(-1)}
            className="rounded-full border border-[#dac7b0] px-3 py-1 text-sm text-[#b24f6b] transition hover:bg-[#f9efea]"
          >
            ←
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#14213d]">{kyrgyzMonths[activeMonth].name}</h2>
            <p className="text-sm text-slate-600">{kyrgyzMonths[activeMonth].range}</p>
          </div>
          <button
            type="button"
            onClick={() => handleMonthChange(1)}
            className="rounded-full border border-[#dac7b0] px-3 py-1 text-sm text-[#b24f6b] transition hover:bg-[#f9efea]"
          >
            →
          </button>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-2">
          {weekDaysShort.map((name) => (
            <div key={name} className="rounded-lg bg-[#f7f1e7] px-2 py-2 text-center text-xs font-semibold text-[#14213d]">
              {name}
            </div>
          ))}
          {monthCells.map((day, idx) => (
            <button
              key={`${activeMonth}-${idx}`}
              type="button"
              disabled={!day}
              onClick={() => day && setSelectedDay(day)}
              className={`min-h-[82px] rounded-xl border p-2 text-left transition ${
                !day
                  ? "cursor-default border-transparent bg-transparent"
                  : "border-[#eadfce] bg-white hover:-translate-y-0.5 hover:shadow-md"
              } ${
                day === selectedDay
                  ? "border-[#b24f6b] ring-2 ring-[#f3d7df]"
                  : ""
              } ${isToday(day) ? "bg-[#fff4f0]" : ""}`}
            >
              {day && (
                <>
                  <p className="text-base font-semibold text-[#14213d]">{day}</p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {weekDays[toMondayFirstIndex(new Date(YEAR, activeMonth, day).getDay())]}
                  </p>
                </>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#e7dccd] bg-white p-5 shadow-sm">
        <p className="text-lg text-[#14213d]">
          Бул күн: {selectedDay}-{kyrgyzMonths[activeMonth].name} {YEAR}
        </p>
        <p className="mt-2 text-lg font-semibold text-[#14213d]">
          Кыргыз айы: {selectedInfo.month}
        </p>
        <p className="mt-1 text-sm text-slate-600">{selectedInfo.range}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#14213d]">Мүчөл жылдар</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mucholYears.map((item, idx) => {
            const opened = Boolean(flipped[item.name]);
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setFlipped((prev) => ({ ...prev, [item.name]: !prev[item.name] }))}
                className="group h-56 [perspective:1000px]"
              >
                <div
                  className={`relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${
                    opened ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  <div className="absolute inset-0 rounded-2xl border border-[#eadfce] bg-white p-4 shadow-sm [backface-visibility:hidden]">
                    <p className="text-4xl">{monthIcons[idx]}</p>
                    <h3 className="mt-3 text-xl font-semibold text-[#14213d]">{item.name}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.yearLabel}</p>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-[#e2ccd2] bg-[#fff7f5] p-4 text-left shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default CalendarPage;

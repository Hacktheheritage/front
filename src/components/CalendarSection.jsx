const calendarPeriods = [
  { name: "Токсон", range: "13-декабрь — 13-март", note: "Кыштын 90 күнү" },
  { name: "Кыш чилде", range: "8-январь — 18-февраль", note: "Кыштын катаал чокусу" },
  { name: "Кырдач", range: "8-январь — 13-январь", note: "Кыш чилденин 1-баскычы" },
  { name: "Адынын алты уулу", range: "14-январь — 19-январь", note: "6 күндүк баскыч" },
  { name: "Жетинин жети уулу", range: "20-январь — 26-январь", note: "7 күндүк баскыч" },
  { name: "Кантар", range: "27-январь", note: "Кыштын чок ортосу" },
  { name: "Үт", range: "28-январь — 11-февраль", note: "15 күн" },
  { name: "Апкыт-сапкыт", range: "12-февраль — 17-февраль", note: "Өткөөл күндөр" },
  { name: "Жай чилде", range: "8-июль — 18-август", note: "Жайдын 40 күнү" },
  { name: "Темир аяз", range: "8-январь — 18-февраль", note: "Кыш чилдедеги суук" },
  { name: "Мүйүз аяз", range: "19-февраль — 27-февраль", note: "Сууктун күчөшү" },
  { name: "Кийик аяз", range: "28-февраль — 7-март", note: "Кийик аяз мезгили" },
  { name: "Козу аяз", range: "8-март — 13-март", note: "Жаз алдындагы акыркы суук" },
];

function CalendarSection() {
  return (
    <section id="calendar" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Жылнаама</h2>
      <p className="mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">
        Салттуу кыргыз календарындагы негизги мезгилдер жана алардын башталыш-аяктоо
        күндөрү.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {calendarPeriods.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
            <p className="mt-2 text-sm font-medium text-indigo-600">{item.range}</p>
            <p className="mt-2 text-sm text-slate-500">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CalendarSection;

const devs = [
  {
    id: 1,
    name: "Таттыбүбү",
    role: "Fullstack Developer",
    desc: "Долбоордун архитектурасын, маалымат базасын жана негизги логикасын түзгөн адис.",
    img: "/assets/devs/5413845661918107297.jpg",
  },
  {
    id: 2,
    name: "Азима",
    role: "Frontend Developer",
    desc: "Дизайнды UI/UX принциптерине ылайыктап, визуалдык интерфейсти жандандырган.",
    img: "/assets/devs/5413845661918107298.jpg",
  },
  {
    id: 3,
    name: "Мариям",
    role: "Backend & AI Engineer",
    desc: "Сервердик бөлүктүн коопсуздугун камсыздап, нейротармак логикасын кошкон.",
    img: "/assets/devs/b128f72a-3acb-4ac7-8085-eaa48cff54e8.jpg",
  },
  {
    id: 4,
    name: "Кайрат",
    role: "Frontend Developer / UI/UX Designer",
    desc: "Колдонуучулар үчүн эң ыңгайлуу, логикалуу жана кооз интерфейсти иштеп чыккан.",
    img: "/assets/devs/c97f54c3-760c-4662-ab84-db5f10c197c5.png",
  },
  {
    id: 5,
    name: "Асма",
    role: "Backend Developer",
    desc: "Команданын ишин координациялап, долбоорду убагында ийгиликтүү бүтүргөн.",
    img: "/assets/devs/f517a963-229a-4aac-8eee-479adad7be27.jpg",
  },
];

function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-amber-700 uppercase">
          Биздин миссия
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl lg:text-6xl">
          Биз жөнүндө
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          Бул платформа Кыргызстандагы ыйык мурасты санарип форматта сактоо жана
          таанытуу үчүн түзүлгөн. Максат — маданий эстутумду кийинки муунга
          заманбап технологиялар менен жеткирүү.
        </p>
      </div>

      <div className="mx-auto mb-20 max-w-4xl rounded-3xl border border-amber-100 bg-amber-50/50 p-8 text-center shadow-lg sm:p-12">
        <p className="text-xl font-medium leading-relaxed text-slate-800 sm:text-2xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          "Биз мурасты жөн гана көрсөтпөстөн, анын руханий маңызын да түшүндүрөбүз.
          Тарыхты түшүнүү аркылуу гана келечекти кура алабыз."
        </p>
      </div>

      {/* Team Section */}
      <div className="mt-16">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-amber-700 uppercase">
            Долбоордун авторлору
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Биздин команда
          </h2>
        </div>

        {/* 
          Using a CSS grid. Since there are 5 cards, we can do grid-cols-1, sm:grid-cols-2, 
          lg:grid-cols-3, and the last row will naturally center or wrap.
        */}
        <div className="flex flex-wrap justify-center gap-8">
          {devs.map((dev) => (
            <div
              key={dev.id}
              className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img
                  src={dev.img}
                  alt={dev.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold tracking-widest text-amber-700 uppercase">
                  {dev.role}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  {dev.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {dev.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default AboutPage;

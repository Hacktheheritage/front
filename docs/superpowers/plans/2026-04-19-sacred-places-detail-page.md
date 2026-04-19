# Sacred Places Detail Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a data-driven sacred place detail page system with listing page, reusable detail page, 7-question quiz, and updated footer.

**Architecture:** Each place is a static JS data file; a registry maps slugs to data objects. One reusable `PlacePage.jsx` renders any place via `useParams()`. Adding a new place requires only a new data file and one registry entry.

**Tech Stack:** React 18, React Router v6, Tailwind CSS, Vite (no test framework — verify with `npm run build`)

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/data/places/sulaiman-too.js` | Sulaiman-Too content, gallery, quiz |
| Create | `src/data/places/manas-ordo.js` | Manas Ordo content, gallery, quiz |
| Create | `src/data/places/index.js` | Registry: slug → data object |
| Create | `src/pages/PlacePage.jsx` | Reusable detail page (hero, glance, sections, gallery, quiz) |
| Modify | `src/pages/PlacesPage.jsx` | Refactor to listing grid of place cards |
| Modify | `src/App.jsx` | Add `/places/:slug` route |
| Modify | `src/components/Footer.jsx` | Update layout: branding left, nav center, admin right |

---

## Task 1: Place data files

**Files:**
- Create: `src/data/places/sulaiman-too.js`
- Create: `src/data/places/manas-ordo.js`
- Create: `src/data/places/index.js`

- [ ] **Step 1: Create `src/data/places/sulaiman-too.js`**

```js
const sulaimanToo = {
  slug: "sulaiman-too",
  name: "Сулайман-Тоо",
  region: "Ош облусу",
  badge: "ЮНЕСКО мурасы",
  heroImage: "/assets/places/sulaiman_too.jpg",
  heroSubtitle: "Ош · Кыргызстан",
  tagline:
    "Бул ыйык тоо миңдеген жыл бою зыяратчыларды, акындарды жана баатырларды өзүнө тарткан — убакыттын өзү таш болуп катып калган жер.",

  glance: [
    {
      title: "Тарыхый маанисинин",
      body: "Сулайман-Тоо 2009-жылы ЮНЕСКО дүйнөлүк мурас тизмесине киргизилген. Борбордук Азияда эң ыйык жайлардын бири катары Сулайман-Тоо 1500 жылдан ашык убакыт бою зыярат жери болуп келет. Байыркы үңкүр сүрөттөрү жана петроглифтер миңдеген жыл мурунку адамдардын жашашынан кабар берет.",
    },
    {
      title: "Архитектуралык деталдар",
      body: "Тоодо ондогон ыйык зыяратканалар жана кичи мечиттер бар. Беш чоку Фергана өрөөнүнүн үстүнө көтөрүлүп, жүздөгөн жылдар бою кербен жолчуларга багыт берген. Мечити Рават-Абдулла XVI кылымда курулган жана эми музей катары иштейт.",
    },
    {
      title: "Ыйык салттар",
      body: "Зыяратчылар ден соолук, берекет жана жакшылык тилеп тоого чыгышат. Эң белгилүү ырым — бал майланган жылмакай ташка жатып сырганоо, бул ооруну айыктырат жана бата берет деп ишенишет. Ар бир жыл сайын Орозо айт жана Курман айт майрамдарында миңдеген зыяратчылар жыйналат.",
    },
  ],

  sections: [
    {
      heading: "Ош шаарынын руху.",
      body: "Сулайман-Тооду басып өтүү — дүйнөнүн кайчылаш жолунда турууну билдирет. Бир миң жыл мурун бул жер Чыгыш менен Батышты байланыштырган жана соодагерлер, окумуштуулар жана аскерлер ушул жерден өткөн. Абасы болса үзбөй жыттанган жытканы жана он тилдеги сөздөрдүн жаңырыгы менен толуп турар эле.\n\nМугал падышасы Бабур XVI кылымда бул тоого жогору чыгып, Фергана өрөөнүн карап отуруп ырларын жазган. Ал өзүнүн «Бабурнаме» эмгегинде тоонун сулуулугун жана руханий кубатын сүрөттөгөн.",
      image: "/assets/places/sulaiman_too.jpg",
      imageAlt: "Сулайман-Тоо тоосунун панорамасы",
      imageLeft: false,
    },
    {
      heading: "Байыркы из.",
      body: "Сулайман-Тоонун беш чокусунда жана капчыгайларында байыркы таш сүрөттөр — петроглифтер сакталып калган. Эң байыркылары биздин доордон мурунку III–II миңжылдыктарга таандык. Жаныбарлардын, аңчылык сахналарынын жана мистикалык белгилердин сүрөттөрү кылымдардын алкагынан сыр ачып турат.\n\nБул сүрөттөр байыркы адамдардын табият менен байланышын жана аларды курчап турган дүйнөнү кантип кабыл алганын чагылдырат. Бүгүнкү күндө петроглифтерди изилдеген окумуштуулар алардын мааниси боюнча жаңы ачылыштарды жасап жатышат.",
      image:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Байыркы петроглифтер",
      imageLeft: true,
    },
  ],

  gallery: [
    "/assets/places/sulaiman_too.jpg",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
  ],

  quiz: [
    {
      question: "Сулайман-Тоо ЮНЕСКО дүйнөлүк мурас тизмесине кайсы жылы киргизилген?",
      options: ["1992", "2001", "2009", "2015"],
      answer: 2,
    },
    {
      question: "Сулайман-Тоо кайсы шаарда жайгашкан?",
      options: ["Бишкек", "Ош", "Талас", "Каракол"],
      answer: 1,
    },
    {
      question: "Сулайман-Тоодо канча чоку бар?",
      options: ["3", "4", "5", "7"],
      answer: 2,
    },
    {
      question: "Сулайман-Тоонун таштарында кандай байыркы искусство табылат?",
      options: ["Фреска", "Мозаика", "Петроглиф", "Сүрөт боёк"],
      answer: 2,
    },
    {
      question: "XVI кылымда Сулайман-Тоону зыярат кылган атактуу падыша ким болгон?",
      options: ["Чыңгыз хан", "Тимур", "Бабур", "Аттила"],
      answer: 2,
    },
    {
      question: '"Сулайман" аты эмнени туюнтат?',
      options: [
        "Кыргыз баатыры",
        "Сулайман пайгамбар",
        "Жергиликтүү бий",
        "Күн кудайы",
      ],
      answer: 1,
    },
    {
      question:
        "Сулайман-Тоодо кайсы ырым ооруну айыктырат жана бата берет деп ишенилет?",
      options: [
        "Ыйык булактан суу ичүү",
        "Жылаңайлак жүрүү",
        "Жылмакай ташка сырганоо",
        "Ыйык отту айланып өтүү",
      ],
      answer: 2,
    },
  ],
};

export default sulaimanToo;
```

- [ ] **Step 2: Create `src/data/places/manas-ordo.js`**

```js
const manasOrdo = {
  slug: "manas-ordo",
  name: "Манас Ордо",
  region: "Талас облусу",
  badge: "Улуттук комплекс",
  heroImage: "/assets/places/manas_ordo.jpg",
  heroSubtitle: "Талас · Кыргызстан",
  tagline:
    "Бул жер жөн гана мемориал эмес — кыргыз элинин жүрөгү, миңдеген жылдык эпостун тиреги жана улуттук руханий кайнар булагы.",

  glance: [
    {
      title: "Манас эпосу",
      body: "Манас эпосу дүйнөдөгү эң узун оозеки эпос болуп эсептелет — болжол менен 500 000 саптан турат, бул Гомердин «Илиада» жана «Одиссея» чыгармаларынан жыйынтыгында жыйырма эсе узун. Эпос баатыр Манастын кыргыз уруктарын бириктирүү үчүн жүргүзгөн күрөшүн сүрөттөйт.",
    },
    {
      title: "Мемориалдык комплекс",
      body: "Комплекстин борборунда XIV кылымга таандык кооз гүмбөз (мавзолей) турат. Жанындагы музейде эпостун оозеки салтын жана Манас образын чагылдырган артефакттар, колжазмалар жана экспозициялар коюлган. Комплекс Талас шаарынан 18 чакырым алыс жайгашкан.",
    },
    {
      title: "Маданий маанисинин",
      body: "Манасчынын (жырчынын) ар бир аткаруусу ыйык иш деп саналат. Комплекс Борбордук Азиянын ар кыл өлкөлөрүнөн зыяратчыларды тарткан кыргыз улуттук инсандыгынын руханий жүрөгү болуп кызмат кылат. 1995-жылы Манас эпосунун 1000 жылдыгы ЮНЕСКОнун колдоосу менен дүйнө жүзүндө белгиленген.",
    },
  ],

  sections: [
    {
      heading: "Баатырдын руху.",
      body: "Манас Ордону аралап жүрүү — легендарлуу баатырдын дүйнөсүнө кадам таштоону билдирет. Гүмбөздүн жашыл купол түрүндөгү башы асманга сунулуп, айланасындагы жашыл талааны кийинген кезде жан дүйнөдө таң калуу сезими пайда болот. Анын курулгандыгы боюнча дагы эле тарыхчылар талаш жүргүзүп жатышат — бирок бул жердин маанисинде эч кандай күмөн жок.\n\nЭпостун кейипкерлери — Манас, Каныкей, Алмамбет — бул жерде жандуу сыяктуу сезилет. Жыл сайын манасчылар Кыргызстандын ар бурчунан жыйналып, эпостун үзүндүлөрүн аткарышат жана кийинки муунга берип келишет.",
      image: "/assets/places/manas_ordo.jpg",
      imageAlt: "Манас Ордо мемориалдык комплекси",
      imageLeft: false,
    },
    {
      heading: "Манасчылар салты.",
      body: "Манасчылар — Манас эпосун жатка билген жана аткарган оозеки маданияттын кармоочулары. Алар эпостун бөлүктөрүн же бүтүндөй текстин аткарышат, ар бир аткаруу эки саатан бир нече күнгө чейин созулушу мүмкүн. Манасчы болуу — бул жөн гана жаттоо эмес, ал руханий жол жана жоопкерчилик.\n\nЭпостун үч бөлүмү бар: Манас, Семетей жана Сейтек — бул трилогия кыргыз маданиятынын жана тарыхынын негизги булагы болуп саналат. ЮНЕСКО 2003-жылы Манас эпосунун оозеки салтын адамзаттын материалдык эмес маданий мурасынын тизмесине кошкон.",
      image:
        "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Кыргыз талаасы жана эпос салты",
      imageLeft: true,
    },
  ],

  gallery: [
    "/assets/places/manas_ordo.jpg",
    "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
  ],

  quiz: [
    {
      question: "Манас Ордо Кыргызстандын кайсы облусунда жайгашкан?",
      options: ["Чүй", "Ысык-Көл", "Талас", "Ош"],
      answer: 2,
    },
    {
      question: "Манас эпосу эмне менен белгилүү?",
      options: [
        "Эң кыска эпос",
        "Дүйнөдөгү эң узун оозеки эпос",
        "Биринчи жазма эпос",
        "Эң байыркы эпос",
      ],
      answer: 1,
    },
    {
      question: "Манас Ордонун борбордук эстелиги кандай курулуш?",
      options: ["Чиркөө", "Чеп", "Гүмбөз (мавзолей)", "Мечит"],
      answer: 2,
    },
    {
      question: "Гүмбөз кайсы кылымга таандык?",
      options: ["X кылым", "XII кылым", "XIV кылым", "XVI кылым"],
      answer: 2,
    },
    {
      question: "Манас эпосун аткаруучулар кантип аталат?",
      options: ["Акын", "Манасчы", "Жырчы", "Комузчу"],
      answer: 1,
    },
    {
      question: "Манас трилогиясынын үч бөлүмү кайсылар?",
      options: [
        "Манас, Семетей, Сейтек",
        "Манас, Бакай, Эр Табылды",
        "Манас, Эр Солто, Алмамбет",
        "Манас, Каныкей, Сейтек",
      ],
      answer: 0,
    },
    {
      question: "Манас эпосунун 1000 жылдыгы кайсы жылы белгиленген?",
      options: ["1989", "1995", "2001", "2003"],
      answer: 1,
    },
  ],
};

export default manasOrdo;
```

- [ ] **Step 3: Create `src/data/places/index.js`**

```js
import sulaimanToo from "./sulaiman-too";
import manasOrdo from "./manas-ordo";

const PLACES = {
  "sulaiman-too": sulaimanToo,
  "manas-ordo": manasOrdo,
};

export default PLACES;
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build` from the project root.
Expected: build completes with no errors (the new data files are not yet imported by any component, so zero warnings expected).

- [ ] **Step 5: Commit**

```bash
git add src/data/places/
git commit -m "feat: add place data files for Sulaiman-Too and Manas Ordo"
```

---

## Task 2: Add `/places/:slug` route in App.jsx

**Files:**
- Modify: `src/App.jsx`
- Create: `src/pages/PlacePage.jsx` (empty stub — just enough to avoid import error)

- [ ] **Step 1: Create stub `src/pages/PlacePage.jsx`**

```jsx
export default function PlacePage() {
  return <div />;
}
```

- [ ] **Step 2: Update `src/App.jsx`**

Add the import after the existing page imports and add the route inside `<Routes>`:

```jsx
import { Navigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PlacesPage from "./pages/PlacesPage";
import PlacePage from "./pages/PlacePage";
import MapPage from "./pages/MapPage";
import CalendarPage from "./pages/CalendarPage";
import AboutPage from "./pages/AboutPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import { HomeContentProvider } from "./contexts/HomeContentContext";
import { AdminAuthProvider, useAdminAuth } from "./contexts/AdminAuthContext";

function AdminRoute({ children }) {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
}

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <AdminAuthProvider>
      <HomeContentProvider>
        <div className="min-h-screen bg-[#f4efe5] text-slate-800">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/places" element={<PlacesPage />} />
            <Route path="/places/:slug" element={<PlacePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminRoute><AdminPanelPage /></AdminRoute>} />
          </Routes>
          <Footer />
          {!isHomePage && <Chatbot />}
        </div>
      </HomeContentProvider>
    </AdminAuthProvider>
  );
}

export default App;
```

- [ ] **Step 3: Verify build passes**

Run: `npm run build`
Expected: clean build, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/pages/PlacePage.jsx
git commit -m "feat: add /places/:slug route"
```

---

## Task 3: Implement PlacePage.jsx

**Files:**
- Modify: `src/pages/PlacePage.jsx` (replace stub with full implementation)

- [ ] **Step 1: Write the full component**

Replace the entire contents of `src/pages/PlacePage.jsx` with:

```jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PLACES from "../data/places";

function GlanceItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-200 last:border-none">
      <button
        type="button"
        onClick={onToggle}
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
          At a Glance
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
            Visual Archive.
          </h2>
          <p className="text-xs text-slate-400">A curated collection of perspectives.</p>
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
            Test Your Knowledge.
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Seven questions to reflect on the history of {place.name}.
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
                {score} / 7
              </p>
              <p className="mt-1 text-sm text-amber-700">
                {score === 7
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
                onClick={() => setSubmitted(true)}
                className="rounded-full bg-amber-700 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-amber-900/30 transition hover:bg-amber-600 hover:scale-105 active:scale-100"
              >
                Submit Answers
              </button>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: clean build. Navigate to `http://localhost:5173/places/sulaiman-too` and `http://localhost:5173/places/manas-ordo` in dev server to verify both render without errors.

Run dev server to spot-check: `npm run dev`

- [ ] **Step 3: Commit**

```bash
git add src/pages/PlacePage.jsx
git commit -m "feat: implement reusable PlacePage with hero, glance accordion, narrative sections, gallery, and quiz"
```

---

## Task 4: Refactor PlacesPage.jsx to listing grid

**Files:**
- Modify: `src/pages/PlacesPage.jsx`

- [ ] **Step 1: Replace contents of `src/pages/PlacesPage.jsx`**

```jsx
import { Link } from "react-router-dom";
import PLACES from "../data/places";

function PlacesPage() {
  const places = Object.values(PLACES);

  return (
    <main className="bg-[#f4efe5]">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700">
            Белгилүү жайлар
          </p>
          <h1
            className="mt-3 text-4xl font-semibold text-slate-800 sm:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Ыйык жерлер
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
            Кыргызстандын тарыхый жана руханий мурасын тааныңыз.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {places.map((p) => (
            <Link
              key={p.slug}
              to={`/places/${p.slug}`}
              className="group relative overflow-hidden rounded-3xl shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <img
                src={p.heroImage}
                alt={p.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
              <div className="relative flex h-72 flex-col justify-between p-8 sm:h-80">
                <span className="w-fit rounded-full border border-amber-400/50 bg-amber-900/50 px-3 py-1 text-xs font-medium text-amber-100 backdrop-blur-sm">
                  {p.badge}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                    {p.region}
                  </p>
                  <h2
                    className="mt-1.5 text-3xl font-semibold text-amber-200 sm:text-4xl"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {p.name}
                  </h2>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-amber-200 transition-all group-hover:gap-3">
                    Толук маалымат
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default PlacesPage;
```

- [ ] **Step 2: Verify in dev server**

Run: `npm run dev`
Navigate to `http://localhost:5173/places`. Verify two place cards appear and clicking each navigates to the correct detail page.

- [ ] **Step 3: Commit**

```bash
git add src/pages/PlacesPage.jsx
git commit -m "feat: refactor PlacesPage to listing grid linking to /places/:slug"
```

---

## Task 5: Update Footer.jsx

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Replace contents of `src/components/Footer.jsx`**

```jsx
import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "Жерлер", to: "/places" },
  { label: "Биз жөнүндө", to: "/about" },
  { label: "Legal", to: "#" },
  { label: "Байланыш", to: "#" },
];

function Footer() {
  return (
    <footer className="footer-glow border-t border-amber-100 bg-[#f4efe5]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left: branding + copyright */}
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Bilge · 𐰴𐰃𐰺𐰏𐰃𐰕
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              © {new Date().getFullYear()} Bilge. All Rights Reserved.
            </p>
          </div>

          {/* Center: nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-slate-500">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="transition hover:text-amber-700"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right: admin login */}
          <Link
            to="/admin-login"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-900 shadow transition hover:-translate-y-0.5 hover:bg-white"
            aria-label="Admin login"
          >
            <span className="text-sm font-semibold">A</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

- [ ] **Step 2: Verify build and visual**

Run: `npm run build`
Expected: clean build.

Run dev server and check the footer across `/`, `/places`, and `/places/sulaiman-too`. Verify three-column layout on desktop and stacked on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: update footer layout with nav links and Bilge branding"
```

---

## Self-Review Checklist

- [x] **Spec coverage:**
  - ✅ Data registry with slug-based lookup → Task 1 + Task 2
  - ✅ Hero section (dark, image right, name/region/tagline left) → Task 3
  - ✅ At a Glance accordion → Task 3
  - ✅ Alternating narrative sections → Task 3
  - ✅ Visual Archive gallery (2fr/1fr grid, large left + 2 stacked right) → Task 3
  - ✅ Quiz (7 questions, 4 options, submit → score) → Task 3
  - ✅ PlacesPage listing refactor → Task 4
  - ✅ Footer update → Task 5
  - ✅ Sulaiman-Too content + quiz → Task 1
  - ✅ Manas Ordo content + quiz → Task 1
  - ✅ Cormorant Garamond font used throughout → all heading elements

- [x] **No placeholders:** All code blocks are complete; all quiz questions, glance content, and section bodies are filled in.

- [x] **Type consistency:** `PLACES[slug]` returns objects matching the schema used in `PlacePage.jsx`. Properties `slug`, `name`, `region`, `badge`, `heroImage`, `heroSubtitle`, `tagline`, `glance`, `sections`, `gallery`, `quiz` are all present in both data files and consumed correctly in the component.

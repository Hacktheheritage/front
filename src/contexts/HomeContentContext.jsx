import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "bilge-home-content-v1";

const defaultFeatures = [
  {
    id: "feature-1",
    href: "/places",
    gradient: "from-amber-50 to-orange-50",
    iconName: "globe",
    title: "Ыйык Жерлер",
    desc: "Сулайман-Тоо, Манас Ордо жана ондогон тарыхый жайларды изилдеңиз.",
    cta: "Жерлерди ачуу",
  },
  {
    id: "feature-2",
    href: "/map",
    gradient: "from-sky-50 to-teal-50",
    iconName: "map",
    title: "Интерактив Карта",
    desc: "Кыргызстандын ыйык жана тарыхый жайларын интерактив картадан таап, байланыштарды ачыңыз.",
    cta: "Картаны ачуу",
  },
  {
    id: "feature-3",
    href: "/calendar",
    gradient: "from-rose-50 to-amber-50",
    iconName: "calendar",
    title: "Жылнаама 2026",
    desc: "Мүчөл жылдарын, маданий майрамдарды жана тарыхый даталарды толук жылдык форматта карап чыгыңыз.",
    cta: "Жылнааманы ачуу",
  },
];

const defaultPlaces = [
  {
    id: "place-1",
    name: "Сулайман-Тоо",
    region: "Ош облусу",
    badge: "ЮНЕСКО мурасы",
    desc: "Ыйык тоо — байыркы зыярат жери. Кыргыздардын руханий дүйнөтаанымы жана табият менен байланышы ушул жерде чагылдырылат.",
    img: "/assets/places/sulaiman_too.jpg",
    accent: "text-violet-200",
    badgeStyle: "border-violet-300/50 bg-violet-900/50 text-violet-100",
  },
  {
    id: "place-2",
    name: "Манас Ордо",
    region: "Талас облусу",
    badge: "Улуттук комплекс",
    desc: "Баатыр Манастын мемориалдык комплекси — кыргыз эпосунун жүрөгү жана улуттук руханий кайнар булагы.",
    img: "/assets/places/manas_ordo.jpg",
    accent: "text-amber-200",
    badgeStyle: "border-amber-400/50 bg-amber-900/50 text-amber-100",
  },
];

const HomeContentContext = createContext(null);

const initialState = {
  features: defaultFeatures,
  places: defaultPlaces,
  showMission: true,
  showQuote: true,
};

export function HomeContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    if (typeof window === "undefined") return initialState;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialState;
    } catch (error) {
      return initialState;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (error) {
      // ignore write errors
    }
  }, [content]);

  const addFeature = (feature) => {
    setContent((prev) => ({
      ...prev,
      features: [...prev.features, { id: `feature-${Date.now()}`, ...feature }],
    }));
  };

  const removeFeature = (id) => {
    setContent((prev) => ({ ...prev, features: prev.features.filter((item) => item.id !== id) }));
  };

  const addPlace = (place) => {
    setContent((prev) => ({
      ...prev,
      places: [...prev.places, { id: `place-${Date.now()}`, ...place }],
    }));
  };

  const removePlace = (id) => {
    setContent((prev) => ({ ...prev, places: prev.places.filter((item) => item.id !== id) }));
  };

  const toggleMission = () => {
    setContent((prev) => ({ ...prev, showMission: !prev.showMission }));
  };

  const toggleQuote = () => {
    setContent((prev) => ({ ...prev, showQuote: !prev.showQuote }));
  };

  return (
    <HomeContentContext.Provider
      value={{
        ...content,
        addFeature,
        removeFeature,
        addPlace,
        removePlace,
        toggleMission,
        toggleQuote,
      }}
    >
      {children}
    </HomeContentContext.Provider>
  );
}

export function useHomeContent() {
  const context = useContext(HomeContentContext);
  if (!context) {
    throw new Error("useHomeContent must be used within HomeContentProvider");
  }
  return context;
}

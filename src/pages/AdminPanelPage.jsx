import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeContent } from "../contexts/HomeContentContext";
import { useAdminAuth } from "../contexts/AdminAuthContext";

function AdminPanelPage() {
  const {
    features,
    places,
    showMission,
    showQuote,
    addFeature,
    removeFeature,
    addPlace,
    removePlace,
    toggleMission,
    toggleQuote,
  } = useHomeContent();
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin-login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin-login", { replace: true });
  };

  const [featureData, setFeatureData] = useState({ title: "", desc: "", cta: "Көрүү", href: "/places", iconName: "star" });
  const [placeData, setPlaceData] = useState({ name: "", region: "", badge: "Жаңы", desc: "", img: "/assets/places/sulaiman_too.jpg", accent: "text-amber-200", badgeStyle: "border-amber-400/50 bg-amber-900/50 text-amber-100" });

  const handleFeatureSubmit = (event) => {
    event.preventDefault();
    if (!featureData.title.trim() || !featureData.desc.trim()) return;
    addFeature(featureData);
    setFeatureData({ title: "", desc: "", cta: "Көрүү", href: "/places", iconName: "star" });
  };

  const handlePlaceSubmit = (event) => {
    event.preventDefault();
    if (!placeData.name.trim() || !placeData.region.trim() || !placeData.desc.trim()) return;
    addPlace(placeData);
    setPlaceData({ name: "", region: "", badge: "Жаңы", desc: "", img: "/assets/places/sulaiman_too.jpg", accent: "text-amber-200", badgeStyle: "border-amber-400/50 bg-amber-900/50 text-amber-100" });
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6">
      <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900">Админ панел</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Бул жерде башкы беттеги блокторду өзгөртө аласыз: жаңы функционал карталарын кошуңуз, белгилүү жайларды башкаруу жана миссия/сайт цитатасын көрсөтүүнү өчүрүңүз.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-auto inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
          >
            Чыгуу
          </button>
        </div>
      </div>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Функционал карталарын башкаруу</h2>
                <p className="mt-2 text-sm text-slate-500">Бул карталар башкы беттеги блок катары пайда болот.</p>
              </div>
            </div>
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-start justify-between gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <p className="font-semibold text-slate-900">{feature.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{feature.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFeature(feature.id)}
                    className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
            <form onSubmit={handleFeatureSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                Аты
                <input
                  value={featureData.title}
                  onChange={(e) => setFeatureData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-amber-400"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Сүрөттөмө
                <input
                  value={featureData.desc}
                  onChange={(e) => setFeatureData((prev) => ({ ...prev, desc: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-amber-400"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Баштоо шилтемеси
                <input
                  value={featureData.href}
                  onChange={(e) => setFeatureData((prev) => ({ ...prev, href: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-amber-400"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Кнопка тексти
                <input
                  value={featureData.cta}
                  onChange={(e) => setFeatureData((prev) => ({ ...prev, cta: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-amber-400"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700 sm:col-span-2">
                Иконка (globe, map, calendar, star)
                <input
                  value={featureData.iconName}
                  onChange={(e) => setFeatureData((prev) => ({ ...prev, iconName: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-amber-400"
                />
              </label>
              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center rounded-2xl bg-amber-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
              >
                Функционал кошуу
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Белгилүү жайларды башкаруу</h2>
                <p className="mt-2 text-sm text-slate-500">Бул жерде башкы беттеги 2 же андан көп жайларды кошуп/өчүрө аласыз.</p>
              </div>
            </div>
            <div className="space-y-4">
              {places.map((place) => (
                <div key={place.id} className="flex items-start justify-between gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <p className="font-semibold text-slate-900">{place.name}</p>
                    <p className="mt-1 text-sm text-slate-600">{place.region}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePlace(place.id)}
                    className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
            <form onSubmit={handlePlaceSubmit} className="mt-6 grid gap-4">
              <label className="space-y-2 text-sm text-slate-700">
                Жайдын аты
                <input
                  value={placeData.name}
                  onChange={(e) => setPlaceData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-amber-400"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Регион
                <input
                  value={placeData.region}
                  onChange={(e) => setPlaceData((prev) => ({ ...prev, region: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-amber-400"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Сүрөттөмө
                <textarea
                  value={placeData.desc}
                  onChange={(e) => setPlaceData((prev) => ({ ...prev, desc: e.target.value }))}
                  rows={3}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-amber-400"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Сүрөт URL
                <input
                  value={placeData.img}
                  onChange={(e) => setPlaceData((prev) => ({ ...prev, img: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-amber-400"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Жай кошуу
              </button>
            </form>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Секторияларды башкаруу</h2>
            <p className="mt-2 text-sm text-slate-500">Бул көрсөтүлүүчү блоктордун көрүнүшүн көзөмөлдөйт.</p>
            <div className="mt-6 space-y-4">
              <button
                type="button"
                onClick={toggleMission}
                className="w-full rounded-2xl border border-slate-200 bg-amber-50 px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:border-amber-300"
              >
                {showMission ? "Миссияны өчүрүү" : "Миссияны көрсөтүү"}
              </button>
              <button
                type="button"
                onClick={toggleQuote}
                className="w-full rounded-2xl border border-slate-200 bg-amber-50 px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:border-amber-300"
              >
                {showQuote ? "Цитатаны өчүрүү" : "Цитатаны көрсөтүү"}
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Тез жардам</h2>
            <p className="mt-2 text-sm text-slate-500">Бул бетте болгон өзгөртүүлөр автоматтык түрдө LocalStorage'ке сакталат.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default AdminPanelPage;

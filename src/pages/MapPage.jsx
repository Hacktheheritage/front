import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MapFlyTo from "../components/MapFlyTo";
import { HERO_SLIDES } from "../data/heroLandmarks";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const places = [
  {
    id: 1,
    slug: "sulaiman-too",
    type: "Ыйык жерлер",
    position: [40.5243, 72.7995],
    title: "Сулайман-Тоо",
    meaning: "Ыйык тоо, зыярат жери",
    rituals: "Ниет, тилек, ырым-жырым",
    risks: "Шаардык басым, эрозия",
  },
  {
    id: 2,
    slug: "manas-ordo",
    type: "Петроглифтер",
    position: [42.746, 76.1124],
    title: "Саймалуу-Таш",
    meaning: "Байыркы сүрөт таштар жыйнагы",
    rituals: "Жайкы изилдөө, урматтоо ырымдары",
    risks: "Климаттык бузулуу, татаал жетүү",
  },
  {
    id: 3,
    type: "Табигый объекттер",
    position: [41.8879, 74.5983],
    title: "Ысык-Ата капчыгайы",
    meaning: "Табигый касиеттүү булактар аймагы",
    rituals: "Дарылык ниет, тазалануу жөрөлгөсү",
    risks: "Туристтик жүк, таштанды",
  },
];

const heroPlaces = HERO_SLIDES.map((slide) => ({
  id: slide.id,
  type: "Табигый объекттер",
  position: slide.position,
  title: slide.caption,
  meaning: "Башкы беттеги сүрөт ошол аймакка шилтеме кылат.",
  rituals: "—",
  risks: "Аймакка жараша: бийиктик, аба ырайы, жол шарттары.",
  mapZoom: slide.mapZoom,
}));

function MapPage() {
  const [searchParams] = useSearchParams();
  const placeId = searchParams.get("place");

  const [filter, setFilter] = useState("Баары");
  const [searchText, setSearchText] = useState("");
  const [userMapFocus, setUserMapFocus] = useState(null);
  const [searchHint, setSearchHint] = useState("");

  const allPlaces = useMemo(() => [...places, ...heroPlaces], []);

  useEffect(() => {
    if (placeId) setFilter("Баары");
  }, [placeId]);

  useEffect(() => {
    setUserMapFocus(null);
  }, [placeId]);

  const focusTarget = useMemo(() => {
    if (!placeId) return null;
    return allPlaces.find((item) => String(item.id) === placeId) ?? null;
  }, [placeId, allPlaces]);

  const urlMapFocus = focusTarget
    ? { position: focusTarget.position, zoom: focusTarget.mapZoom ?? 10 }
    : null;

  const mapFlyTarget = userMapFocus ?? urlMapFocus;

  const searchSuggestions = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (q.length < 1) return [];
    return allPlaces
      .filter((item) => item.title.toLowerCase().includes(q))
      .slice(0, 8);
  }, [searchText, allPlaces]);

  const goToPlace = (item) => {
    setFilter("Баары");
    setSearchText(item.title);
    setSearchHint("");
    setUserMapFocus({
      position: item.position,
      zoom: item.mapZoom ?? 11,
    });
  };

  const handleSearchSubmit = () => {
    const q = searchText.trim().toLowerCase();
    if (!q) {
      setSearchHint("Аталышты жазыңыз.");
      return;
    }
    const matches = allPlaces.filter((item) => item.title.toLowerCase().includes(q));
    if (matches.length === 0) {
      setSearchHint("Мындай аталыштагы жер табылган жок.");
      setUserMapFocus(null);
      return;
    }
    goToPlace(matches[0]);
  };

  const filtered = useMemo(
    () => (filter === "Баары" ? allPlaces : allPlaces.filter((item) => item.type === filter)),
    [filter, allPlaces]
  );

  return (
    <main className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Карта</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Кыргызстандын ыйык жайлары, петроглифтери жана табигый объекттери.
      </p>

      <div className="relative mt-5 max-w-xl">
        <label htmlFor="map-search" className="sr-only">
          Жер издөө
        </label>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <div className="relative min-w-0 flex-1">
            <input
              id="map-search"
              type="search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setSearchHint("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearchSubmit();
                }
              }}
              placeholder="Жердин атын жазыңыз (мисалы: Сулайман, Хан Теңири)"
              autoComplete="off"
              className="w-full rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            />
            {searchSuggestions.length > 0 && (
              <ul
                className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-auto rounded-xl border border-amber-100 bg-white py-1 shadow-lg"
                role="listbox"
              >
                {searchSuggestions.map((item) => (
                  <li key={String(item.id)} role="option">
                    <button
                      type="button"
                      className="flex w-full items-start px-4 py-2.5 text-left text-sm text-slate-800 hover:bg-amber-50"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => goToPlace(item)}
                    >
                      <span className="font-medium">{item.title}</span>
                      <span className="ml-2 shrink-0 text-xs text-slate-500">{item.type}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex gap-2 sm:w-auto">
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-600"
            >
              Табуу
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchText("");
                setSearchHint("");
                setUserMapFocus(null);
              }}
              className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-medium text-amber-900 transition hover:bg-amber-50"
            >
              Тазалоо
            </button>
          </div>
        </div>
        {searchHint ? (
          <p className="mt-2 text-sm text-amber-800">{searchHint}</p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {["Баары", "Ыйык жерлер", "Петроглифтер", "Табигый объекттер"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm ${
              filter === item
                ? "bg-amber-700 text-white"
                : "border border-amber-200 bg-white text-amber-800"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
        <MapContainer
          center={[41.2, 74.8]}
          zoom={6}
          style={{ height: "440px", width: "100%" }}
          scrollWheelZoom
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {mapFlyTarget && (
            <MapFlyTo position={mapFlyTarget.position} zoom={mapFlyTarget.zoom} />
          )}
          {filtered.map((item) => (
            <Marker key={String(item.id)} position={item.position} icon={icon}>
              <Popup>
                <div className="space-y-2">
                  <div className="space-y-1 text-sm">
                    <p><strong>Аталышы:</strong> {item.title}</p>
                    <p><strong>Мааниси:</strong> {item.meaning}</p>
                    <p><strong>Салттар:</strong> {item.rituals}</p>
                    <p><strong>Коркунучтар:</strong> {item.risks}</p>
                  </div>
                  {item.slug && (
                    <Link
                      to={`/places/${item.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-700 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-amber-600 w-full"
                    >
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
                    </Link>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </main>
  );
}

export default MapPage;

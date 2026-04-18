import { useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const places = [
  {
    id: 1,
    type: "Ыйык жерлер",
    position: [40.5243, 72.7995],
    title: "Сулайман-Тоо",
    meaning: "Ыйык тоо, зыярат жери",
    rituals: "Ниет, тилек, ырым-жырым",
    risks: "Шаардык басым, эрозия",
  },
  {
    id: 2,
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

function MapPage() {
  const [filter, setFilter] = useState("Баары");
  const filtered = useMemo(
    () => (filter === "Баары" ? places : places.filter((item) => item.type === filter)),
    [filter]
  );

  return (
    <main className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Карта</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Кыргызстандын ыйык жайлары, петроглифтери жана табигый объекттери.
      </p>

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
          {filtered.map((item) => (
            <Marker key={item.id} position={item.position} icon={icon}>
              <Popup>
                <div className="space-y-1 text-sm">
                  <p><strong>Аталышы:</strong> {item.title}</p>
                  <p><strong>Мааниси:</strong> {item.meaning}</p>
                  <p><strong>Салттар:</strong> {item.rituals}</p>
                  <p><strong>Коркунучтар:</strong> {item.risks}</p>
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

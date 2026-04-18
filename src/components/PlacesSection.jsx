const places = [
  {
    id: 1,
    name: "Таш-Рабат",
    image:
      "https://images.unsplash.com/photo-1544737151-6e4b9a91f2b9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Сулайман-Тоо",
    image:
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Соң-Көл",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  },
];

function PlacesSection() {
  return (
    <section id="places" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Ыйык жерлер
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <a
            key={place.id}
            href="#"
            className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
          >
            <div className="h-52 overflow-hidden">
              <img
                src={place.image}
                alt={place.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-medium text-slate-800">{place.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default PlacesSection;

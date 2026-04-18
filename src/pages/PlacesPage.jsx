import { useState } from "react";

function PlacesPage() {
  const [analysis, setAnalysis] = useState(
    "Сүрөт жүктөлгөндөн кийин AI талдоо ушул жерде көрсөтүлөт."
  );

  const onFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAnalysis(
      "Бул сүрөт байыркы аңчылык маданиятын билдирет. Жаныбар образы коомдун табият менен байланышын жана жөрөлгөлүү дүйнөтаанымын чагылдырат."
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-slate-900">Ыйык жерлер жана петроглифтер</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Ыйык жайлардын маданий мааниси жана петроглифтерди AI аркылуу талдоо.
      </p>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-semibold">Сулайман-Тоо</h2>
          <p className="mt-2 text-sm text-slate-600">
            Мааниси: Ыйык тоо, зыярат жери. Салттар: ниет, тилек, ырым-жырым.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-semibold">Манас Ордо</h2>
          <p className="mt-2 text-sm text-slate-600">
            Мааниси: Улуттук тарыхый-маданий борбор. Салттар: руханий эскерүү, урмат.
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Петроглиф анализи</h2>
        <p className="mt-2 text-sm text-slate-600">
          Сүрөт жүктөө, AI таануу жана түшүндүрмө берүү.
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="mt-4 block w-full rounded-lg border border-slate-200 p-3 text-sm"
        />
        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
          {analysis}
        </div>
      </section>
    </main>
  );
}

export default PlacesPage;

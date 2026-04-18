import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../contexts/AdminAuthContext";

function AdminLoginPage() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.username.trim() || !form.password) {
      setError("Бардык талааларды толтуруңуз.");
      return;
    }

    setIsLoading(true);
    try {
      await login(form);
      navigate("/admin", { replace: true });
    } catch (fetchError) {
      setError(fetchError?.message || "Кирүү учурунда ката болду.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">Админ кирүү</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Bilge админ панелине кирүү</h1>
          <p className="mt-3 text-slate-600">Бул бетте реалдуу backend аутентификациясына өткөнбүз. Кирүү үчүн сервердеги админ эсептин маалыматтарын колдонуңуз.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-sm font-medium text-slate-700">
            Колдонуучу аты
            <input
              value={form.username}
              onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-amber-400"
              placeholder="admin"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Сырсөз
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-amber-400"
              placeholder="********"
            />
          </label>

          {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-amber-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Жүктөө..." : "Кирүү"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminLoginPage;

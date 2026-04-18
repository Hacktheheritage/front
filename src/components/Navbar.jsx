import { useState } from "react";

const navItems = [
  "Башкы бет",
  "Ыйык жерлер",
  "Жылнаама",
  "Макалалар",
  "Издөө",
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-end gap-2 text-2xl font-semibold tracking-tight text-slate-900">
          <span className="text-indigo-500">𐰉𐰃𐰠𐰏𐰀</span>
          <span className="text-base font-medium text-slate-700">Билге</span>
        </a>

        <nav className="hidden items-center gap-7 text-base md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-slate-600 transition hover:text-indigo-600"
            >
              {item}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-700 md:hidden"
        >
          Меню
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mx-4 mb-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg md:hidden">
          <nav className="flex flex-col items-start gap-3 text-base">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="w-full rounded-lg px-2 py-2 text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;

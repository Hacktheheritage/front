import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Башкы бет", to: "/" },
  { label: "Ыйык жерлер", to: "/places" },
  { label: "Карта", to: "/map" },
  { label: "Жылнаама", to: "/calendar" },
  { label: "Биз жөнүндө", to: "/about" },
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "header-glow border-b border-amber-100/80 bg-[#f4efe5]/92 shadow-sm backdrop-blur-lg"
          : "border-b border-white/15 bg-[#0f1b3d]/35 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-end gap-2 text-2xl font-semibold tracking-tight">
          <span className={isScrolled ? "text-amber-800" : "text-amber-200"}>𐰉𐰃𐰠𐰏𐰀</span>
          <span className={`text-base font-medium ${isScrolled ? "text-slate-700" : "text-slate-100"}`}>Билге</span>
        </NavLink>

        <nav className="hidden items-center gap-7 text-base md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `relative pb-1 font-medium transition duration-200 after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                  isActive
                    ? "text-amber-800 after:scale-x-100"
                    : isScrolled
                      ? "text-slate-700 hover:text-amber-800"
                      : "text-slate-100 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 text-xs font-semibold text-slate-600 md:flex">
          <button type="button" className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-800">
            KG
          </button>
          <button type="button" className="rounded-full px-2.5 py-1 hover:bg-amber-50">
            RU
          </button>
          <button type="button" className="rounded-full px-2.5 py-1 hover:bg-amber-50">
            EN
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="rounded-full border border-amber-200 px-4 py-1.5 text-sm text-slate-700 md:hidden"
        >
          Меню
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mx-4 mb-3 rounded-2xl border border-amber-100 bg-white p-4 shadow-lg md:hidden">
          <nav className="flex flex-col items-start gap-3 text-base">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className="w-full rounded-lg px-2 py-2 text-slate-700 transition hover:bg-amber-50 hover:text-amber-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-600">
            <button type="button" className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-800">
              KG
            </button>
            <button type="button" className="rounded-full px-2.5 py-1 hover:bg-amber-50">
              RU
            </button>
            <button type="button" className="rounded-full px-2.5 py-1 hover:bg-amber-50">
              EN
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

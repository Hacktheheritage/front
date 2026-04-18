import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-glow mt-16 border-t border-amber-100 bg-[#f4efe5]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-base text-slate-600 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <p>© {new Date().getFullYear()} Bilge · 𐰴𐰃𐰺𐰏𐰃𐰕</p>
          <p>Байланыш: hello@bilge.kg | +996 700 00 00 00</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin-login"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-900 shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-white"
            aria-label="Admin login">
            <span className="text-lg font-semibold">A</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

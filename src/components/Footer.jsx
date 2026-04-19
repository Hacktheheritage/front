import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "Жерлер", to: "/places" },
  { label: "Биз жөнүндө", to: "/about" },
  { label: "Legal", to: "#" },
  { label: "Байланыш", to: "#" },
];

function Footer() {
  return (
    <footer className="footer-glow border-t border-amber-100 bg-[#f4efe5]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left: branding + copyright */}
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Bilge · 𐰴𐰃𐰺𐰏𐰃𐰕
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              © {new Date().getFullYear()} Bilge. All Rights Reserved.
            </p>
          </div>

          {/* Center: nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-slate-500">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="transition hover:text-amber-700"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right: admin login */}
          <Link
            to="/admin-login"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-900 shadow transition hover:-translate-y-0.5 hover:bg-white"
            aria-label="Admin login"
          >
            <span className="text-sm font-semibold">A</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

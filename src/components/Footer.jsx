function Footer() {
  return (
    <footer className="footer-glow mt-16 border-t border-amber-100 bg-[#f4efe5]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-base text-slate-600 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Bilge · 𐰴𐰃𐰺𐰏𐰃𐰕</p>
        <p>Байланыш: hello@bilge.kg | +996 700 00 00 00</p>
      </div>
    </footer>
  );
}

export default Footer;

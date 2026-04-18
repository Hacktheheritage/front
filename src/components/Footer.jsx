function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-base text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Bilge. Бардык укуктар корголгон.</p>
        <p>Байланыш: hello@bilge.kg | +996 700 00 00 00</p>
      </div>
    </footer>
  );
}

export default Footer;

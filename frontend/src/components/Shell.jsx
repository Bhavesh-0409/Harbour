import { Link } from "react-router-dom";

export default function Shell({ children, width = "max-w-3xl" }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-aura" />
      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
          <span className="h-3 w-3 rounded-full bg-neon shadow-glow" />
          Harbor
        </Link>
        <Link to="/staff" className="text-sm font-medium text-navy-mute transition hover:text-navy">
          Staff view
        </Link>
      </header>
      <main className={`relative z-10 mx-auto w-full px-6 pb-24 ${width}`}>{children}</main>
    </div>
  );
}

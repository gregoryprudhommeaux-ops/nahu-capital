import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="kicker mb-6">NAHU Capital</p>
      <h1 className="font-serif text-3xl text-navy">404</h1>
      <p className="mt-4 text-sm text-navy/60">Página no encontrada.</p>
      <Link
        href="/"
        className="mt-10 text-[0.7rem] tracking-[0.22em] text-gold uppercase"
      >
        Inicio
      </Link>
    </div>
  );
}

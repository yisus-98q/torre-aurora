import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-navbar fixed inset-x-0 top-0 z-40 flex items-center justify-between">
      <Link href="/" className="site-brand" aria-label="Torre Aurora, inicio">
        <span>TORRE <strong>AURORA</strong></span>
      </Link>
      <nav className="site-nav" aria-label="Navegación principal">
        <Link href="/#proyecto">El proyecto</Link>
        <Link href="/#unidades">Unidades</Link>
        <Link className="nav-availability" href="/disponibles">Disponibilidad</Link>
      </nav>
      <Link className="nav-mobile-availability" href="/disponibles">Ver unidades</Link>
    </header>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link href="/" className="site-footer-brand">TORRE <span>AURORA</span></Link>
      <p>© {new Date().getFullYear()} Torre Aurora. Todos los derechos reservados.</p>
      <Link href="/disponibles" className="site-footer-link">Explorar unidades</Link>
    </footer>
  );
}

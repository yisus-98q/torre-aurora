"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-navbar fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/70 to-transparent">
      <Link href="/" className="text-white font-semibold tracking-wide">
        <span className="text-2xl font-light">
          TORRE <span className="text-[#d4a373] font-bold">AURORA</span>
        </span>
      </Link>
      <nav className="hidden md:flex gap-6 text-sm text-white/70">
        <Link href="/disponibles" className="hover:text-white transition">Disponibilidad</Link>
        <a href="https://wa.me/5491100000000" className="hover:text-white transition">Contacto</a>
      </nav>
    </header>
  );
}

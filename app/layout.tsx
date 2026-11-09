import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Torre Aurora | Un hogar para vivir a tu manera",
  description: "Departamentos en venta en Torre Aurora: unidades de 2 a 4 dormitorios con balcón. Consulta precios y disponibilidad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased bg-neutral-950">{children}</body>
    </html>
  );
}

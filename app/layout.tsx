import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Torre Aurora | Un hogar para vivir a tu manera",
  description: "Explora Torre Aurora en 3D y descubre departamentos de 2 a 4 dormitorios con balcón.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased bg-neutral-950">{children}</body>
    </html>
  );
}

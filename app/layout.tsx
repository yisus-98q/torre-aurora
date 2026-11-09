import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Torre Aurora - Departamentos en 3D",
  description: "Explora los 12 departamentos de la Torre Aurora en una experiencia 3D interactiva.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased bg-neutral-950">{children}</body>
    </html>
  );
}
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { DEPARTAMENTOS } from "@/lib/departamentos";

const disponibles = DEPARTAMENTOS.filter((unit) => unit.estado === "disponible");
const enVenta = disponibles.length > 0 ? disponibles : DEPARTAMENTOS;
const precioDesde = Math.min(...enVenta.map((unit) => unit.precio));
const moneda = enVenta[0]?.moneda ?? "USD";
const superficies = DEPARTAMENTOS.map((unit) => unit.m2);
const hasBalconEverywhere = DEPARTAMENTOS.every((unit) => unit.balcon);

const highlights = [
  { value: String(disponibles.length).padStart(2, "0"), label: "unidades en venta" },
  { value: `${Math.min(...superficies)}–${Math.max(...superficies)}`, label: "m² por unidad" },
  { value: `${moneda} ${Math.round(precioDesde / 1000)}k`, label: "precio desde" },
];

const pasos = [
  { titulo: "Elige tu unidad", texto: "Compara piso, superficie, orientación y precio de cada departamento." },
  { titulo: "Agenda una visita", texto: "Te mostramos la unidad y resolvemos tus dudas sobre la compra." },
  { titulo: "Reserva tu departamento", texto: "Asegura la unidad elegida y avanzamos con la documentación." },
];

export default function ProjectStory() {
  return (
    <section id="proyecto" className="project-story" aria-labelledby="project-story-title">
      <div className="project-story-inner">
        <div className="project-story-copy">
          <p className="eyebrow">Departamentos en venta</p>
          <h2 id="project-story-title">
            Tu departamento en <em>Torre Aurora.</em>
          </h2>
          <p className="project-story-description">
            {DEPARTAMENTOS.length} departamentos de {Math.min(...DEPARTAMENTOS.map((unit) => unit.dormitorios))} a{" "}
            {Math.max(...DEPARTAMENTOS.map((unit) => unit.dormitorios))} dormitorios, pensados para vivir o invertir.
            Elige el piso y la superficie que necesitas y consulta las condiciones de compra con nuestro equipo.
          </p>
          {hasBalconEverywhere && (
            <p className="project-story-note">
              Todas las unidades con balcón <span aria-hidden="true">—</span> entrega lista para habitar.
            </p>
          )}
          <div className="project-story-actions">
            <Link className="btn-primary" href="/disponibles">
              Ver precios y unidades <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <a
              className="btn-outline"
              href={`https://wa.me/5491100000000?text=${encodeURIComponent("Hola, quiero información para comprar un departamento en Torre Aurora.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} aria-hidden="true" /> Hablar con un asesor
            </a>
          </div>
        </div>

        <dl className="project-highlights" aria-label="Datos de venta">
          {highlights.map((highlight) => (
            <div className="project-highlight" key={highlight.label}>
              <dt>{highlight.label}</dt>
              <dd>{highlight.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ol className="sales-steps" aria-label="Cómo comprar">
        {pasos.map((paso, indice) => (
          <li key={paso.titulo}>
            <span aria-hidden="true">{String(indice + 1).padStart(2, "0")}</span>
            <h3>{paso.titulo}</h3>
            <p>{paso.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

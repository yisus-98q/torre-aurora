import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BedDouble, Maximize2 } from "lucide-react";
import { DEPARTAMENTOS } from "@/lib/departamentos";

const featuredUnits = DEPARTAMENTOS.filter((unit) => unit.destacado && unit.estado === "disponible");

export default function FeaturedUnits() {
  return (
    <section id="unidades" className="featured-units" aria-labelledby="featured-units-title">
      <div className="featured-units-inner">
        <div className="featured-units-heading">
          <div>
            <p className="eyebrow">Disponibles para la venta</p>
            <h2 id="featured-units-title">Unidades <em>destacadas.</em></h2>
          </div>
          <Link className="text-link featured-all-link" href="/disponibles">
            Ver todas las unidades <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="featured-units-grid">
          {featuredUnits.map((unit, index) => {
            const photo = unit.fotos[index % unit.fotos.length];

            return (
              <article className="featured-unit-card" key={unit.id}>
                <Link className="featured-unit-image" href={`/departamento/${unit.id}`} aria-label={`Ver departamento ${unit.numero}`}>
                  {photo && (
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      width={1200}
                      height={800}
                      unoptimized
                      priority={index === 0}
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    />
                  )}
                  <span className="featured-unit-floor">Piso {unit.piso}</span>
                </Link>
                <div className="featured-unit-content">
                  <div className="featured-unit-title-row">
                    <div>
                      <p className="featured-unit-kicker">Departamento {unit.numero}</p>
                      <h3>{unit.ambientes} ambientes</h3>
                    </div>
                    <span className="featured-unit-status">Disponible</span>
                  </div>
                  <div className="featured-unit-specs">
                    <span><Maximize2 size={15} aria-hidden="true" /> {unit.m2} m²</span>
                    <span><BedDouble size={15} aria-hidden="true" /> {unit.dormitorios} dormitorios</span>
                  </div>
                  <div className="featured-unit-footer">
                    <p>
                      <span>{unit.moneda}</span> {unit.precio.toLocaleString("es-AR")}
                    </p>
                    <Link href={`/departamento/${unit.id}`} aria-label={`Ver ficha del departamento ${unit.numero}`}>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="featured-units-cta">
          <p>¿Buscas otro piso o superficie? Mira todas las unidades en venta.</p>
          <Link className="btn-outline" href="/disponibles">Ver todas las unidades en venta</Link>
        </div>
      </div>
    </section>
  );
}

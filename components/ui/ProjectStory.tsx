import { DEPARTAMENTOS } from "@/lib/departamentos";

const floors = Math.max(...DEPARTAMENTOS.map((unit) => unit.piso));
const bedrooms = DEPARTAMENTOS.map((unit) => unit.dormitorios);
const bedroomRange = `${Math.min(...bedrooms)}–${Math.max(...bedrooms)}`;
const hasBalconEverywhere = DEPARTAMENTOS.every((unit) => unit.balcon);

const highlights = [
  { value: String(DEPARTAMENTOS.length).padStart(2, "0"), label: "departamentos" },
  { value: String(floors).padStart(2, "0"), label: "pisos" },
  { value: bedroomRange, label: "dormitorios" },
];

export default function ProjectStory() {
  return (
    <section id="proyecto" className="project-story" aria-labelledby="project-story-title">
      <div className="project-story-inner">
        <div className="project-story-copy">
          <p className="eyebrow">El proyecto</p>
          <h2 id="project-story-title">
            Un lugar para vivir <em>a tu manera.</em>
          </h2>
          <p className="project-story-description">
            Torre Aurora reúne distintas tipologías en {floors} niveles. Explora cada
            departamento en 3D y encuentra el espacio que acompaña tu forma de vivir.
          </p>
          {hasBalconEverywhere && (
            <p className="project-story-note">
              Balcón en todas las unidades <span aria-hidden="true">—</span> detalles que abren la casa al exterior.
            </p>
          )}
        </div>

        <dl className="project-highlights" aria-label="Datos del proyecto">
          {highlights.map((highlight) => (
            <div className="project-highlight" key={highlight.label}>
              <dt>{highlight.label}</dt>
              <dd>{highlight.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="project-story-index" aria-hidden="true">01 / 03</div>
    </section>
  );
}

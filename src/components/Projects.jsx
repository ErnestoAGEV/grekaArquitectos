import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "../data/projects";
import Reveal from "./Reveal";
import "./Projects.css";

const Projects = () => {
  const reduce = useReducedMotion();
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="label">03 — Proyectos</p>
            <h2 className="display">Obra seleccionada</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Casas, tiendas e interiores que hemos diseñado y llevado a obra. Cada proyecto parte de
              escuchar a quien lo va a habitar.
            </p>
          </Reveal>
        </div>

        <div className="projects-grid">
          {projectsData.map((p, i) => (
            <article className="project-card" key={p.id}>
              <Link to={`/project/${p.id}`} className="project-link">
                <motion.div
                  className="project-media"
                  initial={{ clipPath: "inset(18% 0 0 0)", opacity: 0 }}
                  whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  transition={reduce ? { duration: 0 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={p.cover.sm}
                    alt={`${p.title}, ${p.type.toLowerCase()}`}
                    loading="lazy"
                    decoding="async"
                    width={p.cover.w}
                    height={p.cover.h}
                  />
                </motion.div>
                <div className="project-meta">
                  <span className="label">
                    0{i + 1} / {p.category}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <span className="project-cta label">
                    Ver proyecto <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

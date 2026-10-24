import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useContent } from "../data/useContent";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";
import NotFound from "./NotFound";
import "./ProjectDetail.css";

const ease = [0.22, 1, 0.36, 1];

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects } = useContent();
  const project = projects.find((p) => p.id === id);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    document.title = project
      ? `${project.title} | Greka Arquitectos`
      : "Proyecto no encontrado | Greka Arquitectos";
  }, [project]);

  if (!project) return <NotFound />;

  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];
  const facts = [
    ["Tipo", project.type],
    ["Categoría", project.category],
    ["Ubicación", project.location],
    ["Año", project.year],
    ["Superficie", project.area],
  ].filter(([, v]) => v);

  return (
    <main className="project-detail">
      <section className="pd-hero">
        <motion.img
          src={project.cover.src}
          alt={project.title}
          fetchPriority="high"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease }}
        />
        <div className="pd-hero-veil" />
        <div className="container pd-hero-content">
          <Link to="/#projects" className="label pd-back">
            <ArrowLeft size={14} aria-hidden="true" /> Proyectos
          </Link>
          <h1 className="display pd-title">
            <span className="pd-line">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.2, ease }}
              >
                {project.title}
              </motion.span>
            </span>
          </h1>
        </div>
      </section>

      <section className="container pd-intro">
        <Reveal>
          <p className="pd-description">{project.description}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="pd-facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="container pd-gallery" aria-label="Galería">
        {project.gallery.map((img, i) => (
          <motion.button
            key={img.src}
            className="pd-gallery-item"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Ampliar foto ${i + 1} de ${project.gallery.length}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.8 }}
          >
            <img src={img.sm} alt={`${project.title}, foto ${i + 1}`} loading="lazy" decoding="async" width={img.w} height={img.h} />
          </motion.button>
        ))}
      </section>

      <Link to={`/project/${next.id}`} className="pd-next">
        <img src={next.cover.sm} alt="" loading="lazy" width={next.cover.w} height={next.cover.h} />
        <div className="pd-next-veil" />
        <div className="container pd-next-content">
          <span className="label">Siguiente proyecto</span>
          <span className="display pd-next-title">
            {next.title} <ArrowRight size={32} strokeWidth={1.25} aria-hidden="true" />
          </span>
        </div>
      </Link>

      {lightboxIndex !== null && (
        <Lightbox
          images={project.gallery}
          title={project.title}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </main>
  );
};

export default ProjectDetail;

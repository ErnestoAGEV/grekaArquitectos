import { useParams, Link } from "react-router-dom";
import { projectsData } from "../data/projects";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="container" style={{ paddingTop: "100px" }}>
        Proyecto no encontrado
      </div>
    );
  }

  // Logic for next project navigation
  const nextProjectId = project.id < projectsData.length ? project.id + 1 : 1;
  const nextProject = projectsData.find((p) => p.id === nextProjectId);

  return (
    <div className="project-detail">
      <div className="project-hero">
        <img src={project.image} alt={project.title} />
        <div className="project-hero-overlay">
          <div className="container">
            <h1>{project.title}</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="project-content-grid">
          <div className="project-description detail-section">
            <h2>Detalle de Proyecto</h2>
            <p>{project.description}</p>
            <p>
              Este proyecto representa la filosofía de Greka Arquitectos: crear
              espacios que inspiren, conecten con la naturaleza y eleven la
              calidad de vida de quienes los habitan. Cada detalle ha sido
              cuidadosamente planeado para asegurar funcionalidad y estética.
            </p>
          </div>

          <div className="project-details detail-section">
            <div className="technical-card">
              <h3>FICHA TÉCNICA</h3>
              <div className="tech-grid" style={{ marginTop: "20px" }}>
                <div className="tech-item">
                  <h4>Ubicación</h4>
                  <p>{project.location}</p>
                </div>
                <div className="tech-item">
                  <h4>Área</h4>
                  <p>{project.area}</p>
                </div>
                <div className="tech-item">
                  <h4>Año</h4>
                  <p>{project.year}</p>
                </div>
                <div className="tech-item">
                  <h4>Cliente</h4>
                  <p>{project.client}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="project-gallery detail-section">
          <h2>Galería</h2>
          <div className="gallery-grid">
            {project.gallery.map((img, index) => (
              <div key={index} className="gallery-item">
                <img src={img} alt={`${project.title} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="project-nav">
          <Link to="/#projects" className="nav-btn">
            <ArrowLeft size={20} /> Volver a Proyectos
          </Link>

          {nextProject && (
            <Link to={`/project/${nextProject.id}`} className="nav-btn">
              Siguiente Proyecto: {nextProject.title} <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

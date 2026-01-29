import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "../data/projects";
import Reveal from "./Reveal";
import "./Projects.css";

const Projects = () => {
  const [filter, setFilter] = useState("Todos");
  const navigate = useNavigate();

  // Get unique categories
  const categories = [
    "Todos",
    ...new Set(projectsData.map((item) => item.category)),
  ];

  // Filter projects
  const filteredProjects =
    filter === "Todos"
      ? projectsData
      : projectsData.filter((project) => project.category === filter);

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <Reveal>
          <h2 className="section-title">PROYECTOS</h2>
        </Reveal>

        <Reveal>
          <div className="projects-filter">
            {categories.map((cat, index) => (
              <button
                key={index}
                className={`filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <Reveal key={project.id}>
              <div
                className="project-card"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <h3>{project.title}</h3>
                  <span>{project.category}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: "40px" }}>
          <a href="#" className="btn">
            Ver Todos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

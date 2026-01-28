import './Projects.css';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "Residencia Vista Real",
            category: "Residencial",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            title: "Torre Corporativa Zenit",
            category: "Comercial",
            image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            title: "Centro Cultural Maya",
            category: "Institucional",
            image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            title: "Casa del Lago",
            category: "Residencial",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 5,
            title: "Oficinas Loft",
            category: "Interiorismo",
            image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 6,
            title: "Pabellón Sustentable",
            category: "Urbano",
            image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <h2 className="section-title">PROYECTOS</h2>
        <div className="projects-grid">
            {projects.map((project) => (
                <div key={project.id} className="project-card">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                        <h3>{project.title}</h3>
                        <span>{project.category}</span>
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center" style={{marginTop: '40px'}}>
            <a href="#" className="btn">Ver Todos</a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

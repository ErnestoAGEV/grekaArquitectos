import './About.css';

const About = () => {
  return (
    <section className="section about" id="about">
      <div className="container about-container">
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Arquitectos fundadores" 
          />
        </div>
        <div className="about-content">
          <h2 className="section-title text-left">NOSOTROS</h2>
          <p>
            Nuestra filosofía se basa en la creación de arquitectura atemporal que armoniza con el entorno.
            Creamos espacios funcionales y estéticos que inspiran y mejoran la calidad de vida de quienes los habitan.
          </p>
          <p>
            Con más de una década de experiencia, nuestro equipo multidisciplinario aborda cada proyecto con pasión, 
            desde la conceptualización hasta la ejecución final.
          </p>
          <a href="#contact" className="btn btn-outline-dark">Contáctanos</a>
        </div>
      </div>
    </section>
  );
};

export default About;

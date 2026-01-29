import Reveal from "./Reveal";
import "./About.css";

const About = () => {
  return (
    <section className="section about" id="about">
      <div className="container about-container">
        <Reveal>
          <div className="about-image">
            {/* Placeholder if local image is missing, utilizing a nice architecture shot */}
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Architecture Studio"
            />
          </div>
        </Reveal>

        <div className="about-content">
          <Reveal delay={0.2}>
            <h2 className="section-title text-left">Sobre Nosotros</h2>
            <p>
              Somos un estudio de arquitectura comprometido con la excelencia en
              el diseño y la funcionalidad. Creemos que cada proyecto es una
              oportunidad para mejorar la calidad de vida de las personas y su
              relación con el entorno.
            </p>
            <p>
              Con más de 10 años de experiencia, nuestro equipo
              multidisciplinario aborda cada desafío con creatividad, precisión
              técnica y una profunda sensibilidad estética.
            </p>
            <a href="#contact" className="btn btn-outline-dark">
              Contáctanos
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;

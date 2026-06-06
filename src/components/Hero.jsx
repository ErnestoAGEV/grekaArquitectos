import Reveal from "./Reveal";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <Reveal>
          <h1>Diseñamos espacios que trascienden el tiempo</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p>Arquitectura contemporánea con un enfoque sostenible y humano.</p>
        </Reveal>
        <Reveal delay={0.4}>
          <button
            className="btn btn-outline"
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Ver Proyectos
          </button>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;

import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1>Diseño que trasciende fronteras</h1>
        <p>Transformando espacios con visión y precisión desde 2005.</p>
        <div className="hero-buttons">
            <a href="#projects" className="btn">Ver Proyectos</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

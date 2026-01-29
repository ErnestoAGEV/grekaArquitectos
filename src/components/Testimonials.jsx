import Reveal from "./Reveal";
import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alejandro Ramos",
      role: "Residencia Moderna",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote:
        "Su visión arquitectónica superó nuestras expectativas, creando un hogar único y funcional.",
    },
    {
      id: 2,
      name: "Sofia Torres",
      role: "Torre Comercial",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote:
        "Profesionalismo y creatividad en cada detalle del proyecto comercial.",
    },
    {
      id: 3,
      name: "Javier Gómez",
      role: "Centro Cultural",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      quote:
        "Entendieron perfectamente la integración urbana del centro cultural.",
    },
  ];

  return (
    <section className="section testimonials">
      <div className="container">
        <Reveal>
          <h2 className="section-title">TESTIMONIOS</h2>
        </Reveal>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <Reveal key={t.id} delay={0.2}>
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <img src={t.image} alt={t.name} />
                </div>
                <div className="testimonial-content">
                  <p>"{t.quote}"</p>
                  <h4>{t.name}</h4>
                  <small>{t.role}</small>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

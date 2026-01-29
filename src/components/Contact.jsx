import Reveal from "./Reveal";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="section contact" id="contact">
      <div className="container contact-container">
        <div className="contact-info">
          <Reveal>
            <h2 className="section-title text-left">CONTACTO</h2>
            <p>
              Hablemos de tu próximo proyecto. Estamos listos para convertir tu
              visión en realidad.
            </p>

            <div className="info-item">
              <h4>Dirección</h4>
              <p>General Nuñez #393, Colima Colima</p>
            </div>

            <div className="info-item">
              <h4>Email</h4>
              <p>facturas.greka@gmail.com</p>
            </div>

            <div className="info-item">
              <h4>Teléfono</h4>
              <p>+52 312 314 3828</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="text" placeholder="Nombre" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <textarea rows="5" placeholder="Mensaje" required></textarea>
            </div>
            <button type="submit" className="btn">
              Enviar Mensaje
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;

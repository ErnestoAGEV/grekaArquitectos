import { useState } from "react";
import Reveal from "./Reveal";
import "./Contact.css";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xwpkgjvq", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch {
      // Silently fail - user can retry
    } finally {
      setSending(false);
    }
  };

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
              <p>Calle Gral. Silverio Núñez 393, Centro, 28000 Colima, Col.</p>
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
          {submitted ? (
            <div className="contact-form contact-success">
              <h3>Mensaje enviado</h3>
              <p>Gracias por contactarnos. Te responderemos pronto.</p>
              <button
                className="btn"
                onClick={() => setSubmitted(false)}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <textarea
                  rows="5"
                  name="message"
                  placeholder="Mensaje"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn" disabled={sending}>
                {sending ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          )}
        </Reveal>
      </div>

      <div className="contact-map">
        <iframe
          src="https://maps.google.com/maps?q=Calle+Gral.+Silverio+N%C3%BA%C3%B1ez+393,+Centro,+28000+Colima,+Col.,+Mexico&t=&z=17&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de Greka Arquitectos en Colima"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import "./Contact.css";

const Contact = () => {
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xwpkgjvq", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal>
          <p className="label">06 — Contacto</p>
          <h2 className="display contact-title">
            Platiquemos
            <br />
            tu proyecto
          </h2>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-info">
            <p className="contact-lead">
              Cuéntanos qué tienes en mente. Te respondemos personalmente para agendar una primera
              reunión.
            </p>
            <dl>
              <div>
                <dt className="label">Estudio</dt>
                <dd>
                  <a
                    href="https://maps.google.com/?q=Calle+Gral.+Silverio+N%C3%BA%C3%B1ez+393,+Centro,+28000+Colima"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Calle Gral. Silverio Núñez 393, Centro, 28000 Colima, Col.
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">Teléfono</dt>
                <dd>
                  <a href="tel:+523123143828">+52 312 314 3828</a>
                </dd>
              </div>
              <div>
                <dt className="label">Correo</dt>
                <dd>
                  <a href="mailto:facturas.greka@gmail.com">facturas.greka@gmail.com</a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "sent" ? (
              <div className="contact-success" role="status">
                <h3 className="display">Mensaje enviado</h3>
                <p>Gracias por escribirnos. Te contactaremos muy pronto.</p>
                <button className="btn" onClick={() => setStatus("idle")}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="c-name" className="label">Nombre</label>
                  <input id="c-name" type="text" name="name" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="c-email" className="label">Correo</label>
                  <input id="c-email" type="email" name="email" required autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="c-phone" className="label">Teléfono (opcional)</label>
                  <input id="c-phone" type="tel" name="phone" autoComplete="tel" />
                </div>
                <div className="field">
                  <label htmlFor="c-msg" className="label">Cuéntanos de tu proyecto</label>
                  <textarea id="c-msg" rows="4" name="message" required />
                </div>
                {/* Honeypot anti-spam de Formspree */}
                <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="sr-only" aria-hidden="true" />

                {status === "error" && (
                  <p className="contact-error" role="alert">
                    No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.
                  </p>
                )}

                <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
                  {status === "sending" ? "Enviando…" : "Enviar mensaje"}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      <div className="contact-map">
        <iframe
          src="https://maps.google.com/maps?q=Calle+Gral.+Silverio+N%C3%BA%C3%B1ez+393,+Centro,+28000+Colima,+Col.,+Mexico&t=&z=16&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de Greka Arquitectos en Colima"
        />
      </div>
    </section>
  );
};

export default Contact;

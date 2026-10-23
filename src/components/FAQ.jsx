import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import "./FAQ.css";

const faqs = [
  {
    q: "¿Dónde trabajan?",
    a: "Nuestro estudio está en Colima y desarrollamos proyectos en distintos estados de la República; por ejemplo, hemos trabajado en Guanajuato. Cuéntanos dónde está tu proyecto y lo platicamos.",
  },
  {
    q: "¿Sólo diseñan o también construyen?",
    a: "Podemos acompañarte en todo el proceso o en la etapa que necesites: diseño, proyecto ejecutivo, presupuesto o supervisión de obra.",
  },
  {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Depende del tipo de obra, los metros cuadrados y el alcance. Después de una primera reunión te enviamos una propuesta clara y por escrito, sin compromiso.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Una idea de lo que quieres, la ubicación del terreno o local y, si los tienes, planos o fotografías. Con eso agendamos una primera reunión.",
  },
  {
    q: "¿Hacen remodelaciones e interiorismo?",
    a: "Sí. Diseñamos interiores residenciales y comerciales, y remodelamos espacios existentes para que funcionen mejor.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <Reveal>
          <p className="label">05 — Preguntas frecuentes</p>
          <h2 className="display faq-title">Dudas comunes</h2>
        </Reveal>

        <ul className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="faq-item">
                <h3>
                  <button
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? `faq-a-${i}` : undefined}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {f.q}
                    <Plus className="faq-icon" size={22} strokeWidth={1.25} aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className="faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;

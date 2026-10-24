import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { useContent } from "../data/useContent";
import "./FAQ.css";

const FAQ = () => {
  const [open, setOpen] = useState(0);
  const { title, items: faqs } = useContent().site.faq;

  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <Reveal>
          <p className="label">05 — Preguntas frecuentes</p>
          <h2 className="display faq-title">{title}</h2>
        </Reveal>

        <ul className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="faq-item">
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

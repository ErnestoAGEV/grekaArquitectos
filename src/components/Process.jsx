import { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";
import "./Process.css";

const steps = [
  {
    title: "Escuchamos",
    text: "Nos reunimos contigo, conocemos el terreno o el local y entendemos qué necesitas y cuánto quieres invertir.",
  },
  {
    title: "Diseñamos",
    text: "Desarrollamos el anteproyecto: plantas, volumetría y propuesta de materiales. Lo ajustamos contigo hasta que lo sientas tuyo.",
  },
  {
    title: "Desarrollamos",
    text: "Preparamos el proyecto ejecutivo y el presupuesto para que sepas con claridad qué se va a construir y cuánto costará.",
  },
  {
    title: "Construimos",
    text: "Acompañamos la obra y cuidamos que lo construido sea fiel al diseño hasta el día de la entrega.",
  },
];

const Process = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });

  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="label">04 — Proceso</p>
            <h2 className="display">Cómo trabajamos</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>Un proceso claro, en cuatro etapas, para que sepas siempre en qué punto está tu proyecto.</p>
          </Reveal>
        </div>

        <div className="process-track" ref={ref}>
          <motion.span
            className="process-line"
            aria-hidden="true"
            style={{ scaleX: reduce ? 1 : scrollYProgress }}
          />
          <ol className="process-steps">
            {steps.map((s, i) => (
              <Reveal as="li" className="process-step" key={s.title} delay={i * 0.1}>
                <span className="process-dot" aria-hidden="true" />
                <span className="label">Etapa 0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Process;

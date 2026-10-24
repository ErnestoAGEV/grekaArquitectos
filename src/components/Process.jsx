import { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";
import { useContent } from "../data/useContent";
import "./Process.css";

const Process = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { title, intro, steps } = useContent().site.process;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });

  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="label">04 — Proceso</p>
            <h2 className="display">{title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>{intro}</p>
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
              <Reveal as="li" className="process-step" key={i} delay={i * 0.1}>
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

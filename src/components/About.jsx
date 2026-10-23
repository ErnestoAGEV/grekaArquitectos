import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";
import { projectsData } from "../data/projects";
import "./About.css";

const statement =
  "Somos un estudio de arquitectura en Colima. Desde hace más de diez años convertimos ideas en espacios claros, funcionales y bien construidos.";

const principles = [
  {
    title: "Diseño con propósito",
    text: "Cada metro cuadrado tiene una razón. Diseñamos a partir de cómo vives o cómo opera tu negocio.",
  },
  {
    title: "Del plano a la obra",
    text: "Te acompañamos desde el primer boceto hasta la entrega, cuidando que lo dibujado sea lo construido.",
  },
  {
    title: "Trato directo",
    text: "Hablas con quienes diseñan tu proyecto. Sin intermediarios y con información clara en cada etapa.",
  },
];

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
};

const About = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");
  const photo = projectsData[1].gallery[1] ?? projectsData[1].cover;

  return (
    <section className="section about" id="about">
      <div className="container">
        <p className="label about-label">01 — Nosotros</p>

        <h2 className="about-statement" ref={ref} aria-label={statement}>
          {reduce
            ? statement
            : words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </Word>
              ))}
        </h2>

        <div className="about-grid">
          <Reveal className="about-photo">
            <img src={photo.sm} alt="Interior de un proyecto de Greka Arquitectos" loading="lazy" width={photo.w} height={photo.h} />
          </Reveal>

          <div className="about-copy">
            <Reveal>
              <p className="about-lead">
                Trabajamos de principio a fin. Escuchamos lo que necesitas, lo traducimos en proyecto y
                presupuesto, y lo llevamos a obra sin perder de vista el detalle.
              </p>
            </Reveal>

            <ul className="about-principles">
              {principles.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 0.08}>
                  <span className="label">0{i + 1}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";
import { useContent } from "../data/useContent";
import "./About.css";

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
};

const About = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const { projects, site } = useContent();
  const { statement, lead, principles } = site.about;
  const words = statement.split(" ");
  const featured = projects[1] ?? projects[0];
  const photo = site.about.image ?? featured.gallery[1] ?? featured.cover;

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
              <p className="about-lead">{lead}</p>
            </Reveal>

            <ul className="about-principles">
              {principles.map((p, i) => (
                <Reveal as="li" key={i} delay={i * 0.08}>
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

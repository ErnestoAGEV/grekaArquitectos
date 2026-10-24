import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useContent } from "../data/useContent";
import "./Hero.css";

const ease = [0.22, 1, 0.36, 1];

const Hero = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, reduce ? 1.08 : 1.18]);
  const { projects, site } = useContent();
  const { eyebrow, lead } = site.hero;
  const headline = site.hero.headline.split("\n").filter(Boolean);
  const cover = site.hero.image ?? projects[0].cover;

  return (
    <section className="hero" id="home" ref={ref}>
      <motion.div className="hero-media" style={{ y, scale }}>
        <img src={cover.src} alt="" fetchPriority="high" width={cover.w} height={cover.h} />
      </motion.div>
      <div className="hero-veil" />

      <div className="container hero-content">
        <motion.p
          className="label hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {eyebrow}
        </motion.p>

        <h1 className="display hero-title" aria-label={headline.join(" ")}>
          {headline.map((line, i) => (
            <span className="hero-line" key={i} aria-hidden="true">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="hero-bottom"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease }}
        >
          <p className="hero-lead">{lead}</p>
          <div className="hero-actions">
            <Link to="/#projects" className="btn hero-btn-solid">
              Ver proyectos
            </Link>
            <Link to="/#contact" className="btn">
              Platiquemos
            </Link>
          </div>
        </motion.div>
      </div>

      <Link to="/#about" className="hero-scroll label" aria-label="Ir a Nosotros">
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
        Desliza
      </Link>
    </section>
  );
};

export default Hero;

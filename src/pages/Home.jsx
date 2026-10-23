import { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Process from "../components/Process";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

const Home = () => {
  useEffect(() => {
    document.title = "Greka Arquitectos | Arquitectura e interiorismo en Colima";
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Process />
      <FAQ />
      <Contact />
    </main>
  );
};

export default Home;

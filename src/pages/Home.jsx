import { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import Clients from "../components/Clients";
import Contact from "../components/Contact";

const Home = () => {
  useEffect(() => {
    document.title = "Greka Arquitectos | Diseño Sostenible y Funcional";
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <Clients />
      <Contact />
    </main>
  );
};

export default Home;

import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig, motion } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import ThemeToggle from "./components/ThemeToggle";
import { useContent } from "./data/useContent";

function AnimatedRoutes() {
  const location = useLocation();

  // Sólo animación de entrada: sin exit no hay salto de scroll entre páginas
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </motion.div>
  );
}

function App() {
  // Espera el contenido de Sanity (máx. 5 s) para no mostrar textos viejos y luego cambiarlos.
  if (!useContent().ready) return null;

  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <WhatsAppButton />
        <ThemeToggle />
      </Router>
    </MotionConfig>
  );
}

export default App;

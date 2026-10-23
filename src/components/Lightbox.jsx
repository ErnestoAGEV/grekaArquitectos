import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./Lightbox.css";

const Lightbox = ({ images, title, currentIndex, onClose, onNavigate }) => {
  const closeRef = useRef(null);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1);
      // Trampa de foco mínima: Tab no sale del diálogo
      if (e.key === "Tab") {
        const focusables = [...document.querySelectorAll(".lightbox button")];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, hasPrev, hasNext, onClose, onNavigate]);

  // Precarga vecinas para navegar sin espera
  useEffect(() => {
    [currentIndex - 1, currentIndex + 1].forEach((i) => {
      if (images[i]) new Image().src = images[i].src;
    });
  }, [currentIndex, images]);

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${title}`}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button ref={closeRef} className="lightbox-btn lightbox-close" onClick={onClose} aria-label="Cerrar galería">
        <X size={24} />
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={images[currentIndex].src}
          src={images[currentIndex].src}
          alt={`${title}, foto ${currentIndex + 1} de ${images.length}`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      <div className="lightbox-bar" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-btn"
          onClick={() => hasPrev && onNavigate(currentIndex - 1)}
          aria-disabled={!hasPrev}
          aria-label="Foto anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="label" aria-live="polite">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          className="lightbox-btn"
          onClick={() => hasNext && onNavigate(currentIndex + 1)}
          aria-disabled={!hasNext}
          aria-label="Foto siguiente"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </motion.div>
  );
};

export default Lightbox;

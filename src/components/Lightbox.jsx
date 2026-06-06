import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./Lightbox.css";

const Lightbox = ({ images, currentIndex, onClose, onNavigate }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0)
        onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1)
        onNavigate(currentIndex + 1);
    },
    [currentIndex, images.length, onClose, onNavigate],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Cerrar galería"
        >
          <X size={28} />
        </button>

        {currentIndex > 0 && (
          <button
            className="lightbox-nav lightbox-prev"
            onClick={() => onNavigate(currentIndex - 1)}
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={36} />
          </button>
        )}

        <img
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1} de ${images.length}`}
        />

        {currentIndex < images.length - 1 && (
          <button
            className="lightbox-nav lightbox-next"
            onClick={() => onNavigate(currentIndex + 1)}
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={36} />
          </button>
        )}

        <div className="lightbox-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;

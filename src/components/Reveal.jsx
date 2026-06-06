import { useEffect, useRef, useState } from "react";

export const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.8s cubic-bezier(0.5, 0, 0, 1) ${delay}s, transform 0.8s cubic-bezier(0.5, 0, 0, 1) ${delay}s`,
    willChange: "opacity, transform",
  };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
};

export default Reveal;

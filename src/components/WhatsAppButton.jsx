import { MessageCircle } from "lucide-react";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const phone = "5213123143828";
  const message = encodeURIComponent(
    "Hola, me gustaría obtener más información sobre sus servicios de arquitectura.",
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;

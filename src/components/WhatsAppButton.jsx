import { MessageCircle } from "lucide-react";
import { useContent } from "../data/useContent";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const { whatsapp, whatsappMessage } = useContent().site.contact;
  const phone = whatsapp.replace(/\D/g, "");
  const message = encodeURIComponent(whatsappMessage);

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

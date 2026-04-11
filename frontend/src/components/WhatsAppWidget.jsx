import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppWidget = () => {
  const whatsappUrl = "https://chat.whatsapp.com/FxS51evjAC4BQLvTS8IenF";

  return (
    <div className="whatsapp-widget-container">
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-main-link"
      >
        <div className="whatsapp-notification-bubble">
          <p>Be an E2E Volunteer or Donor</p>
          <div className="bubble-arrow"></div>
        </div>
        
        <div className="whatsapp-icon-wrapper">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp" 
            className="whatsapp-logo"
          />
          <span className="whatsapp-ping"></span>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppWidget;

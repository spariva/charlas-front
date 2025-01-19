import React from "react";
import "./../assets/css/Popup.css";

const PopupCharla = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="btn-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
      <div class="container_mouse">
        <span class="mouse-btn">
          <span class="mouse-scroll"></span>
        </span>
        <span className="scroll_text poiret-one-regular">Scroll</span>
      </div>    
    </div>
  );
};

export default PopupCharla;

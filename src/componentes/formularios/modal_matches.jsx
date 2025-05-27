import React from 'react';
import './modal_matches.css'; // Los estilos los crearemos después

const ModalMatches = ({ onClose }) => {
  return (
    <div className="modal-matches-overlay">
      <div className="modal-matches-content">
        <h2>🔥 Tus Matches</h2>
        <div className="matches-list">
          {/* Ejemplo de matches - puedes reemplazar con datos reales */}
          <div className="match-item">
            <img src="https://i.pinimg.com/736x/67/19/6b/67196b51f941f7d1268fb1679256b447.jpg" alt="Match 1" />
            <span>Alma Marcela</span>
          </div>
          <div className="match-item">
            <img src="https://img.wattpad.com/72bf40dc50a85cce5a2a4dc7568c8c2c6395db0e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5865594d37716e457266773369773d3d2d3134312e313762636438306230353063616533613336333231393733373334362e6a7067?s=fit&w=720&h=720" alt="Match 2" />
            <span>Emma Mayyers</span>
          </div>
        </div>
        <button onClick={onClose} className="close-matches-btn">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalMatches;
import React from 'react';
import './modal_confi.css';

const ModalConfi = ({ onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Si tu logras conquistar a tu pareja o tener una relacion sexual.</h3>
        <p>Gatito Plis te pagara el hospedaje, alimentacion por una noche en cualquier hotel de tu ciudad y pais.</p>
        <div className="modal-buttons">
          <button className="modal-btn confirmar" onClick={onConfirm}>
            ¡Vamos!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfi;
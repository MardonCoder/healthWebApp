import React from 'react';
import './Modal.css';

function Modal({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Всплывающее окно</h2>
        <p>Содержимое окна.</p>
        <button onClick={closeModal}>Закрыть</button>
      </div>
    </div>
  );
}

export default Modal;
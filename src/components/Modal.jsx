import { useState } from 'react';

function Modal({ title, children }) {
  const [isVisible, setIsVisible] = useState(true);

  // Fonction pour fermer la modale
  const closeModal = () => {
    setIsVisible(false);
  };

  // Ne pas afficher la modale si elle n'est pas visible
  if (!isVisible) return null;
  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-modal-button" onClick={closeModal}>
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;

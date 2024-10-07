function Modal({ title, children }) {
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-modal-button">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;

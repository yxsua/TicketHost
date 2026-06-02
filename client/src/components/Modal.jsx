function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <div className="modal-header">
          <h2>{title}</h2>

          <button onClick={onClose}>X</button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;

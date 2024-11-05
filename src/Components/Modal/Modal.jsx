import './Modal.css';

function Modal({ visible, close, modalHead, onConfirm, children, message }) {
  if (!visible) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{modalHead}</h2>
        {message && <p>{message}</p>}
        {children}
        <div className="modal-buttons">
          {onConfirm && <button onClick={onConfirm}>Confirm</button>}
          {message && <button onClick={close}>Cancel</button>}
        </div>
      </div>
    </div>
  );
}

export default Modal;

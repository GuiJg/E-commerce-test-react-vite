
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>Fechar</span>
                {children}
            </div>
        </div>
    );
};
export default Modal;
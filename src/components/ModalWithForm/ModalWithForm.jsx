import "./ModalWithForm.css";
import { closeBtn } from "assets";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  closeModalClick,
  onSubmit, 
}) {
  return (
    <div className={`modal ${isOpen ? "modal__open" : ""}`}>
      <form className="modal__form" onSubmit={onSubmit}> 
        <div className="modal__content">
          <h2 className="modal__title modal__text-2">{title}</h2>
          <button
            onClick={closeModalClick}
            type="button"
            className="modal__closeBtn"
          >
            <img src={closeBtn} alt="Close button for closing the form" />
          </button>
        </div>
        {children}
        <button type="submit" className="modal__submitBtn modal__text-2">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;

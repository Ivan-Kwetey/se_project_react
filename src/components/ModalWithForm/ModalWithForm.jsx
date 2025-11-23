import "./ModalWithForm.css";
import { closeBtn } from "assets";

function ModalWithForm({
  children,
  title,
  isOpen,
  closeModalClick,
  onSubmit,
  isValid,
  submitText, 
}) {
  return (
    <div className={`modal ${isOpen ? "modal__open" : ""}`}>
      <form className="modal__form" onSubmit={onSubmit} noValidate>
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

        {/* Always render submit button */}
        <button
          type="submit"
          className="modal__submitBtn modal__text-2"
          disabled={!isValid}
        >
          {submitText || "Save changes"}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;

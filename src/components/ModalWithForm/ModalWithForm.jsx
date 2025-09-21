import "./ModalWithForm.css";
import { closeBtn } from "assets";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  closeModalClick,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal__open"}`}>
      <form className="modal__form ">
        <div className="modal__content">
          <h2 className="modal__title ui-text-2">{title}</h2>
          <button
            onClick={closeModalClick}
            type="button"
            className="modal__closeBtn"
          >
            <img src={closeBtn} alt="" />
          </button>
        </div>
        {children}
        <button type="submit" className="modal__submitBtn ui-text-2">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;

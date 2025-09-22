import "./ItemModal.css";
import { closeBtn } from "assets";

function ItemModal({ activeModal, closeModalClick, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal__open"}`}>
      <div className=" modal__content_type_image">
        <button
          onClick={closeModalClick}
          type="button"
          className="modal__closeBtn2"
        >
          <img src={closeBtn} alt="Item modal close button" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <h2 className="modal__name modal__text-1">{card.name}</h2>
        <p className="modal__weather modal__text-1">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;

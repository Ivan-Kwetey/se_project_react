import "./ItemModal.css";
import { closeBtn } from "assets";

function ItemModal({ activeModal, closeModalClick, card, onCardDelete }) {
  const isOpen = activeModal === "preview";

  const handleDelete = () => {
    onCardDelete(card); // ✅ Trigger deletion
  };

  console.log("Rendering ItemModal, card:", card);
  console.log("onCardDelete exists?", typeof onCardDelete === "function");

  return (
    <div className={`modal ${isOpen ? "modal__open" : ""}`}>
      <div className="modal__content_type_image">
        <button
          onClick={closeModalClick}
          type="button"
          className="modal__closeBtn2"
        >
          <img src={closeBtn} alt="Item modal close button" />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="content">
          <div className="details">
            <h2 className="modal__name modal__text-1">{card.name}</h2>
            <p className="modal__weather modal__text-1">
              Weather: {card.weather}
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="modal__delete-button modal__text-1"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;

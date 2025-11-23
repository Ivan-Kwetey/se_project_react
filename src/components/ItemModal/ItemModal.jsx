import "./ItemModal.css";
import { closeBtn } from "assets";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, closeModalClick, card, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOpen = activeModal === "preview";

  const handleDelete = () => {
    onCardDelete(card);
  };

  // Show delete button only if the current user owns the item
  const isOwn = currentUser && card.owner === currentUser._id;

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

          {isOwn && (
            <button
              onClick={handleDelete}
              className="modal__delete-button modal__text-1"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

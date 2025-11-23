import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./ClothesSection.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, onAddItemClick, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Filter items for logged-in user
  const userItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="modal__text-1">Your Items</h2>
        <button
          className="clothes-section__header-button subtext"
          onClick={onAddItemClick}
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__list">
        {userItems.map((item) => (
          <li key={item._id}>
            <ItemCard item={item} onCardClick={onCardClick} onCardLike={onCardLike} />
          </li>
        ))}

        {userItems.length === 0 && (
          <p className="modal__text-1 clothes-section__empty">
            You haven’t added any items yet.
          </p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;

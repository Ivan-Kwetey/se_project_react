import React from "react";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onAddItemClick, onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="modal__text-1">Your Items</h2>
        <button className="clothes-section__header-button" onClick={onAddItemClick}>+ Add new</button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => (
          <li key={item._id}>
            <ItemCard item={item} onCardClick={onCardClick} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;

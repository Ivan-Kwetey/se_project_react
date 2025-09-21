import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  }
  return (
    <div className="item-container">
      <div className="item-card">
        <h2 className="item-card__name ui-text-2">{item.name}</h2>
        <img onClick={handleCardClick} className="item-card__image" src={item.link} alt={item.name} />
      </div>
    </div>
  );
}

export default ItemCard;

import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import likeIcon from "assets/LikeButton.svg";
import likedIcon from "assets/LikeButton2.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => onCardClick(item);

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike(item);
  };

  const isLiked = currentUser ? item.likes.includes(currentUser._id) : false;

  return (
    <div className="item-container">
      <div className="item-card">
        <h2 className="item-card__name modal__text-2">
          <span className="item-card__name-text-like">
            <div className="item-card__name-text">{item.name}</div>
             {currentUser && (
          <img
            onClick={handleLike}
            className="item-card__like-button"
            src={isLiked ? likedIcon : likeIcon}
            alt={isLiked ? "Liked" : "Like"}
          />
        )}
            
          </span>
        </h2>

        <img
          onClick={handleCardClick}
          className="item-card__image"
          src={item.imageUrl}
          alt={item.name}
        />

  
      </div>
    </div>
  );
}

export default ItemCard;

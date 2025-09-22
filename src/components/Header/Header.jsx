import "./Header.css";
import { logo, avatar } from "assets";

function Header({ onGarmentClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left-container">
        <img
          className="header_logo"
          src={logo}
          alt="Logo showing the main branding of the website"
        />
        <p className="date-location modal__text-1">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__user-container">
        <div className="header__button-and-name">
          <button
            onClick={onGarmentClick}
            type="button"
            className="header__add-clothes-button modal__text-1"
          >
            + Add clothes
          </button>
          <p className="header__username modal__text-1">Terrance Tegegne</p>
        </div>
        <img src={avatar} alt="profile photo" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;

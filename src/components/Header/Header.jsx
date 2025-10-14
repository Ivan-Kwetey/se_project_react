import "./Header.css";
import { logo, avatar } from "assets";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ onGarmentClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left-container">
        {/* 🧭 Logo links to homepage */}
        <Link to="/">
          <img
            className="header_logo"
            src={logo}
            alt="Logo showing the main branding of the website"
          />
        </Link>
        <p className="date-location modal__text-1">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__user-container">
        <ToggleSwitch />
        <div className="header__button-and-name">
          <button
            onClick={onGarmentClick}
            type="button"
            className="header__add-clothes-button modal__text-1"
          >
            + Add clothes
          </button>

          {/* 🧭 Username links to profile */}
          <Link to="/profile" className="header__username modal__text-1">
            Terrance Tegegne
          </Link>
        </div>

        {/* 🧭 Avatar links to profile */}
        <Link to="/profile">
          <img src={avatar} alt="profile" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;

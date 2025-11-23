import "./Header.css";
import { logo } from "assets";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ onGarmentClick, weatherData, onLoginClick, onRegisterClick, onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const loggedIn = !!currentUser;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Fallback for avatar: show first letter if no avatar
  const userAvatar = currentUser?.avatar;
  const userInitial = currentUser?.name?.charAt(0).toUpperCase();

  return (
    <header className="header">
      <div className="header__left-container">
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
          {loggedIn ? (
            <>
              <button
                onClick={onGarmentClick}
                type="button"
                className="header__add-clothes-button modal__text-1"
              >
                + Add clothes
              </button>

              <Link to="/profile" className="header__username modal__text-1">
                {currentUser.name}
              </Link>

              <Link to="/profile" className="header__avatar-link">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="profile"
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {userInitial}
                  </div>
                )}
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={onRegisterClick}
                type="button"
                className="header__auth-button modal__text-1"
              >
                Sign up
              </button>

              <button
                onClick={onLoginClick}
                type="button"
                className="header__auth-button modal__text-1"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

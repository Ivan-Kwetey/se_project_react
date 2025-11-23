import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { logo } from "assets"; // keep logo import if used elsewhere
import "./SideBar.css";

function SideBar({ onSignOut, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="user-info">
        <div className="avatar header__avatar2">
          <img
            src={currentUser?.avatar || "/default-avatar.png"}
            alt="profile photo"
            className="header__avatar-image"
          />
        </div>
        <div>
          <p className="sidebar__username modal__text-1">
            {currentUser?.name || "Guest"}
          </p>
        </div>
      </div>

      {currentUser && (
        <>
          <div className="sidebar__settings">
            <button
            className="sidebar__edit-button modal__text-1"
            onClick={onEditProfile}
          >
            Change profile data
          </button>

          <button
            className="sidebar__signout-button modal__text-1"
            onClick={onSignOut}
          >
            Sign Out
          </button>
       
        </div>
         </>
      )}
    </div>
  );
}

export default SideBar;

import React from "react";
import "./SideBar.css";
import { logo, avatar } from "assets";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="user-info">
        <div className="avartar">
          <img src={avatar} alt="profile photo" className="header__avatar" />
        </div>
        <div>
          <p className="header__username modal__text-1">Terrance Tegegne</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

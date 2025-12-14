import React, { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);

  return (
    <div className="toggle-switch" onClick={handleToggleSwitchChange}>
      <div className={`toggle-thumb ${currentTemperatureUnit === "F" ? "left" : "right"}`}></div>
      <div className="toggle-labels">
        <span className={`unit ${currentTemperatureUnit === "F" ? "active" : "inactive"}`}>F</span>
        <span className={`unit ${currentTemperatureUnit === "C" ? "active" : "inactive"}`}>C</span>
      </div>
    </div>
  );
}

export default ToggleSwitch;

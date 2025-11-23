import "./MainContent.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({ weatherData, clothingItems, handleCardClick, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="weather__text modal__text-1">
          Today is {Math.round(weatherData.temp[currentTemperatureUnit])}°{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather.toLowerCase() === weatherData.type)
            .map((item) => (
              <li key={item.id} className="cards__list-item">
                <ItemCard
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={onCardLike} // <-- pass handler
                />
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

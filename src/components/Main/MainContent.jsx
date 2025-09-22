import "./MainContent.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

function Main({ weatherData, clothingItems, handleCardClick }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="weather__text modal__text-1">
          Today is {Math.round(weatherData.temp.F)}° F / You may want to wear:
        </p>
        <ul className="class__list">
          {clothingItems
            .filter((item) => item.weather.toLowerCase() === weatherData.type)
            .map((item) => (
              <li key={item._id} className="class__list-item">
                <ItemCard item={item} onCardClick={handleCardClick} />
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

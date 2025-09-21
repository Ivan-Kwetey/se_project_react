import "./WeatherCard.css";
import { sunny } from "assets";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__text">
        {Math.round(weatherData.temp.F)} &deg; F
      </p>
      <img src={sunny} alt="Weather icon" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;

import { checkResponse } from "./api.js";

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(checkResponse); // use shared error handling
};

export const filterWeatherData = (data) => {
  const tempF = data.main.temp;
  const tempC = ((tempF - 32) * 5) / 9;

  const type = getWeatherType(tempF);

  return {
    city: data.name,
    type,
    temp: {
      F: Math.round(tempF),
      C: Math.round(tempC),
    },
    condition: data.weather[0].main.toLowerCase(),
    isDay: isDay(data.sys.sunrise, data.sys.sunset, Date.now()),
  };
};

// check if current time is daytime
const isDay = (sunrise, sunset, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

// helper: temperature → weather type
const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  }
  return "cold";
};

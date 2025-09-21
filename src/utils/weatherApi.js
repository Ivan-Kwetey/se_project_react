export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`error:${res.status}`);
  });
};

export const filterWeatherData = (data) => {
  const tempF = data.main.temp;

  // map temperature to weather type
  const type = getWeatherType(tempF);

  return {
    city: data.name,
    type, // already lowercase
    temp: {
      F: tempF,
      C: ((tempF - 32) * 5) / 9,
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

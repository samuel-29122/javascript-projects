const citySelect = document.getElementById("city-select");
const weatherButton = document.getElementById("get-weather-btn");

const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const locationName = document.getElementById("location");

// Request weather information for a city
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );

    if (!response.ok) {
      throw new Error("Unable to get weather data");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// Put the weather information onto the page
async function showWeather(city) {
  const data = await getWeather(city);

  if (!data || !data.main || !data.weather || !data.wind) {
    alert("Something went wrong, please try again later");
    return;
  }

  const currentWeather = data.weather[0] || {};

  if (currentWeather.icon !== undefined) {
    weatherIcon.src = currentWeather.icon;
    weatherIcon.hidden = false;
  } else {
    weatherIcon.removeAttribute("src");
    weatherIcon.alt = "N/A";
    weatherIcon.hidden = true;
  }

  temperature.textContent =
    data.main.temp !== undefined
      ? `${data.main.temp} °C`
      : "N/A";

  feelsLike.textContent =
    data.main.feels_like !== undefined
      ? `${data.main.feels_like} °C`
      : "N/A";

  humidity.textContent =
    data.main.humidity !== undefined
      ? `${data.main.humidity}%`
      : "N/A";

  wind.textContent =
    data.wind.speed !== undefined
      ? `${data.wind.speed} m/s`
      : "N/A";

  windGust.textContent =
    data.wind.gust !== undefined
      ? `${data.wind.gust} m/s`
      : "N/A";

  weatherMain.textContent = currentWeather.main ?? "N/A";
  locationName.textContent = data.name ?? "N/A";
}

// Only fetch weather after the button is clicked
weatherButton.addEventListener("click", function () {
  const city = citySelect.value;

  if (city === "") {
    return;
  }

  showWeather(city);
});

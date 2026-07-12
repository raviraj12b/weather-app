// ui.js — Responsible only for rendering data into the DOM.
// Does not fetch data. Does not know anything about the OpenWeatherMap API directly.

const currentWeatherSection = document.getElementById('current-weather');

function formatTime(unixSeconds) {
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderCurrentWeather(data) {
  const cityName = data.name;
  const country = data.sys.country;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const humidity = data.main.humidity;
  const windSpeedKmh = Math.round(data.wind.speed * 3.6);
  const pressure = data.main.pressure;
  const visibilityKm = (data.visibility / 1000).toFixed(1);
  const sunrise = formatTime(data.sys.sunrise);
  const sunset = formatTime(data.sys.sunset);
  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  currentWeatherSection.innerHTML = `
    <div class="weather-main">
      <div class="weather-main-info">
        <h2 class="weather-city">${cityName}, ${country}</h2>
        <p class="weather-date">${currentDate}</p>
        <p class="weather-description">${description}</p>
      </div>
      <div class="weather-icon-temp">
        <img
          src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
          alt="${description}"
          class="weather-icon"
        />
        <p class="weather-temp">${temp}°C</p>
      </div>
    </div>

    <div class="weather-details">
      <p><span class="detail-label">Feels Like</span>${feelsLike}°C</p>
      <p><span class="detail-label">Humidity</span>${humidity}%</p>
      <p><span class="detail-label">Wind</span>${windSpeedKmh} km/h</p>
      <p><span class="detail-label">Pressure</span>${pressure} hPa</p>
      <p><span class="detail-label">Visibility</span>${visibilityKm} km</p>
      <p><span class="detail-label">Sunrise</span>${sunrise}</p>
      <p><span class="detail-label">Sunset</span>${sunset}</p>
    </div>
  `;
}
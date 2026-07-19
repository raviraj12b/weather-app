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
const forecastContainer = document.getElementById('forecast-container');

function formatDayLabel(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return date.toLocaleDateString(undefined, { weekday: 'long' });
}

function renderForecast(forecastList) {
  forecastContainer.innerHTML = forecastList
    .map((day) => {
      return `
        <div class="forecast-day-card">
          <p class="forecast-day-label">${formatDayLabel(day.date)}</p>
          <img
            src="https://openweathermap.org/img/wn/${day.icon}.png"
            alt="${day.description}"
            class="forecast-icon"
          />
          <p class="forecast-temp-range">${day.maxTemp}° / ${day.minTemp}°</p>
          <p class="forecast-description">${day.description}</p>
        </div>
      `;
    })
    .join('');
}

const recentSearchesSection = document.getElementById('recent-searches-section');
const recentSearchesList = document.getElementById('recent-searches-list');

function renderRecentSearches(cities) {
  if (cities.length === 0) {
    recentSearchesSection.hidden = true;
    recentSearchesList.innerHTML = '';
    return;
  }

  recentSearchesSection.hidden = false;

  recentSearchesList.innerHTML = cities
    .map((city) => `<li><button type="button" class="recent-search-btn">${city}</button></li>`)
    .join('');
}
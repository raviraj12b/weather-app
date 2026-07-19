// ui.js — Responsible only for rendering data into the DOM.
// Does not fetch data. Does not know anything about the OpenWeatherMap API directly.

// ----- Unit conversion constants -----
const MS_PER_SECOND = 1000;   // Unix timestamps (seconds) -> JS Date (milliseconds)
const MPS_TO_KMH = 3.6;       // OpenWeatherMap wind speed (m/s) -> km/h
const METERS_PER_KM = 1000;   // OpenWeatherMap visibility (m) -> km

const currentWeatherSection = document.getElementById('current-weather');

function formatTime(unixSeconds, timezoneOffsetSeconds) {
  // Shift the UTC instant by the city's own UTC offset, then format it
  // while telling the formatter to treat the result as UTC — this displays
  // the city's own local clock time, regardless of the viewer's timezone.
  const shiftedDate = new Date((unixSeconds + timezoneOffsetSeconds) * MS_PER_SECOND);
  return shiftedDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

function renderCurrentWeather(data) {
  const cityName = data.name;
  const country = data.sys.country;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const humidity = data.main.humidity;
  const windSpeedKmh = Math.round(data.wind.speed * MPS_TO_KMH);
  const pressure = data.main.pressure;
  const visibilityKm = (data.visibility / METERS_PER_KM).toFixed(1);
  const sunrise = formatTime(data.sys.sunrise, data.timezone);
  const sunset = formatTime(data.sys.sunset, data.timezone);
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
          alt=""
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
            alt=""
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
    .map(
      (city) =>
        `<li><button type="button" class="recent-search-btn" aria-label="Search ${city} again">${city}</button></li>`
    )
    .join('');
}
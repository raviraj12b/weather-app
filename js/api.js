// api.js — Responsible only for communicating with the OpenWeatherMap API
// and shaping raw responses into clean, usable data.
// Does not touch the DOM. Does not decide what error text is shown to the user.

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function fetchWeatherData(endpoint, city) {
  const url = `${BASE_URL}/${endpoint}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found.');
    }
    throw new Error('Unable to fetch weather. Please try again later.');
  }

  return response.json();
}

async function fetchCurrentWeather(city) {
  return fetchWeatherData('weather', city);
}

async function fetchForecast(city) {
  return fetchWeatherData('forecast', city);
}

// ----- Forecast processing pipeline -----

function groupForecastByDate(list) {
  return list.reduce((groups, entry) => {
    const date = entry.dt_txt.split(' ')[0]; // "2026-07-16 12:00:00" -> "2026-07-16"

    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);

    return groups;
  }, {});
}

function findMiddayEntry(entries) {
  return entries.reduce((closest, entry) => {
    const entryHour = Number(entry.dt_txt.split(' ')[1].split(':')[0]);
    const closestHour = Number(closest.dt_txt.split(' ')[1].split(':')[0]);
    return Math.abs(entryHour - 12) < Math.abs(closestHour - 12) ? entry : closest;
  });
}

function summarizeDay(date, entries) {
  const temps = entries.map((entry) => entry.main.temp);
  const midday = findMiddayEntry(entries);

  return {
    date,
    minTemp: Math.round(Math.min(...temps)),
    maxTemp: Math.round(Math.max(...temps)),
    description: midday.weather[0].description,
    icon: midday.weather[0].icon,
  };
}

function getFiveDayForecast(forecastData) {
  const grouped = groupForecastByDate(forecastData.list);
  const todayStr = new Date().toISOString().split('T')[0];

  const upcomingDates = Object.keys(grouped).filter((date) => date !== todayStr);

  return upcomingDates.slice(0, 5).map((date) => summarizeDay(date, grouped[date]));
}
// app.js — Orchestrator: listens for user events, coordinates api.js and ui.js.

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const errorMessage = document.getElementById('error-message');
const loadingIndicator = document.getElementById('loading-indicator');

const RECENT_SEARCHES_KEY = 'recentSearches';
const MAX_RECENT_SEARCHES = 5;

let isFetching = false;

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function hideError() {
  errorMessage.hidden = true;
  errorMessage.textContent = '';
}

function setFetchingState(fetching) {
  isFetching = fetching;
  cityInput.disabled = fetching;
  searchButton.disabled = fetching;
  loadingIndicator.hidden = !fetching;
}

function getRecentSearches() {
  const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveRecentSearch(city) {
  const existing = getRecentSearches();
  const filtered = existing.filter((item) => item.toLowerCase() !== city.toLowerCase());
  const updated = [city, ...filtered].slice(0, MAX_RECENT_SEARCHES);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
}

async function performSearch(city) {
  if (isFetching) {
    return;
  }

  hideError();
  setFetchingState(true);

  let hadError = false;

  try {
    const [currentData, forecastData] = await Promise.all([
      fetchCurrentWeather(city),
      fetchForecast(city),
    ]);

    renderCurrentWeather(currentData);
    renderForecast(getFiveDayForecast(forecastData));

    saveRecentSearch(currentData.name);
    renderRecentSearches(getRecentSearches());
  } catch (error) {
    hadError = true;
    if (error instanceof TypeError) {
      showError('Network error. Please check your internet connection.');
    } else {
      showError(error.message);
    }
  } finally {
    setFetchingState(false);
    if (hadError) {
      cityInput.focus();
    }
  }
}

async function handleSearchSubmit(event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === '') {
    showError('Please enter a city name.');
    cityInput.focus();
    return;
  }

  await performSearch(city);
}

searchForm.addEventListener('submit', handleSearchSubmit);

recentSearchesList.addEventListener('click', (event) => {
  const button = event.target.closest('.recent-search-btn');
  if (!button) return;

  const city = button.textContent;
  cityInput.value = city;
  performSearch(city);
});

renderRecentSearches(getRecentSearches());
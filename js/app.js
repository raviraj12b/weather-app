// app.js — Orchestrator: listens for user events, coordinates api.js and ui.js.

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const errorMessage = document.getElementById('error-message');
const loadingIndicator = document.getElementById('loading-indicator');

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

async function handleSearchSubmit(event) {
  event.preventDefault();

  if (isFetching) {
    return;
  }

  const city = cityInput.value.trim();

  if (city === '') {
    showError('Please enter a city name.');
    cityInput.focus();
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

searchForm.addEventListener('submit', handleSearchSubmit);
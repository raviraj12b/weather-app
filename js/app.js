// app.js — Orchestrator: listens for user events, coordinates api.js and ui.js.

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const errorMessage = document.getElementById('error-message');
const loadingIndicator = document.getElementById('loading-indicator');

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function hideError() {
  errorMessage.hidden = true;
  errorMessage.textContent = '';
}

async function handleSearchSubmit(event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === '') {
    showError('Please enter a city name.');
    return;
  }

  hideError();
  loadingIndicator.hidden = false;

  try {
    const [currentData, forecastData] = await Promise.all([
      fetchCurrentWeather(city),
      fetchForecast(city),
    ]);

    renderCurrentWeather(currentData);
    renderForecast(getFiveDayForecast(forecastData));
  } catch (error) {
    if (error instanceof TypeError) {
      showError('Network error. Please check your internet connection.');
    } else {
      showError(error.message);
    }
  } finally {
    loadingIndicator.hidden = true;
  }
}

searchForm.addEventListener('submit', handleSearchSubmit);
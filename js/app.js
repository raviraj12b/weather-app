// app.js — Orchestrator: listens for user events, coordinates api.js and ui.js.

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');

async function handleSearchSubmit(event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === '') {
    console.log('Please enter a city name.');
    return;
  }

  try {
    const data = await fetchCurrentWeather(city);
    renderCurrentWeather(data);
  } catch (error) {
    console.log(error.message);
  }
}

searchForm.addEventListener('submit', handleSearchSubmit);
// app.js — Orchestrator: listens for user events,
// will coordinate api.js and ui.js in later phases.

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');

function handleSearchSubmit(event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === '') {
    console.log('Please enter a city name.');
    return;
  }

  console.log('Searching for:', city);
}

searchForm.addEventListener('submit', handleSearchSubmit);
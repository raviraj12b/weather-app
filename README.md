# Weather Forecast App

A responsive weather forecast web application built with vanilla HTML, CSS, and JavaScript, using the OpenWeatherMap API.

🔗 **Live demo:** https://raviraj12b.github.io/weather-app/

## Features

- Search current weather and a 5-day forecast for any city
- Responsive, mobile-first design (breakpoints at 600px and 1024px)
- Loading spinner and error states, including offline detection
- Keyboard support (Enter to search) and accessible focus states
- Recent searches saved locally, persisting across visits

## Tech Stack

- HTML5, CSS3 (Flexbox, Grid, custom properties)
- Vanilla JavaScript (ES6+, async/await, Fetch API)
- [OpenWeatherMap API](https://openweathermap.org/api) — Current Weather & 5-Day Forecast endpoints

## Running Locally

1. Clone this repo
2. Copy `js/config.example.js` to `js/config.js` and add your own [OpenWeatherMap API key](https://openweathermap.org/appid)
3. Open `index.html` in a browser, or serve it locally (e.g., VS Code's Live Server extension)

## Project Structure
weather-app/
├── index.html
├── css/style.css
├── js/
│   ├── app.js
│   ├── api.js
│   ├── ui.js
│   └── config.example.js
├── TESTING.md
└── README.md

## Status

✅ All core PRD requirements complete — see `TESTING.md` for full acceptance criteria coverage.
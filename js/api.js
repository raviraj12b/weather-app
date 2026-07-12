 // api.js — Responsible only for communicating with the OpenWeatherMap API.
// Does not touch the DOM. Does not decide what error text is shown to the user.



const BASE_URL = 'http://api.openweathermap.org/data/2.5';

async function fetchCurrentWeather(city) {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        if(response.status === 404){
            throw new Error('City not Found.');

        }
    
    throw new Error('Unable to fetch weather . Please try again later.');
    
    }

    const data = await response.json();
    return data;
}
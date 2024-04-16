import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const Country = ({ country }) => {
    const api_key = import.meta.env.VITE_API_KEY;
    const [weather, setWeather] = useState(null)

    useState(() => {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeather(response.data);
            })
    } , [api_key, country.capital[0]]);

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.name.common} width="200" />
            {weather && (
                <div>
                    <h2>Weather in {country.capital[0]}</h2>
                    <div><b>temperature:</b> {weather.main.temp} Celsius</div>
                    <div><b>description:</b> {weather.weather[0].description}</div>
                    <div><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} width = "100" alt={weather.weather[0].description} /></div>
                    <div><b>wind:</b> {weather.wind.speed} m/s</div>
                </div>
            )}
        </div>
    );
}

export default Country;
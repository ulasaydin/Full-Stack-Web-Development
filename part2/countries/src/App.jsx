import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Filter from './components/Filter';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));

  useEffect (() => {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data);
        })
    }, []
  )

  
  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
          <div>
            <h1>{filteredCountries[0].name.common}</h1>
            <div>capital {filteredCountries[0].capital[0]}</div>
            <div>population {filteredCountries[0].population}</div>
            <h2>languages</h2>
            <ul>
              {Object.values(filteredCountries[0].languages).map(language => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={filteredCountries[0].flags.png} alt={filteredCountries[0].name.common} width="100" />
          </div>
        
        ) : (
          filteredCountries.map(country => (
            <div key={country.name.common}>
              {country.name.common}
            </div>
          ))
        )}
        
      </div>
    </div>
  );
}

export default App

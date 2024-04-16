import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Filter from './components/Filter';
import Countries from './components/Countries';
import Country from './components/Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [showCountry, setShowCountry] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleShowCountry = (country) => {
    setShowCountry(country);
  }

  const displayCountries = () => {
    if (showCountry) {
        return <Country country={showCountry} />;
    } else if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length > 1) {
        return <Countries countries={filteredCountries} onShowCountry={handleShowCountry} />;
    } else if (filteredCountries.length === 1) {
        return <Country country={filteredCountries[0]} />;
    }
    return null;
};

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));

  useEffect (() => {
    if (filter) {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data);
          setShowCountry(null)
        })
    } else {
    setCountries([])
  }
  }, [filter]
  )

  
  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {displayCountries()}
    </div>
  );
}

export default App

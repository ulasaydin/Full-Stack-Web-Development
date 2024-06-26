import React from 'react';

const Countries = ({ countries, onShowCountry }) => (
    <div>
        {countries.map(country => (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => onShowCountry(country)}>show</button>
            </div>
        ))}
    </div>
);

export default Countries;
import React from 'react';

const Countries = ({ countries }) => (
    <div>
        {countries.map(country => (
            <div key={country.name.common}>{country.name.common}</div>
        ))}
    </div>
);

export default Countries;
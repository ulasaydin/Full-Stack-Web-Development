import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`;

  useEffect(() => {
    if (!name) {
      return;
    }
    axios
      .get(url)
      .then((response) => {
        setCountry({ data: response.data, found: true });
      })
      .catch(() => {
        setCountry({ found: false });
      });
  }, [url]);

  return country;
}
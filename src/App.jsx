/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const fetchCountries = async () => {
    try {
      const res = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );

      return await res.data;
    } catch (error) {
      console.log("Error in fecting countries", error);
      return;
    }
  };

  const fetchStates = async () => {
    try {
      const res = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      return res.data;
    } catch (error) {
      console.log("Error fetching states", error);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await axios.get(
        ` https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );

      return await res.data;
    } catch (error) {
      console.log("Error fetching country", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCountries();
      setCountries(data || []);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchApiData() {
      if (selectedCountry) {
        const data = await fetchStates();
        setSelectedState("");
        setStates(data || []);
        setCities([]);
        setSelectedCity("");
      }
    }
    fetchApiData();
  }, [selectedCountry]);

  useEffect(() => {
    async function fetchApiData() {
      if (selectedCountry && selectedState) {
        const data = await fetchCities();
        setCities(data || []);
        setSelectedCity("");
      }
    }
    fetchApiData();
  }, [selectedState]);

  return (
    <>
      <h1>Select Location</h1>
      <div>
        <select
          name="countries"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((country, idx) => (
            <option key={idx} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          name="states"
          value={selectedState}
          disabled={selectedCountry === ""}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((state, idx) => (
            <option key={idx} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          name="cities"
          value={selectedCity}
          disabled={selectedState === ""}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Select State</option>
          {cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <p>
          You Selected <b>{selectedCity}</b>,{" "}
          <span>
            {selectedState}, {selectedCountry}
          </span>
        </p>
      )}
    </>
  );
}

export default App;

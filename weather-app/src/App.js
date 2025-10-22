import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "4d5efac11ef3b09977242e5e337ca4df"; // Replace with your OpenWeatherMap key

  const fetchWeather = async () => {
    try {
      if (!city) {
        setError("Please enter a city name");
        return;
      }
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again!");
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <div className="weather-card">
        <h1>🌤️ Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>🌡️ {weather.main.temp}°C</p>
            <p>🌥️ {weather.weather[0].description}</p>
            <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

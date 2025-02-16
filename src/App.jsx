import React, { useEffect, useState } from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation, faCloudRain, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FaSun, FaCloudRain, FaSnowflake, FaCloud, FaSmog, FaBolt } from "react-icons/fa";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Kabul");
  const [error,setError] = useState(null);
  const apiKey = "dc3fa70ab8ea8900a82ac49aad894c5b"; // API key شما
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  
    const fetchWeather = async () => {
      try {
        const response = await axios.get(url);
        setWeather(response.data);
        console.log(response.data);
        setError(null)
      } catch (error) {
        console.log(error);
        setError("City not found");
      }
    };
    useEffect(() => {
    fetchWeather();
  }, []);

const getWeatherIcon = (weatherCode) => {
  switch (weatherCode) {
    case "01d": return <FaSun color="gold" size="4em" />;
    case "01n": return <FaSun color="gray" size="4em" />;
    case "02d": return <FaCloud color="lightgray" size="4em" />;
    case "02n": return <FaCloud color="darkgray" size="4em" />;
    case "03d":
    case "03n": return <FaCloud color="gray" size="4em" />;
    case "04d":
    case "04n": return <FaCloud color="darkgray" size="4em" />;
    case "09d":
    case "09n": return <FaCloudRain color="blue" size="4em" />;
    case "10d":
    case "10n": return <FaCloudRain color="navy" size="4em" />;
    case "11d":
    case "11n": return <FaBolt color="yellow" size="4em" />;
    case "13d":
    case "13n": return <FaSnowflake color="lightblue" size="4em" />;
    case "50d":
    case "50n": return <FaSmog color="gray" size="4em" />;
    default: return <FaCloud color="gray" size="4em" />;
  }
};

  return (
    <div className="App">
      <div className="weather-card">
        <div className="search-bar">   
            <input type="text" placeholder="Enter location" onChange={(e)=>{setCity(e.target.value)}} />
            <button type="submit" id="searchbutton" onClick={fetchWeather}>
              <FontAwesomeIcon icon={faSearchLocation} />
            </button>       
        </div>
        <span id="error">{error}</span>
        <div className="weather-icon" id="">
        {getWeatherIcon(weather?.weather[0]?.icon)}
        </div>
        {weather && (
          <>
            <div className="temperature">{weather?.main?.temp} °C</div>
            <div className="description">{weather?.weather[0]?.description}</div>
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="details">
              <div>
                <FontAwesomeIcon icon={faTint} />
                <span>{Math.abs(weather.main.humidity)}%</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faWind} />
                <span>{weather.wind.speed} km/h</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
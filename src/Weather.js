import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import { API_KEY } from './config.js';


function Weather(props) {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);

    
    const city = props.city;
    const units = props.units;
    const degree = props.degree;
    
    
    useEffect(() => {
        async function fetchWeather() {
            try {
              const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`
              );
              const data = await response.json();
              setError(false);
              if (data.cod === "404") {
                throw new Error(data.message);
              }
              setWeatherData(data);
              console.log(data);
            } catch (error) {
              console.error(error);
              setError(true);
              setWeatherData(null); // Reset weather data to null to indicate an error occurred
            }
          }

        

      fetchWeather();
    }, [city, units, error]);

    if (error){
        return <Alert severity="error">An Error has occurred</Alert>
    }

    return (
        <div>
        {weatherData ? (
          <div>
            <h2>{weatherData.name}</h2>
            <h3>{weatherData.sys.country}</h3>
            <p>{weatherData.weather[0].description}</p>
            <p>{weatherData.main.temp}{degree}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
  export default Weather;
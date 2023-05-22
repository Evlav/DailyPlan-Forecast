import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { API_KEY } from './config.js';
import './Weather.css';

//icon imports
import { ReactComponent as Sunny } from './icons/Sunny.svg';
import { ReactComponent as Cloudy } from './icons/Cloudy.svg';
import { ReactComponent as Drizzle } from './icons/Drizzle.svg';
import { ReactComponent as Rain } from './icons/Rain.svg';
import { ReactComponent as Thunderstorm } from './icons/Thunderstorm.svg';
import { ReactComponent as Snow } from './icons/Snow.svg';
import { ReactComponent as Fog } from './icons/Fog.svg';
import { ReactComponent as TheDefault } from './icons/default.svg';
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { montheme, tuetheme, wedtheme, thutheme, fritheme} from './themes'; // Import your custom theme


function GetIcon(weatherData, dayindex){
  const themes = [montheme, tuetheme, wedtheme, thutheme, fritheme];
  const iconColor = themes[dayindex].palette.primary.border

  switch(weatherData.weather[0].main){
    case 'Clear':
      return <Sunny className="icon" fill={iconColor}/>
    case 'Clouds':
      return <Cloudy className="icon" fill={iconColor}/>
    case 'Rain':
      return <Rain className="icon" fill={iconColor}/>
    case 'Drizzle':
      return <Drizzle className="icon" fill={iconColor}/>
    case 'ThunderStorm':
      return <Thunderstorm className="icon" fill={iconColor}/>
    case 'Snow':
      return <Snow className="icon" fill={iconColor}/>
    case 'Fog':
      return <Fog className="icon" fill={iconColor}/>
    case 'Haze':
      return <Fog className="icon" fill={iconColor}/>
    case 'Mist':
      return <Fog className="icon" fill={iconColor}/>
    default:
      return <TheDefault className="icon" fill={iconColor}/>
  }
}

function parseWeekData(data){
  //Parse data
  const parsedarray =  data.filter((item, index) => (index + 1) % 8 === 0);
  return(parsedarray)
}

function Weather(props) {
    const [weekData, setWeekData] = useState(null);
    const [error, setError] = useState(false);

    
    const city = props.city;
    const units = props.units;
    const degree = props.degree;
    const dayindex = props.dayindex
    
    
    useEffect(() => {
        async function fetchWeather() {
            try {

              const weekresponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${API_KEY}`
              );
              const data2 = await weekresponse.json();


              setError(false);
              if (data2.cod === "404") {
                throw new Error(data2.message);
              }
           
              setWeekData(parseWeekData(data2.list));
              


              
              
            } catch (error) {
              console.error(error);
              setError(true);
              setWeekData(null);
            }
          }

        

      fetchWeather();
    }, [city, units, error]);

    if (error){
        return <Alert severity="error">An Error has occurred</Alert>
    }

    return (
        <div>
        {weekData ? (
          <Stack className="stack" sx={{alignItems: "center", justifyContent: "space-between", minHeight:"164px"}}>
            {GetIcon(weekData[dayindex], dayindex)}
            <Container sx={{mb:"10px"}}>
              <Typography>{city}</Typography>
              <Typography>{weekData[dayindex].main.temp.toFixed(1)}{degree}</Typography>
            </Container>
           
          </Stack>
            
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
  export default Weather;
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Daily from "./DailyWeather";
import Hourly from "./HourlyWeather";
import "../styles/weather.css";

function Form({ weather, lat, long }) {
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [isDaily, setIsDaily] = useState(true);
  const API_KEY = process.env.WEATHER_API_KEY;
  useEffect(() => {
    const url = new URL(`https://api.openweathermap.org/data/2.5/onecall`);
    url.searchParams.append("lat", lat);
    url.searchParams.append("lon", long);
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("units", "imperial");

    if (lat !== undefined && long !== undefined)
      fetch(url)
        .then((resp) => {
          return resp.json();
        })
        .then((obj) => {
          setDailyForecast(obj.daily);
          setHourlyForecast(obj.hourly);
        });
  }, [weather, lat, long]);

  function convertUNIXTime(unix) {
    var dateFormatter = new Date(unix * 1000);
    var month = dateFormatter.getMonth();
    var date = dateFormatter.getDate();
    var year = dateFormatter.getFullYear();

    var time = month + "/" + date + "/" + year;

    return time;
  }

  // const toggle = () => {
  //   setIsDaily(!isDaily);
  // };

  if (weather === null) return <div class="title">Enter Zipcode</div>;

  return (
    <div class="form">
      <h1>{weather.name}</h1>
      <h2>{convertUNIXTime(weather.dt)}</h2>
      <h2>Current Temperature: {weather.main.temp} °F</h2>
      <Button class="toggle-buttons" onClick={() => setIsDaily(true)}>
        Daily
      </Button>
      <Button class="toggle-buttons" onClick={() => setIsDaily(false)}>
        Hourly
      </Button>
      {isDaily && (
        <div class="daily">
          <h3>Daily Forecast</h3>
          {dailyForecast.map((forecast) => (
            <Daily forecast={forecast}></Daily>
          ))}
        </div>
      )}
      {!isDaily && (
        <div class="hourly">
          <h3>Hourly Forecast</h3>
          {hourlyForecast.map((forecast) => (
            <Hourly forecast={forecast}></Hourly>
          ))}
        </div>
      )}
    </div>
  );
}

export default Form;

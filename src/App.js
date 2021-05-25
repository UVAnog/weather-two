import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/Input";
import Form from "./components/Form";
import "../src/App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [zip, setZip] = useState("22903");

  const API_KEY = process.env.WEATHER_API_KEY;

  useEffect(() => {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.append("appid", API_KEY);
    //url.searchParams.append("appid", WEATHER_API_KEY);

    url.searchParams.append("zip", zip);
    url.searchParams.append("units", "imperial");
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        // if there are no errors
        if (obj.cod === 200) {
          setWeather(obj);
          setLat(obj.coord.lat);
          setLong(obj.coord.lon);
        } else {
          setWeather(null);
        }
      });
  }, [zip]);

  const updateZip = (event) => {
    setZip(event.target.value);
  };

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",

        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <TextField placeholder="Zipcode" onChange={updateZip} />
      <Form weather={weather} lat={lat} long={long} />
    </div>
  );
}
export default App;

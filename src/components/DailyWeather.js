import React from "react";
import "../styles/weather.css";

function Daily({ forecast }) {
  var dateFormatter = new Date(forecast.dt * 1000);
  var month = dateFormatter.getMonth();
  var date = dateFormatter.getDate();
  var year = dateFormatter.getFullYear();
  var time = month + "/" + date + "/" + year;
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        backgroundColor: "lightblue",
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      {time} {forecast.temp.day} °F
    </div>
  );
}

export default Daily;

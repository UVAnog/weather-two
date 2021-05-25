import React from "react";
import "../App.css";

function Hourly({ forecast }) {
  var hoursList = [];
  var dateFormatter = new Date(forecast.dt * 1000);
  var hours = dateFormatter.getHours();

  hoursList.push(hours);

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
      {hoursList}: {forecast.temp} °F
    </div>
  );
}

export default Hourly;

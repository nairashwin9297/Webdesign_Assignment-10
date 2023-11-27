import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import sun from "../../images/sun.png";
import snow from "../../images/snow.png";
import rain from "../../images/rain.png";
import cloud from "../../images/cloud.png";

const HourlyForecast = (props) => {
  const { day } = useParams();
  const navigate = useNavigate();
  const [hourlyData, setHourlyData] = useState([]); // Initialize state using useState

  const imageMappings = {
    Clear: sun,
    Clouds: cloud,
   Rain: rain,
Snow: snow,
    // Add more mappings as needed
  };

  useEffect(() => {
    // Use Object.keys to iterate over the keys of the object
    Object.keys(props.data).forEach((key) => {
      if (key === day) {
        // Update the state with the matching hourly data
        setHourlyData(props.data[key].hourlyForecast);
      }
    });
  }, [props.data, day]); // Add props.data and day as dependencies



  return (
    <div className="container text-center mt-4">
      <h2>{day} Hourly Forecast</h2>
      {hourlyData?.length > 0 && (
        <table className="table table-bordered mt-4">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Time</th>
              <th scope="col">Temperature (Celcius)</th>
              <th scope="col">Overall Weather</th>
            </tr>
          </thead>
          <tbody>
            {hourlyData.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.time}</td>
                <td>{data.temperature}</td>
                <td>
                  <img
                    src={imageMappings[data.weatherCondition]}
                    alt={"Weather"}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
};

export default HourlyForecast;

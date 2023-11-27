// Forecast.js
import React from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Forecast = (props) => {
  // Your existing 5-day forecast component
  const navigate=useNavigate();



  

  const handleRowClick = (day) => {
    // Navigate to a new page with the day as a parameter
    // You can use React Router's Link or any navigation mechanism of your choice
    navigate(`/${day}`)
    console.log(`Navigating to ${day}`);
  };

  return (
    <div className="container text-center" style={{ padding: "20px" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>5-Day Forecast</h2>
      {props.data && (
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Day</th>
              <th scope="col">High (Celcius)</th>
              <th scope="col">Low (Celcius)</th>
              <th scope="col">Overall Weather</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.data).map((day, index) => (
              <tr key={index} onClick={() => handleRowClick(day)}>
                <th scope="row">{index + 1}</th>
                <td>{day}</td>
                <td>{props.data[day].highTemp}</td>
                <td>{props.data[day].lowTemp}</td>
                <td>
                  <img
                    src={props.data[day].weatherImage}
                    alt={`Weather for ${day}`}
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

export default Forecast;

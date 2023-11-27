import logo from './logo.svg';
import './App.css';
import Forecast from './Components/Forecast/Forecast';
import HourlyForecast from './Components/HourlyForecast/HourlyForecast';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import sun from "../src/images/sun.png"
import snow from "../src/images/snow.png"
import rain from "../src/images/rain.png"
import cloud from "../src/images/cloud.png"

function App() {
  

const [data, setData] = useState({});


useEffect(() => {
  // console.log(props.data,'OOOO')
  fetchData();
}, []);

// const fetchData = async () => {
//   try {
//     const response = await axios.get(
//       "https://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=2687ceae19b3970f193948a053591669&units=metric"
//     );
//   //   console.log(response.data, "DATAAA");
//     // Assuming `setData` is a state-setting function
//     // Make sure you have defined and initialized `setData` using the `useState` hook
//     setData(response.data);

//     const dailyWeatherData = {};

//     // Iterate through the list of weather data
//     response.data.list.forEach((item) => {
//       // Extract date and time
//       const dtTxt = item.dt_txt;

//       // Extract day from the date
//       const day = dtTxt.split(" ")[0];

//       // Create an object for the day if it doesn't exist
//       if (!dailyWeatherData[day]) {
//         dailyWeatherData[day] = {
//           highTemp: -Infinity, // Set initial high temperature to negative infinity
//           lowTemp: Infinity, // Set initial low temperature to positive infinity
//           hourlyForecast: [], // Array to store hourly forecast data
//           weatherConditions: {}, // Object to store counts of each weather condition
//         };
//       }

//       // Extract temperature
//       const temp = item.main.temp;

//       // Update high and low temperatures for the day
//       dailyWeatherData[day].highTemp = Math.max(
//         dailyWeatherData[day].highTemp,
//         temp
//       );
//       dailyWeatherData[day].lowTemp = Math.min(
//         dailyWeatherData[day].lowTemp,
//         temp
//       );

//       // Extract other hourly forecast data
//       const hourlyForecast = {
//         time: dtTxt.split(" ")[1], // Extract time from dt_txt
//         temperature: temp,
//         weatherCondition: item.weather[0].main,
//         // Add other data you want to include in the hourly forecast
//       };

//       // Push hourly forecast data to the array
//       dailyWeatherData[day].hourlyForecast.push(hourlyForecast);

//       // Count occurrences of each weather condition
//       const condition = item.weather[0].main;
//       dailyWeatherData[day].weatherConditions[condition] =
//         (dailyWeatherData[day].weatherConditions[condition] || 0) + 1;
//     });

//     // Determine the most common weather condition for each day
//     for (const day in dailyWeatherData) {
//       const { weatherConditions } = dailyWeatherData[day];
//       const mostCommonCondition = Object.keys(weatherConditions).reduce(
//         (a, b) => (weatherConditions[a] > weatherConditions[b] ? a : b)
//       );

//       // Add the most common weather condition and its image URL
//       dailyWeatherData[day].mostCommonCondition = mostCommonCondition;
//       dailyWeatherData[day].weatherImage =
//         getWeatherImageURL(mostCommonCondition); // Replace with your logic to get image URL
//     }
    
//     setData(dailyWeatherData)
//     // Print the results
//     for (const day in dailyWeatherData) {
//       const {
//         highTemp,
//         lowTemp,
//         hourlyForecast,
//         mostCommonCondition,
//         weatherImage,
//       } = dailyWeatherData[day];
//       // console.log(
//       //   `Day: ${day}, High Temp: ${highTemp.toFixed(
//       //     2
//       //   )}°C, Low Temp: ${lowTemp.toFixed(2)}°C`
//       // );
//       // console.log("Most Common Condition:", mostCommonCondition);
//       // console.log("Hourly Forecast:", hourlyForecast);
//       // console.log("Weather Image:", weatherImage);
//     }

//     // Function to get image URL based on weather condition
//     function getWeatherImageURL(weatherCondition) {
//       // Replace with your logic to map weather conditions to image URLs
//       const imageMappings = {
//         Clear: sun,
//         Clouds: cloud,
//         Rain: rain,
//         Snow: snow,
//         // Add more mappings as needed
//       };

//       return imageMappings[weatherCondition] || "default_image_url";
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=2687ceae19b3970f193948a053591669&units=metric"
    );
    
    const dailyWeatherData = {};

    // Iterate through the list of weather data
    response.data.list.forEach((item) => {
      // Extract date and time
      const dtTxt = item.dt_txt;

      // Extract day of the week from the date
      const dayOfWeek = new Date(dtTxt).toLocaleDateString('en-US', { weekday: 'long' });

      // Create an object for the day if it doesn't exist
      if (!dailyWeatherData[dayOfWeek]) {
        dailyWeatherData[dayOfWeek] = {
          highTemp: -Infinity,
          lowTemp: Infinity,
          hourlyForecast: [],
          weatherConditions: {},
        };
      }

      // Extract temperature
      const temp = item.main.temp;

      // Update high and low temperatures for the day
      dailyWeatherData[dayOfWeek].highTemp = Math.max(
        dailyWeatherData[dayOfWeek].highTemp,
        temp
      );
      dailyWeatherData[dayOfWeek].lowTemp = Math.min(
        dailyWeatherData[dayOfWeek].lowTemp,
        temp
      );

      // Extract other hourly forecast data
      const hourlyForecast = {
        time: dtTxt.split(" ")[1],
        temperature: temp,
        weatherCondition: item.weather[0].main,
        // Add other data you want to include in the hourly forecast
      };

      // Push hourly forecast data to the array
      dailyWeatherData[dayOfWeek].hourlyForecast.push(hourlyForecast);

      // Count occurrences of each weather condition
      const condition = item.weather[0].main;
      dailyWeatherData[dayOfWeek].weatherConditions[condition] =
        (dailyWeatherData[dayOfWeek].weatherConditions[condition] || 0) + 1;
    });

    // Determine the most common weather condition for each day
    for (const dayOfWeek in dailyWeatherData) {
      const { weatherConditions } = dailyWeatherData[dayOfWeek];
      const mostCommonCondition = Object.keys(weatherConditions).reduce(
        (a, b) => (weatherConditions[a] > weatherConditions[b] ? a : b)
      );

      // Add the most common weather condition and its image URL
      dailyWeatherData[dayOfWeek].mostCommonCondition = mostCommonCondition;
      dailyWeatherData[dayOfWeek].weatherImage =
        getWeatherImageURL(mostCommonCondition); // Replace with your logic to get image URL
    }

    // Print the results
    for (const dayOfWeek in dailyWeatherData) {
      const {
        highTemp,
        lowTemp,
        hourlyForecast,
        mostCommonCondition,
        weatherImage,
      } = dailyWeatherData[dayOfWeek];
      console.log(
        `Day of the Week: ${dayOfWeek}, High Temp: ${highTemp.toFixed(
          2
        )}°C, Low Temp: ${lowTemp.toFixed(2)}°C`
      );
      console.log("Most Common Condition:", mostCommonCondition);
      console.log("Hourly Forecast:", hourlyForecast);
      console.log("Weather Image:", weatherImage);
    }
    setData(dailyWeatherData);
    // Function to get image URL based on weather condition
    function getWeatherImageURL(weatherCondition) {

      const imageMappings = {
        Clear: sun,
        Clouds: cloud,
       Rain: rain,
    Snow: snow,
       
      };

      return imageMappings[weatherCondition] || "default_image_url";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" exact element={<Forecast data={data}/>} />
        <Route path="/:day" element={<HourlyForecast data={data}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

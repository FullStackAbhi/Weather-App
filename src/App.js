import Forecast from "./Components/Forecast";
import { useEffect, useState } from "react";
import { api } from "./Components/Api";
import { Route, Switch } from "react-router-dom";
import Weather from "./Components/Weather";
import Fullforecast from "./Components/Fullforecast";

function App() {
  const [weather, setweather] = useState(null);
  const [icon, setIcon] = useState(null);
  const [imgurl, setimgurl] = useState("");

  const handleCitySearch = (city) => {
    try {
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((response) => {
          setweather({ ...response });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation is not supported");
      }
    }
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetch(
        `${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((res) => {
          setweather({ ...res });
        });
    }
    function error() {
      console.log("Error getting location");
    }
    getCurrentLocation();
  }, []);
  useEffect(() => {
    if (weather) {
      switch (weather.weather[0].main) {
        case "Haze":
          setIcon("CLEAR_DAY");
          break;
        case "Clouds":
          setIcon("CLOUDY");
          break;
        case "Rain":
          setIcon("RAIN");
          break;
        case "Snow":
          setIcon("SNOW");
          break;
        case "Dust":
          setIcon("WIND");
          break;
        case "Drizzle":
          setIcon("SLEET");
          break;
        case "Fog":
          setIcon("FOG");
          break;
        case "Smoke":
          setIcon("FOG");
          break;
        case "Tornado":
          setIcon("WIND");
          break;
        default:
          setIcon("CLEAR_DAY");
      }
      setimgurl(`/img/${icon}.jpg`);
    }
  }, [weather, icon]);
  return (
    <div className="container" style={{ backgroundImage: `url(${imgurl})` }}>
      {weather && icon && (
        <Switch>
          <Route exact path="/">
            <Weather
              data={weather}
              handlesearch={handleCitySearch}
              icon={icon}
            />
          </Route>
          <Route path="/forecast">
            <Forecast result={weather} />
          </Route>
          <Route path="/fullforecast">
            <Fullforecast result={weather} />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;

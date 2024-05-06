import React from "react";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureLow } from "react-icons/fa6";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Clock from "react-live-clock";
import ReactAnimatedWeather from "react-animated-weather";

const Currentweather = ({ data, icon }) => {
  const defaults = {
    size: 112,
    color: "yellow",
    animate: true,
  };
  // console.log(data);
  const date = new Date();

  return (
    <div className="CurrentWeather_wrapper">
      <div className="top">
        {icon && (
          <ReactAnimatedWeather
            icon={icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
        )}
        <p className="Weather_description">({data.weather[0].description})</p>
        <p className="city">
          {data.name}
          <span> ({data.sys.country})</span>
        </p>
        <p className="city">
          {format(date, "dd MMMM yyyy")}{" "}
          <span>
            {" "}
            <Clock format={"HH:mm:ss"} interval={1000} ticking={true} />
          </span>
        </p>
      </div>

      <div className="button">
        <div className="temp">
          <span className="label_temp">
            {Math.round(data.main.temp)}°C
            <span className="max-min_temp">
              {" "}
              H {Math.round(data.main.temp_max)}° L{" "}
              {Math.round(data.main.temp_min)}°{" "}
            </span>
          </span>
        </div>
        <div className="details">
          <div className="air">
            <span className="air_quality">Wind speed - {data.wind.speed}</span>
          </div>
          <div className="uv">
            <span className="uv_index">Pressure - {data.main.pressure}</span>
          </div>
        </div>
      </div>
      <hr className="line" />
      <div className="button_details">
        <div className="details_single">
          <div className="air">
            <span className="minor_detail">
              Humidity - {data.main.humidity} <WiHumidity className="img" />
            </span>
          </div>
        </div>
        <div className="details_single">
          <div className="air">
            <span className="minor_detail">
              Feels Like - {Math.round(data.main.feels_like)}°{" "}
              <FaTemperatureLow className="img" />
            </span>
          </div>
        </div>
      </div>
      <div className="button_details second">
        <div className="details_single">
          <div className="air">
            <span className="minor_detail">
              <Link to="/fullforecast">Full Forecast</Link>
            </span>
          </div>
        </div>
        <div className="details_single">
          <div className="air">
            <span className="minor_detail">
              <Link to="/forecast">Hourly Forecast</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Currentweather;

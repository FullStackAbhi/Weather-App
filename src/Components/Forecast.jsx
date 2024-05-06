import React from "react";
import { api } from "./Api";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import {
  Accordion,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItem,
} from "react-accessible-accordion";

const Forecast = ({ result }) => {
  const [forecast, setForecast] = useState(null);
  useEffect(() => {
    fetch(
      `${api.base}forecast?lat=${result.coord.lat}&lon=${result.coord.lon}&units=metric&appid=${api.key}`
    )
      .then((res) => res.json())
      .then((forresult) => {
        setForecast(forresult);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="forecast_wrapper">
      <header className="forecast_header">
        <div></div>
        <span>Hourly Forecast</span>
        <div className="backdv">
          {" "}
          <Link to="/">
            <button className="backBtn">Back</button>
          </Link>
          <span>Click below link to see Weather_description</span>
        </div>
      </header>
      <Accordion>
        {forecast &&
          forecast.list.splice(0, 7).map((item, index) => (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily_item">
                    <img
                      className="small-img"
                      src={`icons/${item.weather[0].icon}.png`}
                      alt="weather"
                    />
                    <label className="day">
                      {format(forecast.list[index].dt_txt, " pp")}
                    </label>
                    <label className="description">
                      {item.weather[0].description}
                    </label>
                    <label className="min-max">
                      {Math.round(item.main.temp_max)}°C /
                      {Math.round(item.main.temp_min)}°C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure</label>
                    <label>{item.main.pressure}hpa</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity</label>
                    <label>{item.main.humidity}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Windspeed</label>
                    <label>{item.wind.speed}m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea level</label>
                    <label>{item.main.sea_level}m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like</label>
                    <label>{item.main.feels_like}°C</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default Forecast;

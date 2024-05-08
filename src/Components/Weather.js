import React from "react";
import Search from "./Search";
import Currentweather from "./Currentweather";

const Weather = ({ data, handlesearch, icon }) => {
  // console.log("data", data);
  // console.log("icon", icon);
  return (
    <>
      <Search handlesearch={handlesearch} />
      <Currentweather data={data} icon={icon} />
    </>
  );
};

export default Weather;

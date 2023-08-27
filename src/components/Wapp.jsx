import React, { useEffect, useState } from "react";
import background from "./minimal-weather-background.png";
import morning from "./morning.jpg";
import afternoon from "./afternoon.jpg";
import evening from "./evening.jpg";
import night from "./night.jpg";

const Wapp = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [mainText, setmainText] = useState("black");
  const [Search, setSearch] = useState("Lucknow");
  const [city, setcity] = useState("");
  const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setmainText("black");
      return morning;
    } else if (currentHour >= 12 && currentHour < 17) {
      setmainText("black");
      return afternoon;
    } else if (currentHour >= 17 && currentHour < 20) {
      setmainText("black");
      return evening;
    } else {
      setmainText("white");
      return night;
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${Search}&units=metric&appid=b9d030d4a8091632b6e9fd66d97890ae`;
      const response = await fetch(url);
      const data = await response.json();
      setcity(data.main);
    };
    fetchApi();
  }, [Search]);

  useEffect(() => {
    const timeOfDay = getTimeOfDay();
    setBackgroundImage(timeOfDay);
  }, []);

  return (
    <div
      className="container  "
      style={{ background: "#eee", height: "100vh", margin: "auto" }}
    >
      <div className="row vh-100 d-flex align-items-center justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 my-5 d-flex flex-row row ">
            <div
              className=" col col-md-6 card-body rounded d-flex flex-column justify-content-between"
              style={{
                backgroundImage: `url("${background}")`,
                height: "500px",
                backgroundPosition: "10% 0%",
                width: "300px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h1
                className="card-title text-white text-center "
                style={{ fontWeight: "bolder", opacity: "0.6" }}
              >
                AD-WEATHER
              </h1>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  className="form-control my-2 opacity-50 "
                  aria-describedby="labl"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <div
                  className="form-lable opacity-75 "
                  style={{
                    fontWeight: "bold",
                    color: "rgb(131,131,140)",
                    textShadow:
                      "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
                  }}
                >
                  Enter Location
                </div>
              </div>
            </div>
            <div
              id="main"
              className="col col-md-6 card-body  d-flex flex-column rounded justify-content-between align-items-center"
              style={{
                width: "300px",
                backgroundImage: `url("${backgroundImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "0% 0%",
                backgroundRepeat: "no-repeat",
                color: mainText,
              }}
            >
              {!city ? (
                <h2>no data found</h2>
              ) : (
                <>
                  <h4
                    className="mt-3"
                    style={{ fontWeight: "bolder", opacity: "0.8" }}
                  >
                    <i className="fa-solid fa-location-dot m-2"></i>
                    {Search}
                  </h4>
                  <h1
                    className="mt-3"
                    style={{ fontWeight: "bolder", opacity: "0.8" }}
                  >
                    {city.temp}℃
                  </h1>
                  <div
                    className="mb-3"
                    style={{ fontWeight: "bolder", opacity: "0.8" }}
                  >
                    Min:{city.temp_min}℃ | Max:{city.temp_max}℃
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wapp;

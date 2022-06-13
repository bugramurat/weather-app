import { useState } from "react";
import "./App.css";

const api = {
    key: "2f8c386c0fa0d97a7cbc2b4e072dbd47",
    base: "https://api.openweathermap.org/data/2.5",
};

function App() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const search = (evt) => {
        fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                setWeather(result);
                console.log(query);
                console.log(result);
            });
    };

    const dateBuilder = (d) => {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${month} ${date}`;
    };

    return (
        <div
            className={
                typeof weather.main != "undefined"
                    ? weather.main.temp > 16
                        ? "App warm"
                        : "App cold"
                    : "App"
            }
        >
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="search..."
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onKeyUp={search}
                    />
                </div>
                {typeof weather.main != "undefined" ? (
                    <div>
                        <div className="location-box">
                            <div className="location">
                                {weather.name}, {weather.sys.country}
                            </div>
                            <div div className="date">
                                {dateBuilder(new Date())}
                            </div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°C
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </main>
        </div>
    );
}

export default App;

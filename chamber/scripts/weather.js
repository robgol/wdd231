const apiKey = "f8094f9ff4454305eb9bbe6a4284f959";
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Praia&units=metric&appid=${apiKey}`;
const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Praia&units=metric&appid=${apiKey}`;

fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
        const currentWeatherContainer = document.querySelector(
            ".content .card:nth-child(2) .card-body"
        );

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const temperature = `${Math.round(data.main.temp)}°C`;
        const condition = data.weather[0].description;
        const high = `${Math.round(data.main.temp_max)}°C`;
        const low = `${Math.round(data.main.temp_min)}°C`;
        const humidity = `${data.main.humidity}%`;
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        currentWeatherContainer.innerHTML = `
            <div class="weather-row">
                <img src="${iconUrl}" alt="Weather Icon" class="weather-icon">
                <div class="weather-details">
                    <p><b>${temperature}</b></p>
                    <p>${condition}</p>
                    <p>High: ${high} | Low: ${low}</p>
                    <p>Humidity: ${humidity}</p>
                    <p>Sunrise: ${sunrise}</p>
                    <p>Sunset: ${sunset}</p>
                </div>
            </div>
        `;
    })
    .catch((error) => console.error("Error fetching current weather data:", error));

fetch(forecastWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
        const forecastContainer = document.querySelector(".content .card:nth-child(3) .card-body");

        const forecast = data.list.slice(0, 25).filter((_, index) => index % 8 === 0);
        forecast.forEach((day, index) => {
            const dayName = index === 0
                ? "Today"
                : new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });

            const dayTemp = `${Math.round(day.main.temp)}°C`;

            // Append forecast block
            forecastContainer.innerHTML += `
                <div class="forecast-day">
                    <p>${dayName}: <b>${dayTemp}</b></p>
                </div>
            `;
        });
    })
    .catch((error) => console.error("Error fetching forecast weather data:", error));

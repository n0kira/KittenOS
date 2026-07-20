const pawWeatherScreen = document.getElementById('pawWeather');
const pawWeatherScreenClose = document.getElementById('pawWeatherClose');

const weatherFeed = document.getElementById('weatherFeed');
const currentForecast = document.querySelector('#currentForecast');
const weeklyForecast = document.querySelector('#weeklyForecast');

fetchWeather();

function fetchWeather() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                weatherFeed.style.visibility = "hidden";

                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`)
                    .then(response => response.json())
                    .then(data => {

                        const temp = data.current.temperature_2m;
                        const code = data.current.weather_code;
                        const weather = translateCode(code);
                        
                        const weatherText = currentForecast.appendChild(document.createElement('div'));
                        weatherText.classList.add("currentWeatherDiv");

                        const cityText = weatherText.appendChild(document.createElement('p'));
                        cityText.style.fontWeight = "Bold";

                        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`)
                            .then(response => response.json())
                            .then(data => {
                                cityText.innerHTML = data.city;
                            });

                        const conditionImg = weatherText.appendChild(document.createElement('img'));
                        conditionImg.src = `img/icons/${weather}`
                        conditionImg.style.width = "64px";

                        weatherFeed.style.visibility = "visible";
                    });

                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`)
                    .then(response => response.json())
                    .then(data => {

                        const dates = data.daily.time;
                        const maxTemps = data.daily.temperature_2m_max;
                        const minTemps = data.daily.temperature_2m_min;
                        const codes = data.daily.weather_code;

                        for (let i = 0; i < 7; i++) {
                            const date = dates[i];
                            const maxTemp = maxTemps[i];
                            const minTemp = minTemps[i];
                            const code = codes[i];

                            const weather = translateCode(code);
                            const weatherText = weeklyForecast.appendChild(document.createElement('div'));
                            weatherText.classList.add("weatherDiv");

                            const dateContainer = weatherText.appendChild(document.createElement('div'));

                            const dateText = dateContainer.appendChild(document.createElement('p'));
                            dateText.innerHTML = `${date.split("-")[2]}/${date.split("-")[1]}`;

                            const conditionContainer = weatherText.appendChild(document.createElement('div'));

                            const conditionImg = conditionContainer.appendChild(document.createElement('img'));
                            conditionImg.src = `img/icons/${weather}`
                            conditionImg.style.width = "32px";

                            const tempContainer = weatherText.appendChild(document.createElement('div'));

                            const maxTempText = tempContainer.appendChild(document.createElement('p'));
                            maxTempText.innerHTML = `${maxTemp}°C`

                            const minTempText = tempContainer.appendChild(document.createElement('p'));
                            minTempText.innerHTML = `${minTemp}°C`

                            weatherFeed.style.visibility = "visible";
                        };
                    });
            },
            (error) => {
                console.log("Cannot access user location");
            }
        )
    }
}

function translateCode(code) {

    let iconName = "Icon=Sunny.png";

    if (code === 0) {
        iconName = "Icon=Sunny.png";
    } else if (code >= 1 && code <= 3) {
        iconName = "Icon=Partly Cloudy.png";
    } else if (code >= 45 && code <= 48) {
        iconName = "Icon=Cloudy.png";
    } else if (code >= 51 && code <= 55) {
        iconName = "Icon=Light Drizzle.png";
    } else if (code >= 56 && code <= 57) {
        iconName = "Icon=Sleet.png";
    } else if (code >= 61 && code <= 65) {
        iconName = "Icon=Rainy.png";
    } else if (code >= 66 && code <= 67) {
        iconName = "Icon=Sleet.png";
    } else if (code >= 71 && code <= 75) {
        iconName = "Icon=Snow.png";
    } else if (code >= 77 && code <= 79) {
        iconName = "Icon=Snowfall.png";
    } else if (code >= 80 && code <= 82) {
        iconName = "Icon=Rainy with Sun.png";
    } else if (code >= 85 && code <= 86) {
        iconName = "Icon=Snowfall.png";
    } else if (code === 95) {
        iconName = "Icon=Lightning.png";
    } else if (code >= 96 && code <= 99) {
        iconName = "Icon=Thunderstorm.png";
    }

    return iconName;
}

pawWeatherScreenClose.addEventListener("click", () => closeWindow(pawWeatherScreen));

initializeWindow("pawWeather");

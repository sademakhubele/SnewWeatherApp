function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time*1000);
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML =`${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = ` <img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`


    getForecast(response.data.city);
}

function formatDate(date){
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
        "Sunday",
        "Monday",
        "Teusday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let day = days[date.getDay()];

    if (minutes < 10){
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`
     
} 

function searchCity(city) {
    let apiKey = `b3246aecf7f467401t42442f8b6f3f8o`;
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiURL).then(refreshWeather);

}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-bar-input");
    
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey ="b3246aecf7f467401t42442f8b6f3f8o";
    let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
    

    let forecastHtml = "";

    response.data.daily.forEach(function(day, index) {
        if (index < 5) {
        forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temp">
        <div class="weather-forecast-temp-max">${Math.round(day.temperature.maximum)}°</div>
        <div class="weather-forecast-temp-min">${Math.round(day.temperature.minimum)}°</div>
        </div>
    </div>
    </div>
     `;
     }
    });

    let forecastElement = document.querySelector("#forecast")
    forecastElement.innerHTML = forecastHtml;
}

let searchBarElement = document.querySelector("#search-bar");
searchBarElement.addEventListener("submit",handleSearchSubmit);

displayForecast();

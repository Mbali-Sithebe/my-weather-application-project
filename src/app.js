//Change Weather Temparature
function refreshWeather(response) {
  let temparatureElement = document.querySelector("#temparature");
  let temperature = response.data.temperature.current;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  //Changing the round off
  temparatureElement.innerHTML = Math.round(temperature);
  // Weather Description
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  getForecast(response.data.city);
}

//Formating the Date
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

//API Search City
function searchCity(city) {
  let apiKey = "f4fo17tb49d11f665b0eb0019e73da1a";
  //Difference between API KEY and URL
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

//Search Form Function
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

//Calling Functions
searchCity("Johannesburg");

//Weather Forecast Array
function displayForecast(response) {
  let forecast = document.querySelector("#forecast");

  console.log(response.data);

  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
                  <div class="weather-forecast-date">${day}</div>
                  <div class="weather-forecast-icon">🌤️</div>
                  <div class="weather-forecast-temperatures">
                    <div class="weather-forecast-temp">
                      <strong>15°C </strong>
                    </div>
                    <div class="weather-forecast-temp">9°C</div>
                  </div>
                </div>`;
  });

  forecast.innerHTML = forecastHtml;
}

// Fetching Weather Forecast  API
function getForecast(city) {
  let apiKey = "f4fo17tb49d11f665b0eb0019e73da1a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

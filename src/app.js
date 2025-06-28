//Change Weather Temparature
function refreshWeather(response) {
  let temparatureElement = document.querySelector("#temparature");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  //Changing the round off
  temparatureElement.innerHTML = Math.round(temperature);
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

//Default City
searchCity("Johannesburg")

//API Intergration

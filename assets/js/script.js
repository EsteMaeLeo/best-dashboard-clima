var cityFormEl = document.querySelector("#city-form");
var locationInputEl = document.querySelector("#location");

var containerWeather = document.querySelector("#weather-container");

var loadWeather = function () {
  containerWeather.style.visibility = "hidden";
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  var cityName = locationInputEl.value.trim();
  if (cityName) {
    getCityData(cityName);
    cityName.value = "";
  } else {
    alert("Please enter a City");
  }
  console.log(event);
};

var getCityData = function (cityName) {
  var key = "98cc685a511e4cdddd0311ce79a8e339";
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      " &appid=" +
      key
  )
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      console.log(data);
    })
    .catch(function (e) {
      console.log(e);
    });
};

cityFormEl.addEventListener("submit", formSubmitHandler);

loadWeather();

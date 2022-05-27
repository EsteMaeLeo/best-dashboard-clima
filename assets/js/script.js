var cityFormEl = document.querySelector("#city-form");
var locationInputEl = document.querySelector("#location");

var formSubmitHandler = function (event) {
  event.preventDefault();
  var cityName = locationInputEl.value.trim();
  if (cityName) {
    getCityData(username);
    cityName.value = "";
  } else {
    alert("Please enter a City username");
  }
  console.log(event);
};

var getCityData = function () {};

cityFormEl.addEventListener("submit", formSubmitHandler);

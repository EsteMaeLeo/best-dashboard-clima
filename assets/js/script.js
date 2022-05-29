var cityFormEl = document.querySelector("#city-form");
var locationInputEl = document.querySelector("#location");
var cityGlobal = " ";
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
  cityGlobal = " ";
  var key = "98cc685a511e4cdddd0311ce79a8e339";
  var url =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    " &appid=" +
    key;

  fetch(url)
    .then(resp => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    })
    .then(data => {
      var lat = data[0].lat;
      var lon = data[0].lon;
      cityGlobal = data[0].name;
      cityWeather(lat, lon, cityGlobal);
    })
    .catch(function (e) {
      console.log(e);
    });
};

var cityWeather = function (lat, lon, cityName) {
  var key = "98cc685a511e4cdddd0311ce79a8e339";
  var lang = "en";
  var units = "imperial";
  var url =
    "http://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    key +
    "&units=" +
    units +
    "&lang=" +
    lang;
  //fetch the weather
  fetch(url)
    .then(resp => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    })
    .then(data => {
      console.log(data);
      displayWeather(data, cityName);
    })
    .catch(console.err);
};

var displayWeather = function (cityData, cityName) {
  containerWeather.style.visibility = "visible";
  //convert date
  const date = new Date();
  var actualDate = date.toLocaleString(cityData.current.dt);
  //get icon to display
  var iconWeather =
    "https://openweathermap.org/img/wn/" +
    cityData.current.weather[0].icon +
    ".png";

  $("#cName").html("City: " + cityName + " " + actualDate);
  $("#cName").append('<img id="imgAttr" src="' + iconWeather + '" />');
  $("#imgAttr").attr("src", iconWeather);
  $("#tempCurrent").html(
    "Temp: " + cityData.current.temp + " <span></span> &deg;F"
  );
  $("#windCurrent").html(
    "Wind: " + cityData.current.wind_speed + " <span></span> MPH"
  );
  $("#humidityCurrent").html(
    "Humidity: " + cityData.current.humidity + " <span></span> %"
  );

  if (cityData.current.uvi < 3) {
    $("#uvCurrent").html("UV Index: ");
    $("#uvCurrent").append(
      '<span class="uvi badge bg-success">' + cityData.current.uvi + "</span>"
    );
  } else if (current.uvi >= 3 && current.uvi < 6) {
    $("#uvCurrent").html("UV Index: ");
    $("#uvCurrent").append(
      '<span class="uvi badge bg-warning>' + cityData.current.uvi + "</span>"
    );
  } else if (current.uvi >= 6 && current.uvi < 8) {
    $("#uvCurrent").html("UV Index: ");
    $("#uvCurrent").append(
      '<span class="uvi badge bg-danger">' + cityData.current.uvi + "</span>"
    );
  }
};

cityFormEl.addEventListener("submit", formSubmitHandler);

loadWeather();

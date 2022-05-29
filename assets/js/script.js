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

  fetch(url).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        if (data.length != 0) {
          var lat = data[0].lat;
          var lon = data[0].lon;
          cityGlobal = data[0].name;
          cityWeather(lat, lon, cityGlobal);
        } else {
          alert("Please check name of the city");
        }
      });
    } else {
      alert("Please check name of the city");
    }
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

  fetch(url).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        if (data.length != 0) {
          console.log(data);
          displayWeather(data, cityName);
        } else {
          alert("Error to get the city weather");
        }
      });
    } else {
      alert("Error to get the city weather");
    }
  });
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

  cityForecast(cityData.daily);
};

var cityForecast = function (dailyData) {
  //previous searchs elimanate those elements
  if ($("#rowForecast div").length > 0) {
    $("#rowForecast div").remove();
    // $('#section-cards br').remove();
  }
  $("#rowForecast").append('<div class="row" id="rowNew">');
  //forecast for 5 days
  for (var i = 0; i < 5; i++) {
    //$("#rowForecast").append('<div class="row" id="row' + i + '">');
    $("#rowNew").append(
      '<div class="col-lg-2 col-md-3 col-6" id="col' + i + '">'
    );
    $("#col" + i).append(
      '<div class="card card-default" id="colCard' + i + '">'
    );
    $("#colCard" + i).append(
      '<div class="card text-white bg-primary" id="card' + i + '">'
    );
    $("#card" + i).append('<div class="card-block" id="block' + i + '">');

    var date = new Date(dailyData[i].dt * 1000);
    var dateForecast = date.toDateString().slice(0, -5);

    $("#block" + i).append(
      '<h4 class="card-title" id="date>' + i + '">' + dateForecast
    );

    var iconWeather =
      "https://openweathermap.org/img/wn/" +
      dailyData[i].weather[0].icon +
      ".png";

    $("#block" + i).append('<img src="' + iconWeather + '" />');

    $("#block" + i).append(
      '<p class="card-text">Temp Max: ' +
        dailyData[i].temp.max +
        " <span></span> &deg;F</p>"
    );

    $("#block" + i).append(
      '<p class="card-text">Temp Min: ' +
        dailyData[i].temp.min +
        " <span></span> &deg;F</p>"
    );

    $("#block" + i).append(
      '<p class="card-text">Wind : ' +
        dailyData[i].wind_speed +
        " <span></span> MPH"
    );

    $("#block" + i).append(
      '<p class="card-text">Humidity : ' +
        dailyData[i].humidity +
        " <span></span> %"
    );
  }
};
{
}

cityFormEl.addEventListener("submit", formSubmitHandler);

loadWeather();

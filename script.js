$(document).ready(function(){
    var APIKey = "a012e3cf5aad2cc3ed0a6457c88685ce";
    
    function renderWeather(cityName){
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + cityName + "&appid=" + APIKey;
        var latitude;
        var longitude;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var weatherIcon = $("<img>");
            weatherIcon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png")
            $("#cityName").text(response.name + " (" + moment().format("L") + ") ");
            $("#cityName").append(weatherIcon);
            $("#temperature").text(response.main.temp + "F");
            $("#humidity").text(response.main.humidity + "%");
            $("#wind-speed").text(response.wind.speed + " MPH");
            latitude = response.coord.lat;
            longitude = response.coord.lon;
            console.log("lat: " + latitude);
            console.log("lon: " + longitude);
            getUVData(latitude,longitude);
        })
        renderFiveDay(cityName);
    }
    
    function renderFiveDay(cityName){
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + cityName +"&appid=" + APIKey;
        $("#five-day-forecast").text("");
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            for(var i = 0; i <= 40; i+=8){
                var newCard = $("<div>");
                newCard.addClass("card card-body forecast text-light");
                var h5 = $("<h5>");
                h5.addClass("card-title");
                h5.text(moment(response.list[i].dt * 1000).format("L"));
                var weatherIcon = $("<img>");
                weatherIcon.addClass("weather-icon");
                weatherIcon.attr("src", "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png")
                var temp = $("<p>");
                temp.addClass("card-text");
                temp.text("Temp: " + response.list[i].main.temp + " F");
                var humidity = $("<p>");
                humidity.addClass("card-text");
                humidity.text("Humidity: " + response.list[i].main.humidity);
                newCard.append(h5);
                newCard.append(weatherIcon);
                newCard.append(temp);
                newCard.append(humidity);
                $("#five-day-forecast").append(newCard);
            }
        })
    }

    function getUVData(lat, lon){
        var queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
        $.ajax({
            url: queryURLUV,
            method: "GET"
        }).then(function(response){
            $("#uv-index").text(response.value);
        })
    }

    function search(event){
        event.preventDefault();
        var cityName = $("#search").val();
        renderWeather(cityName);
        addHistory(cityName);
    }

    function addHistory(cityName){
        var historyButton = $("<button>");
        historyButton.addClass("list-group-item");
        historyButton.text(cityName);
        $("#search-history").prepend(historyButton);
    }

    function historySearch(){
        var cityName = $(this).text();
        renderWeather(cityName);
    }

    $("#search-button").on("click", search);
    $("#search-history").on("click","button", historySearch)




});

/* <div class="card" style="width: 18rem;" id="five-day-forecast">
              <div class="card-body">
                <h5 class="card-title">Date</h5>
                <h6 class="card-subtitle mb-2 text-muted">Temperature:</h6>
                <p class="card-text">Humdity:</p>
              </div>
            </div> */
        // var newCard = $("<div>");
        // newCard.addClass("card-body");
        // var h5 = $("<h5>");
        // h5.addClass("card-title");

//TODO
//init() function
//5 day forecast
//uv index color display
//edge cases
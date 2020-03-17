$(document).ready(function(){
    var cityName = "Atlanta";
    var APIKey = "a012e3cf5aad2cc3ed0a6457c88685ce";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + cityName + "&appid=" + APIKey;
    var latitude;
    var longitude;
    var queryURLUV = "api.openweathermap.org/data/2.5/uvi/history?lat=" + "&lon=" + "&appid=" + APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $("#cityName").text(response.name + " (" + moment().format("L") + ") " + response.weather[0].main);
        $("#temperature").text(response.main.temp + "F");
        $("#humidity").text(response.main.humidity + "%");
        $("#wind-speed").text(response.wind.speed + " MPH");
    })






});
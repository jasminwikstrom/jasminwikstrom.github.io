var celsiusSymbol = '&#8451;';
var metersPerSec = 'm/s';

// This function is called when page is loaded in DOM
$(document).ready(function () {
    getWeather();
});

// This function is making the ajax call
function getWeather() {

    // Unit of temperature we want to receive
    // metric = celsius
    // imperial = fahrenheit
    // default is kelvin, no need to use units parameters in call
    var unit = "metric";

    //URL to service
    var url = "http://api.openweathermap.org/data/2.5/forecast";

    //Key to access service
    var key = "c63811c90b64fe0da2ebea199123b130";

    // The chosen city we want to receive weather information about
    var city = "London";


    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8",
        data: {
            q: city,
            units: unit,
            APPID: key
        },
        statusCode: {
            200: function (response) {
                addTable(response)
            }
        }
    });
}

function addTable(data) {
    var time;
    var weather;
    var temp;
    var windSpeed;

    for (i = 0; i < 5; i++) {
        time = data.list[i].dt_txt.substring(10, 16);
        weather = data.list[i].weather[0].main;
        temp = Math.round(data.list[i].main.temp);
        windSpeed = Math.round(data.list[i].wind.speed);

        addRow(time, weather, temp, windSpeed, i)
    }

}

function addRow(time, weather, temp, windSpeed, i) {
    var table = document.getElementById("myTable");
    var row = table.insertRow(i - i - 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = time;
    cell2.innerHTML = weather;
    cell3.innerHTML = temp+celsiusSymbol;
    cell4.innerHTML = windSpeed+metersPerSec;

}
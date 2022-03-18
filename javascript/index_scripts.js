// Document Ready
    $(document).ready(function(){
        var TypedValue= " "
        var SubmitBtn = $("#submitBtn");
        var CityHistoryArray = JSON.parse(localStorage.getItem("CityHistoryArray")) || [];
        
        GetLocalStorage()


    $(document).on("click", ".history-btn", function(){
        var HistoryBtn = $(this).text()
        var weatherColumn = $("#weatherColumn");
        WeatherAPIQuery(HistoryBtn)
        weatherColumn.removeClass("hide");
    });

// Set Local Storage Item
    function SetLocalStorage() {
        TypedValue = $("#searchBar").val().trim();
        CityHistoryArray.push(TypedValue);
        localStorage.setItem("CityHistoryArray", JSON.stringify(CityHistoryArray));
    }

// Get Local Storage Items
    function GetLocalStorage() {
        $(".history-btns-list").empty();
        for (var i = 0; i < CityHistoryArray.length; i++) {

            var History = $("#historyGroup");
            var cityBtn = $("<button class='btn btn-info'>");
            
            cityBtn.addClass("history-btn")
            cityBtn.text(CityHistoryArray[i]);

            History.prepend(cityBtn)

        }
    }
// Event Listeners
    SubmitBtn.click(function(event) {
        event.preventDefault();
        var TypedValue = $("#searchBar").val();
        var weatherColumn = $("#weatherColumn");
        WeatherAPIQuery(TypedValue);
        SetLocalStorage();
        GetLocalStorage();
        weatherColumn.removeClass("hide");
        
    });



// Weather API Query
    var WeatherAPIQuery = function(location) {

        var APIKey = "6c2ebaefc101b100aa11166901010dd8"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial" + "&apikey=" + APIKey;
        
        $.ajax({
          url:queryURL,
          method:"GET"
        }).then(function(response) {

            var code = response.weather[0].icon;
            var imgSrc = "https://openweathermap.org/img/wn/" + code + ".png";
            var iconImg = $("<img>").attr("src", imgSrc);
            iconImg.attr("alt", response.weather[0].main);

          $("#icon").html(iconImg)
          $("#city-name").text(response.name + ", " + response.sys.country);
          $("#todayDate").text(moment().format('dddd, MMMM Do, YYYY'));
          $("#temp").html("<i class='fa-solid fa-temperature-half'></i> " + "Temperature: " + response.main.temp + "°F");
          $("#humidity").html("<i class='fa-solid fa-droplet'></i> " + "Humidity: " + response.main.humidity + "%");
          $("#wind-speed").html("<i class='fa-solid fa-wind'></i> " + "Wind-Speed: " + response.wind.speed + " mph");
          $("#weeklyForecastHeader").text("5 Day Forecast:")
       

          // UV Call
            var UVAPICall = function(){

                var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon

                $.ajax({
                    url:queryURLUV,
                    method:"GET"
                  }).then(function(response) {
                    $("#UV-index").html("<i class='fa-solid fa-sun'></i> " + "UV Index: " + response.value);
                  })

            }

            // Weekly Forecast
                var WeeklyForecastCall = function() {
               
                    var queryURLWeekly = "https://api.openweathermap.org/data/2.5/forecast?q=" + response.name + "," + response.sys.country + "&units=imperial" + "&apikey=" + APIKey;

                    $.ajax({
                        url:queryURLWeekly,
                        method: "GET"
                    }).then(function(response) {
                        console.log(response)

                        var Day1Img = response.list[6].weather[0].icon;
                        var Day1imgSrc = "https://openweathermap.org/img/wn/" + Day1Img + ".png";
                        var Day1iconImg = $("<img>").attr("src", Day1imgSrc);

                        var Day2Img = response.list[14].weather[0].icon;
                        var Day2imgSrc = "https://openweathermap.org/img/wn/" + Day2Img + ".png";
                        var Day2iconImg = $("<img>").attr("src", Day2imgSrc);
                        
                        var Day3Img = response.list[22].weather[0].icon;
                        var Day3imgSrc = "https://openweathermap.org/img/wn/" + Day3Img + ".png";
                        var Day3iconImg = $("<img>").attr("src", Day3imgSrc);

                        var Day4Img = response.list[30].weather[0].icon;
                        var Day4imgSrc = "https://openweathermap.org/img/wn/" + Day4Img + ".png";
                        var Day4iconImg = $("<img>").attr("src", Day4imgSrc);

                        var Day5Img = response.list[38].weather[0].icon;
                        var Day5imgSrc = "https://openweathermap.org/img/wn/" + Day5Img + ".png";
                        var Day5iconImg = $("<img>").attr("src", Day5imgSrc);


                        $("#dateOne").text(moment().add(1, "days").format("dddd, MMMM Do"));
                        $("#iconOne").html(Day1iconImg);
                        $("#tempOne").html("<i class='fa-solid fa-temperature-half'></i> " + "Temp: " + response.list[6].main.temp + "°F");
                        $("#humidityOne").html("<i class='fa-solid fa-droplet'></i> " + "Humidity: " + response.list[6].main.humidity + "%");

                        $("#dateTwo").text(moment().add(2, "days").format("dddd, MMMM Do"));
                        $("#iconTwo").html(Day2iconImg);
                        $("#tempTwo").html("<i class='fa-solid fa-temperature-half'></i> " + "Temp: " + response.list[14].main.temp + "°F");
                        $("#humidityTwo").html("<i class='fa-solid fa-droplet'></i> " + "Humidity: " + response.list[14].main.humidity + "%");

                        $("#dateThree").text(moment().add(3, "days").format("dddd, MMMM Do"));
                        $("#iconThree").html(Day3iconImg);
                        $("#tempThree").html("<i class='fa-solid fa-temperature-half'></i> " + "Temp: " + response.list[22].main.temp + "°F");
                        $("#humidityThree").html("<i class='fa-solid fa-droplet'></i> " + "Humidity: " + response.list[22].main.humidity + "%");

                        $("#dateFour").text(moment().add(4, "days").format("dddd, MMMM Do"));
                        $("#iconFour").html(Day4iconImg);
                        $("#tempFour").html("<i class='fa-solid fa-temperature-half'></i> " + "Temp: " + response.list[30].main.temp + "°F");
                        $("#humidityFour").html("<i class='fa-solid fa-droplet'></i> " + "Humidity: " + response.list[30].main.humidity + "%");

                        $("#dateFive").text(moment().add(5, "days").format("dddd, MMMM Do"));
                        $("#iconFive").html(Day5iconImg);
                        $("#tempFive").html("<i class='fa-solid fa-temperature-half'></i> " + "Temp: " + response.list[38].main.temp + "°F");
                        $("#humidityFive").html("<i class='fa-solid fa-droplet'></i> " + "Humidity: " + response.list[38].main.humidity + "%");

                    
                    })
    
                }

            UVAPICall();
            WeeklyForecastCall();  
        })
    };

});
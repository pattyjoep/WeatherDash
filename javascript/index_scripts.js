// Document Ready
    $(document).ready(function(){
        var TypedValue= " "
        var SubmitBtn = $("#submitBtn");
        var CityHistoryArray = JSON.parse(localStorage.getItem("CityHistoryArray")) || [];
        
        GetLocalStorage()


    $(document).on("click", ".history-btn", function(){
        var HistoryBtn = $(this).text()
        WeatherAPIQuery(HistoryBtn)
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
            var cityBtn = $("<button>");
            
            cityBtn.addClass("history-btn")
            cityBtn.text(CityHistoryArray[i]);

            History.prepend(cityBtn)

        }
    }
// Event Listeners
    SubmitBtn.click(function(event) {
        event.preventDefault();
        
        var TypedValue = $("#searchBar").val()
        
        WeatherAPIQuery(TypedValue);
        SetLocalStorage();
        GetLocalStorage();
        
    });



// Weather API Query
    var WeatherAPIQuery = function(location) {

        var APIKey = "59068c5fe12d987eb3614ae68a11fda8"
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
          $("#todayDate").text(moment().format('l'));
          $("#temp").text("Temperature (°F): " + response.main.temp);
          $("#humidity").text("Humidity (%): " + response.main.humidity);
          $("#wind-speed").text("Wind-Speed (mph): " + response.wind.speed);
          $("#weeklyForecastHeader").text("5 Day Forecast:")
       

          // UV Call
            var UVAPICall = function(){

                var queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon

                $.ajax({
                    url:queryURLUV,
                    method:"GET"
                  }).then(function(response) {
                    $("#UV-index").text("UV Index: " + response.value);
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
                    
                        $("#dateOne").text(moment().add(1, "days").format("l"));
                        $("#dateTwo").text(moment().add(2, "days").format("l"));
                        $("#dateThree").text(moment().add(3, "days").format("l"));
                        $("#dateFour").text(moment().add(4, "days").format("l"));
                        $("#dateFive").text(moment().add(5, "days").format("l"));

                        
                        $("#iconOne").html(Day1iconImg);
                        $("#tempOne").text("Temp: " + response.list[6].main.temp + " °F");
                        $("#humidityOne").text("Humidity: " + response.list[6].main.humidity + "%");

                        $("#iconTwo").html(Day2iconImg);
                        $("#tempTwo").text("Temp: " + response.list[14].main.temp + " °F");
                        $("#humidityTwo").text("Humidity: " + response.list[14].main.humidity + "%");

                        $("#iconThree").html(Day3iconImg);
                        $("#tempThree").text("Temp: " + response.list[22].main.temp + " °F");
                        $("#humidityThree").text("Humidity: " + response.list[22].main.humidity + "%");

                        $("#iconFour").html(Day4iconImg);
                        $("#tempFour").text("Temp: " + response.list[30].main.temp + " °F");
                        $("#humidityFour").text("Humidity: " + response.list[30].main.humidity + "%");

                        $("#iconFive").html(Day5iconImg);
                        $("#tempFive").text("Temp: " + response.list[38].main.temp + " °F");
                        $("#humidityFive").text("Humidity: " + response.list[38].main.humidity + "%");

                    
                    })
    
                }

            UVAPICall();
            WeeklyForecastCall();  
        })
    };

});
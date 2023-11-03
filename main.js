
let temp = document.querySelector(".temp-span");
let pressure = document.querySelector("#pressure");
let humidity = document.querySelector("#humidity");
let speed = document.querySelector("#speed");
let visibility = document.querySelector("#visibility");
let feelsLike = document.querySelector("#feels-like");
let tempNow = document.querySelector(".temp-now");
let cloudsNow = document.querySelector(".clods-now");
let cloudsDescription = document.querySelector(".clouds-description");

let bg = document.querySelector(".scoreboard");

let city = "Kyiv";
let celsius = true;

tempNow.addEventListener("click", () => {
    if (celsius) {
        celsius = false;
        dataService.getWeatherToday();
        // dataService.getWeatherForecast();
    } else {
        celsius = true;
        dataService.getWeatherToday();
        // dataService.getWeatherForecast();
    }
})

let findBtn = document.querySelector(".find-button");
findBtn.addEventListener("click", () => {
    let inputCity = document.querySelector("#inputCity");
    city = inputCity.value;
    dataService.getWeatherToday();
    // dataService.getWeatherForecast();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        let inputCity = document.querySelector("#inputCity");
        city = inputCity.value;
        dataService.getWeatherToday();
        // dataService.getWeatherForecast();
    }
});


let dataService = {

    getWeatherToday () {
        let urlToday= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=aad5af1c13761b09a7d0f993f92e12a7";
        fetch(urlToday)
        .then(response => response.json())
            .then(data => {
                // this.getWeatherForecast(data.coord.lat, data.coord.lon);
                let x = new WeatherTodayView(data);
                x.showWeatherToday();
                if (celsius) {
                    x.showByCelsium();
                } else {
                    x.showByFahrenheit();
                }
                x.showLocalData();
            })
    },

    // getWeatherForecast (lat, lon) {
    //
    //     let urlForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + `${lat}` + "&lon=" + `${lon}` + "&exclude=current,minutely,hourly&appid=bf35cac91880cb98375230fb443a116f&units=metric";
    //      fetch(urlForecast)
    //          .then(response => response.json())
    //          .then(dataForecast => {
    //              removeForecast();
    //              for (let i = 1; i < (dataForecast.daily.length - 3); i++) {
    //                  let dayForecast = dataForecast.daily[i];
    //                  let y = new WeatherForecastView(dayForecast);
    //                  y.showForecast();
    //              }
    //          })
    //  },
}

class WeatherTodayView {
    constructor(weatherToday) {
        this.sunset = weatherToday.sys.sunset;
        this.sunrise = weatherToday.sys.sunrise;
        this.minTemp = weatherToday.main.temp_min;
        this.maxTemp = weatherToday.main.temp_max;
        this.temp = weatherToday.main.temp;
        this.tempFeelsLike = weatherToday.main.feels_like;
        this.weather = weatherToday.weather[0].main;
        this.clouds = weatherToday.weather[0].description;
        this.icon = weatherToday.weather[0].icon;
        this.pressure = weatherToday.main.pressure;
        this.visibility = weatherToday.visibility;
        this.humidity = weatherToday.main.humidity;
        this.wind = weatherToday.wind.speed;

        this.city = weatherToday.name;
        this.country = weatherToday.sys.country;
    }

    showWeatherToday () {

        pressure.innerHTML = `${this.pressure} mbar`;
        humidity.innerHTML = `${this.humidity} %`;
        speed.innerHTML = `${this.wind} m/s`;
        visibility.innerHTML = `${this.visibility / 1000} km`;

        cloudsDescription.innerHTML = this.clouds;

        let imgClouds = document.createElement("img");
        imgClouds.src = "https://openweathermap.org/img/wn/" + this.icon + "@2x.png";
        cloudsNow.innerHTML = "";
        cloudsNow.append(imgClouds);

        switch (this.weather) {
            case "Clear" :
                bg.style.background = "url('Image/01d.jpg')";
                break;
            case "Clouds" :
                bg.style.background = "url('Image/02d.jpg')";
                break;
            case "Rain" :
                bg.style.background = "url('Image/10d.jpg')";
                break;
            case "Thunderstorm" :
            case "Drizzle":
                bg.style.background = "url('Image/11d.jpg')";
                break;
            case "Snow" :
                bg.style.background = "url('Image/13d.jpg')";
                break;
            case "Atmosphere" :
                bg.style.background = "url('Image/50d.jpg')";
                break;
            default :
                bg.style.background = "rgb(135,184,242)";
        }
    }

    showLocalData () {
        let location = document.querySelector(".location");
        location.innerHTML = `${this.city}, ${this.country}`;
        function showDate () {
            let dateOutput = document.querySelector(".date");
            let date = new Date();
            let dayOfWeek;
            let number = date.getDate();
            let month;

            switch (date.getDay()) {
                case 0 :
                    dayOfWeek = "Sunday"
                    break;
                case 1 :
                    dayOfWeek = "Monday"
                    break;
                case 2 :
                    dayOfWeek = "Tuesday"
                    break;
                case 3 :
                    dayOfWeek = "Wednesday"
                    break;
                case 4 :
                    dayOfWeek = "Thursday"
                    break;
                case 5 :
                    dayOfWeek = "Friday"
                    break;
                case 6 :
                    dayOfWeek = "Saturday"
                    break;
            }

            switch (date.getMonth()) {
                case 1 :
                    month = "January";
                    break;
                case 2 :
                    month = "February";
                    break;
                case 3 :
                    month = "March";
                    break;
                case 4 :
                    month = "April";
                    break;
                case 5 :
                    month = "May";
                    break;
                case 6 :
                    month = "June";
                    break;
                case 7 :
                    month = "July";
                    break;
                case 8 :
                    month = "August";
                    break;
                case 9 :
                    month = "September";
                    break;
                case 10 :
                    month = "October";
                    break;
                case 11 :
                    month = "November";
                    break;
                case 12 :
                    month = "December";
                    break;
            }

            dateOutput.innerHTML = `${dayOfWeek}, ${number} ${month}`;
        }
        showDate();
    }

    showByCelsium () {
        temp.innerHTML = `${Math.floor(this.minTemp - 273)} - ${Math.floor(this.maxTemp-273)}°C`;
        tempNow.innerHTML = `${Math.floor(this.temp - 273)}°C`;
        feelsLike.innerHTML = `${Math.floor(this.tempFeelsLike - 273)}°C`;
        celsius = true;
    }

    showByFahrenheit () {
        temp.innerHTML = `${Math.floor((this.minTemp - 273) * (9 / 5) + 32)} - ${Math.floor((this.maxTemp-273) * (9 / 5) + 32)}°F`;
        tempNow.innerHTML = `${Math.floor((this.temp - 273) * (9 / 5) + 32)}°F`;
        feelsLike.innerHTML = `${Math.floor((this.tempFeelsLike - 273) * (9 / 5) + 32)}°F`;
        celsius = false;
    }
}

// class WeatherForecastView {
//     constructor(weatherForecastDay) {
//         this.date = new Date(weatherForecastDay.dt *1000);
//         this.number = this.date.getDate().toString();
//         this.month = this.date.getMonth().toString();
//         this.temp = Math.floor(weatherForecastDay.temp.day);
//         this.weather = weatherForecastDay.weather[0].description;
//         this.icon = weatherForecastDay.weather[0].icon;
//     }
//
//     showForecast () {
//
//         if (this.number < 10) {
//             this.number = '0' + this.number;
//         }
//
//         if (this.month < 10) {
//             this.month = '0' + this.month;
//         }
//
//         let weekForecast = document.querySelector(".week-forecast");
//
//         let forecastDayContainer = document.createElement("div");
//         forecastDayContainer.classList.add("container-day-forecast");
//         let forecastDate = document.createElement("div");
//         let forecastTemp = document.createElement("div");
//         let forecastIcon = document.createElement("img");
//         forecastIcon.src = "https://openweathermap.org/img/wn/" + this.icon + "@2x.png";
//
//         forecastDate.innerHTML = `${this.number}.${this.month}`;
//
//         if (celsius) {
//             forecastTemp.innerHTML = this.temp + "°C";
//         } else {
//             forecastTemp.innerHTML = this.temp + "°F";
//         }
//
//         forecastDayContainer.append(forecastDate);
//         forecastDayContainer.append(forecastIcon);
//         forecastDayContainer.append(forecastTemp);
//         weekForecast.append(forecastDayContainer);
//     }
// }

dataService.getWeatherToday();

// function removeForecast () {
//     let weekForecast = document.querySelector(".week-forecast");
//     weekForecast.innerHTML = "";
// }

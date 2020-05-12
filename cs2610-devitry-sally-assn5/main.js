//url to get long and lat using check user's ip address.
const url1 = 'http://api.ipstack.com/check?access_key=a93d3becbbe7108f8d72815df9d98c5d'

var app = new Vue({
    el: '#app',
    data: {
        weatherList: [],
        gif: './loadingSun.gif',
        loading: true,
        gray: 40,
        green: 0,
        red: 0
    },
    methods: {
        dosomething(event) {
            this.weather = "Rainy";
        },
        toggle(ev) {
            console.log("the onlicked triggered the function!")
            var target = ev.target;
            if (ev.target.nodeName != "DIV") {
                target = ev.target.closest('div>div');
            }

            if (target.className == "gray") {
                console.log("you got in gray")
                target.className = "green";
                this.green++;
                this.gray--;
            }
            else if (target.className == "green") {
                console.log("you got in green")
                target.className = "red";
                this.red++;
                this.green--;
            }
            else if (target.className == "red") {
                console.log("you got in red")
                target.className = "gray";
                this.gray++;
                this.red--;
            }
        }
    },
    created() {
        fetch(url1)
            .then(r => r.json())
            .then(json => {
                //get longitude and latitude from first api
                console.log("Json for lonLat API: ", json);
                lat = json.latitude;
                lon = json.longitude;
                ip = json.ip;
                console.log("latitude: ", lat, " longitude: ", lon);
                header = document.getElementById("header");
                header.innerHTML = `Looks like you're in ${json.city}, ${json.region_name} !!`


                // const url2 = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=51f91f98c566ad13192509668f6ff70b`
                let url2 = `http://${location.hostname}/api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=51f91f98c566ad13192509668f6ff70b&units=imperial`;
                let url3 = `http://${location.hostname}/api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=51f91f98c566ad13192509668f6ff70b&units=imperial`

                //use previously found long and lat in the new url to get current weather.
                fetch(url3)
                    .then(r => r.json())
                    .then(json => {
                        currWeatherHead = document.getElementById("currWeather");

                        var currWeather = json;
                        console.log("Current Weather Json:", currWeather);
                        currWeather = document.createElement("h2");

                        var todayLong = new Date();
                        var today = todayLong.toDateString();
                        var time = todayLong.toLocaleTimeString();

                        console.log("today is:", today);
                        var temp = json.main.temp;
                        console.log("the temp is: ", temp);
                        var humidity = json.main.humidity;
                        console.log("humidity: ", humidity);
                        var pressure = json.main.pressure;
                        console.log("pressure: ", pressure);
                        var skyCond = json.weather[0].description;
                        console.log(skyCond);

                        currWeatherHead.innerHTML = `It is currently: ${today}  at ${time}  <br />
            Temperature is: ${temp}° F <br />
            Humidity is: ${humidity}. <br />
            Pressure: ${pressure} Hpa. <br />
            Sky Conditions: ${skyCond}. <br />`

                    })

                //get future forecast and save it in the Vue instances weatherList
                fetch(url2)
                    .then(r => r.json())
                    .then(json => {
                        console.log("Json for Temp 5 day 3 hr: ", json);
                        console.log("first element in json list: ", json.list[0])
                        this.weatherList = json.list;
                        console.log("WeatherList:", this.weatherList);
                        this.loading = false;

                    })
            })

    }
});
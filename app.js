const yargs = require("yargs");
const geocode = require("./geocode/geocode.js");
const weather = require("./fetchWeatherData/weatherData.js");
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather app",
            string: true
        }
    })
    .help()
    .alias("help", "h")
    .argv;
geocode.geocodeAddress(argv.address, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage)
    } else {
        var fetchedData = weather.getWeather(result.latitude, result.longitude, (errorMessage, result) => {
            //console.log(result);
            var inCelcus = (result.currentWeather.temperature - 32) * 5 / 9;
            console.log("Today is shiny weather: " + Math.round(inCelcus));
        });

    }
});

//cbcf3d836a1183e409dcd62a653e3758
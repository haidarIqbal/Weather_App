const yargs = require("yargs");
const axios = require("axios");
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather app",
      string: true,
    },
  })
  .help()
  .alias("help", "h").argv;

var encodeAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://geocoder.api.here.com/6.2/geocode.json?app_id=APP_ID&app_code=APP_CODEQ&searchtext=${encodeAddress}`;

axios
  .get(geocodeURL)
  .then((success) => {
    var position =
      success.data.Response.View[0].Result[0].Location.DisplayPosition;
    var lat = position.Latitude;
    var lng = position.Longitude;
    var weatherURL = `https://api.darksky.net/forecast/API_KEY/${lat},${lng}`;
    return axios.get(weatherURL);
    //console.log(weatherURL);
    //console.log(JSON.stringify(success.data.Response.View[0].Result[0].Location.DisplayPosition, undefined, 2));
  })
  .then((response) => {
    console.log(response.data.currently);
  })

  .catch((e) => {
    console.log(e);
  });

const request = require("request");
getWeather = (lat, lng, callback) => {
  request(
    {
      uri: `https://api.darksky.net/forecast/API_KEY/${lat},${lng}`,
      json: true,
    },
    (error, resonse, body) => {
      callback(undefined, {
        currentWeather: body.currently,
      });
    }
  );
};

module.exports = {
  getWeather,
};

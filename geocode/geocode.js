console.log("at geo address");
const request = require("request");

geocodeAddress = (address, callback) => {
  var encodeAddress = encodeURIComponent(address);
  request(
    {
      url: `https://geocoder.api.here.com/6.2/geocode.json?app_id=APP_ID&app_code=APP_CODE&searchtext=${encodeAddress}`,
      json: true,
    },
    (error, response, body) => {
      //console.log(JSON.stringify(response, undefined, 2));
      if (body.view == "") {
        callback("Invalid Address");
      } else {
        var position = body.Response.View[0].Result[0].Location.DisplayPosition;
        callback(undefined, {
          latitude: position.Latitude,
          longitude: position.Longitude,
        });
      }
    }
  );
};

module.exports = {
  geocodeAddress,
};

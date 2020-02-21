const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/de63455d849531b5662532713738628d/${latitude},${longitude}?unit=si`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to forecast service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = response.body;

      callback(
        undefined,
        data.daily.data[0].summary +
          " The temperature is " +
          data.currently.temperature +
          " and there is " +
          data.currently.precipProbability * 100 +
          "% chance of rain"
      );
    }
  });
};

module.exports = forecast;

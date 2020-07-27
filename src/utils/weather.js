const axios = require("axios").default;

const mapboxKey =
  "pk.eyJ1Ijoicm9nZXJ3aWJyZXciLCJhIjoiY2tjanlrc3E0MTFhNTJyczVtNHM3ZWVobCJ9.vEJnyDqxF2a48nnO3kB0Ww";

const weatherKey = "3e9a1d47da46da99d3cb88e791ad55dc";

const GeoCodeUrl = (location) => {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxKey}`;
};
const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=`;
let place;

const getWeather = (location) => {
  const locale = GeoCodeUrl(location);

  return axios
    .get(locale)
    .then((response) => {
      if (response.data.features.length === 0) {
        const message = "Error - Could not find location.  Try another.";
        return Promise.reject({ error: message });
      }
      const feature = response.data.features[0];
      place = feature.place_name;
      const long = feature.center[0];
      const latt = feature.center[1];
      return axios.get(`${weatherStackUrl}${latt},${long}`);
    })
    .then((response) => {
      return { weather: response.data.current, place: place };
    })
    .catch((error) => {
      return error;
    });
};

module.exports = getWeather;

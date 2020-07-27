const weatherForm = document.getElementById("weather-form");
const weatherButton = document.getElementById("weather-submit");
const resultsBox = document.getElementById("results-box");
const weatherText = document.getElementById("weather-text");
const weatherIcon = document.getElementById("weather-icon");

async function fetchWeather(location) {
  let response = await fetch(`/weather?address=${location}`);
  let data = await response.json();
  return data;
}
const displayWeather = (data) => {
  if (data.error) {
    weatherText.innerText = data.error;
  } else {
    // Get data from Object

    const place = data.place;
    const image = data.weather.weather_icons[0];
    const weather_disc = data.weather.weather_descriptions[0];
    const temperature = data.weather.temperature;
    const windSpeed = data.weather.wind_speed;
    const windDirection = data.weather.wind_dir;
    // set up html string

    const htmlString = `<p>The weather in ${place} is ${weather_disc} with a temperature of ${temperature} degrees C. The wind speed is ${windSpeed} mph and is in the direction ${windDirection} </p>`;
    const icon = `<img src=${image} alt="Weather Icon Missing">`;
    // Append to Div elmeent in dom.

    weatherText.innerHTML = htmlString;
    weatherIcon.innerHTML = icon;
  }
};

weatherButton.addEventListener("click", (e) => {
  e.preventDefault();
  const location = weatherForm.value;
  fetchWeather(location).then((data) => displayWeather(data));
  console.log("clicked");
});

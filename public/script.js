// script.js

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  fetchWeather(city);
});

function fetchWeather(city) {
  fetch(`/weather?city=${city}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
        return;
      }
      displayWeather(data);
    })
    .catch((error) => console.error("Error:", error));
}

function displayWeather(data) {
  document.getElementById(
    "city"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("date").textContent = new Date().toLocaleDateString();
  document.getElementById("temp").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.getElementById(
    "weather-icon"
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("weather-icon").alt = data.weather[0].description;
  document.getElementById("description").textContent =
    data.weather[0].description;

  document.querySelector(".weather-display").style.display = "block";
}

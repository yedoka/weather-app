const btn = document.getElementById("btn");
const cityInput = document.getElementById("city");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const weatherImage = document.getElementById("weather-image");
const details = document.getElementById("details");

const APIKey = "";

btn.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${APIKey}`
    );

    if (!response.ok) {
      alert("City not found");
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(`API response with error code ${data.cod}`);
    }

    cityName.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    details.innerHTML = `<p class="col-6 text-center">Humidity: ${data.main.humidity}%</p><p class="col-6 text-center">Wind: ${data.wind.speed}m/s</p>`;
    if (data.weather[0].main === "Rain") {
      weatherImage.innerHTML = `<img src="./assets/rain.png" alt="Rain">`;
    } else if (data.weather[0].main === "Snow") {
      weatherImage.innerHTML = `<img src="./assets/snow.png" alt="Snow">`;
    } else if (data.weather[0].main === "Clouds") {
      weatherImage.innerHTML = `<img src="./assets/clouds.png" alt="Clouds">`;
    } else if (data.weather[0].main === "Mist") {
      weatherImage.innerHTML = `<img src="./assets/mist.png" alt="Mist">`;
    } else if (data.weather[0].main === "Clear") {
      weatherImage.innerHTML = `<img src="./assets/clear.png" alt="Clear">`;
    }
  } catch (error) {
    console.error(error);
  }
});

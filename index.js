
const inputBox = document.querySelector(".inputBox");
const searchBtn = document.querySelector(".searchBtn");
const weatherDetails = document.querySelector(".weather-details");
const apiKey = "ecd728777e9dc04d7bbc7c064f64fc66";

searchBtn.addEventListener("click", async () => {
    
    const city = inputBox.value.trim();

    if (city) {

        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } 
        catch(error){
            console.error(error);
            displayError("Could not fetch weather data...");
        }

    } 
    else {
        displayError("Please enter a city...");
    }
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description }] } = data;

    weatherDetails.textContent = "";
    weatherDetails.style.display = "flex";

    const cityDisplay = document.createElement("p");
    const tempDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    descDisplay.textContent = description;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    descDisplay.classList.add("descDisplay");
    humidityDisplay.classList.add("humidityDisplay");

    weatherDetails.appendChild(cityDisplay);
    weatherDetails.appendChild(tempDisplay);
    weatherDetails.appendChild(descDisplay);
    weatherDetails.appendChild(humidityDisplay);
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    weatherDetails.textContent = "";
    weatherDetails.style.display = "flex";
    weatherDetails.appendChild(errorDisplay);
}

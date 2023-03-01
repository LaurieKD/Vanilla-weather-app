function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let day = days[date.getDay()];
	return `${day}, ${hours}:${minutes}`;
}

function displayForecast(response) {
	console.log(response.data.daily);
	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	let days = ["Wed", "Thu", "Fri"];
	days.forEach(function (day) {
		forecastHTML =
			forecastHTML +
			` 
            <div class="col-2">
              <div class="weather-forecast-date" >
              ${day}
              </div>
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" alt="sunny" class="icon-forecast">
              <div class="weather-forecast-temp"><span class="warm">18</span><span class="cold"> 12</span> </div>
            </div>
`;
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
	console.log(response.data);
	let temperatureElement = document.querySelector("#temperature");
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let dayElement = document.querySelector("#day");
	let iconElement = document.querySelector("#icon");

	celsiusTemperature = response.data.temperature.current;
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
	cityElement.innerHTML = response.data.city;
	descriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = response.data.temperature.humidity;
	windElement.innerHTML = response.data.wind.speed;
	dayElement.innerHTML = formatDate(response.data.time * 1000);
	iconElement.setAttribute("src", response.data.condition.icon_url);
	iconElement.setAttribute("alt", response.data.condition.icon);
}

function search(city) {
	let apiKey = "2335b3c82b10f0343t05f9bo28bfaca3";
	let apiUrlCity = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
	let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
	axios.get(apiUrlCity).then(displayTemperature);
	axios.get(apiUrlForecast).then(displayForecast);
	console.log(apiUrlForecast);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");
	search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("The Hague");

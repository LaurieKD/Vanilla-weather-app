function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		minutes = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let day = days[date.getDay()];
	return `${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
	console.log(response.data);
	let temperatureElement = document.querySelector("#temperature");
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let dayElement = document.querySelector("#day");
	temperatureElement.innerHTML = Math.round(response.data.temperature.current);
	cityElement.innerHTML = response.data.city;
	descriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = response.data.temperature.humidity;
	windElement.innerHTML = response.data.wind.speed;
	dayElement.innerHTML = formatDate(response.data.time * 1000);
}

let city = "The Hague";
let apiKey = "2335b3c82b10f0343t05f9bo28bfaca3";
let apiUrlCity = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
let apiUrlCoord = `https://api.shecodes.io/weather/v1/current?lon={lon}&lat={lat}&key=${apiKey}&units=metric`;

console.log(apiUrlCity);

axios.get(apiUrlCity).then(displayTemperature);

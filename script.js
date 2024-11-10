

const weatherForm = document.querySelector(".weatherForm");
// If there are multiple classes with the above class name then
// use querySelectorAll so that it will all the elements with this class name
// querySelector will select the first element with this class name
// As i have only one element with this class name i used querySelector

const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

// Before using this api key, activate it in the openweathermap.org website
const apiKey = "0ec369e305b03bef5a8f935ac316e5e1";

weatherForm.addEventListener("submit", async event => {

    // Forms have default behaviour to refresh the page
    // We prevent that by using the below function
    event.preventDefault(); 

    const city = cityInput.value;

    if(city){

        // We use try and catch to avoid any type of errors
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Plaese enter a city");
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // fetch returns a promise so we need to use await
    const response = await fetch(apiUrl);
    
    // if city name is not found or not a correct city
    if(!response.ok){
        // As you know .ok returns true or false based on the 
        // request to the api

        throw new Error("Could not fetch weather data");
    }

    // if response is ok
    return await response.json();
}

function displayWeatherInfo(data){

    // Here the data is in json format
    // As getWeatherData returns response.json() to weatherData in eventListener
    // and in eventlistener we pass the weatherData to this function
    

    // Here we object destructuring and array destructuring
    // The name, main, weather are in the data
    // You can display the data and check the details
    // In main we need temp, humidity
    // Similarly to weather but in data json file 
    // the weather is an array of objects so we used array destructuring

    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    // These are the html elments
    // These were not persent in Html file but
    // the cityDisplay, tempDisplay, humidityDisplay, descDisplay and weatherEmoji
    // are the classes which were styled using css (we use the same names for varisbles)
    // So we will create the html elements here
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    //toFixed is used to set the decimal places
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    // For Farenheit tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDispay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){

    // Weather can be known based on the id
    // Visit openweathermap.org/weather-conditions to know 
    // which id maps to which condition

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌁";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";

    // Here we are adding p tag to the card div
    card.appendChild(errorDisplay);
}
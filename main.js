'use strict';
function changeTimeFormat() {
    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const yearmonth = ["january","February","March","April","May","June","July","August","September","October","November","December"]
    let date = new Date();
    let monthDate = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = weekday[date.getDay()];
    let month = yearmonth[date.getMonth()];

    


    // Check whether AM or PM
    let newformat = hours >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let weatherTime = document.querySelector(".weather-time");
        weatherTime.innerHTML=`
            <h1 class="m-0">${hours}:${minutes}<span>${newformat}</span></h1>
            <p class="m-0 fw-semibold">${day} ${month} ${monthDate}</p>
        `;
}

changeTimeFormat();

const searchBox=document.querySelector(".location-input>div>input");
const searchBtn = document.querySelector(".location-input>button");
const tempreture = document.querySelector(".tempreture>p");
const humidity = document.querySelector(".wheater-humidity>p");
const humidityDesc = document.querySelector('.weather-bottom>div:nth-child(1)>p');
const windSpeed = document.querySelector(".weather-wind-speed>p");
const windSpeedDesc = document.querySelector('.weather-bottom>div:nth-child(2)>p');
const description = document.querySelector(".weather-desc>p");
async function checkweather(city){
    const api_key = "7779f277daf41ef813627ec380aa68cf";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Please Enter Correct City Name');
        }

        const weather_data = await response.json();
        console.log(weather_data);

        tempreture.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C <span class="fs-3 text-yellow">${weather_data.name.toUpperCase()}</span>`;
        description.innerText = `${weather_data.weather[0].description}`;

        humidity.innerHTML=`${weather_data.main.humidity}%`;
        humidityDesc.innerText=`Humidity`;
        windSpeed.innerHTML = `${weather_data.wind.speed} <span class="fs-4">km/h</span>`;
        windSpeedDesc.innerText=`Wind Speed`;
    }
    catch (error) {
        alert("message: "+error.message);
    }
}
searchBtn.addEventListener('click',()=>{
    checkweather(searchBox.value);
});
searchBox.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
            checkweather(searchBox.value);
    }
});

/********************loader-js-part********************/
// Wait for the window to load
window.addEventListener('load', () => {
    const loaderWrapper = document.querySelector('.loader-wrapper');

    // Add the fade-out class to start the transition
    loaderWrapper.classList.add('fade-out');

    // Remove the loader from the DOM after the transition ends
    loaderWrapper.addEventListener('transitionend', () => {
        loaderWrapper.remove();
    });
});


/******************pageonload-animation-js**********************/
document.addEventListener("DOMContentLoaded", function() {
    const fadeIns = document.querySelectorAll('.fade-in');
    fadeIns.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.classList.add('animate');
    });
});

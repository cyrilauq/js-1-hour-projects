const search_city_form = document.getElementById('search_city_form');
const city_name = document.getElementById('city_name');
const search_btn = document.getElementById('search_btn');
const display_view = document.getElementById('display_view');
const body = document.getElementsByTagName('body').item(0);

const API_KEY = '54eba87b601fa33f3fc31c339939a1b8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

search_city_form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if(validCity(city_name.value)) {
        const coordinates = await getCityCoordinates(city_name.value);

        if(coordinates.lat === -1 || coordinates.lon === -1) {
            display_view.style.display = 'block';
            body.style.backgroundColor = '#197DEE25';
            body.style.backgroundImage = '';
            display_view.innerHTML = `
                <p>No info found for the given city.</p>
                <p>Check the ortographe or if it really exists</p>
            `;
            return;
        }

        await fetch(`${BASE_URL}lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${API_KEY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`[${response.status}]: ${response.statusText} `)
                }
                return response
            })
            .then(result => result.json())
            .then(data => {
                console.log(data);
                if(data.weather[0].main === 'Rain') {
                    body.style.backgroundImage = 'url(img/rain.jpg)';
                }
                else if(data.weather[0].main === 'Snow') {
                    body.style.backgroundImage = 'url(img/rain.jpg)';
                }
                else if(data.weather[0].main === 'Clouds') {
                    body.style.backgroundImage = 'url(img/cloud.webp)';
                }
                else if(data.weather[0].main === 'Hot') {
                    body.style.backgroundImage = 'url(img/hot.jpg)';
                }
                display_view.style.display = 'block';
                display_view.innerHTML = `
                    <h2>${data.name}</h2>
                    <div>
                        <h3>Global infos</h3>
                        <p>Weather: ${data.weather[0].main}</p>
                        <p>Description</p>
                        <p>${data.weather[0].description}</p>
                    </div>
                    <div>
                        <h3>Temperatures infos+</h3>
                        <p>Min: ${data.main.temp_min}</p>
                        <p>Min: ${data.main.temp_max}</p>
                    </div>
                `;
            })
            .catch();
    }
});

city_name.addEventListener('change', (event) => {
    if(!validCity(event.target.value)) {
        search_btn.getAttribute("disabled", "true");
    }
});

function validCity(city_name) {
    return city_name.trim().length > 0;
}

async function getCityCoordinates(city_name) {
    return fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city_name}&count=1`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`[${response.status}] : ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const results = data.results;
            let result;
            if(results.length > 0) {
                let first = results[0];
                result = { 
                    lat: parseFloat(first.latitude), 
                    lon: parseFloat(first.longitude), 
                    timezone: first.timezone,
                    name: first.name,
                    countryCode: first.country_code,
                    temp: 0,
                    weather: ''
                };
            }
            return result;
        })
        .catch(error => {
            console.log(error);
            return { lat: -1, lon: -1 };
        });
}
async function getCoordinates(city) {
    return await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=${RESULT_COUNT_LIMIT}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error(`[${response.status}] : ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const results = data.results;
                let result;
                if(results.length > 0) {
                    let first = results[0];
                    result = { 
                        lat: parseFloat(first.latitude), 
                        lon: parseFloat(first.longitude), 
                        timezone: first.timezone,
                        name: first.name,
                        countryCode: first.country_code,
                        temp: 0,
                        weather: ''
                    };
                }
                return result;
            })
}
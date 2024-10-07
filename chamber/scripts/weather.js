const weatherData = document.querySelector("#weather-data");
const weatherIcon = document.querySelector("#weather-icon");
const weatherForecast = document.querySelector("#weather-forecast");

const lat = -37.92;
const lon = 175.97;
const key = "c5647d83bb1c1b2875740411edf17c8f";
const urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
const urlFiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`

async function apiFetchCurrentWeather() {
    try {
        const response = await fetch(urlCurrentWeather);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }    
}

const displayResults = (data) => {
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    weatherIcon.setAttribute("alt", `${data.weather[0].description} weather icon`);

    const options = { timeStyle: 'short', timeZone: 'Pacific/Auckland'};
    let sunriseTime = new Date(Number(data.sys.sunrise)*1000).toLocaleString('en-NZ',options);
    let sunsetTime = new Date(Number(data.sys.sunset)*1000).toLocaleString('en-NZ',options);
    weatherData.innerHTML = `<p><strong>${data.main.temp}°</strong> C</p>
                        <p>High: ${data.main.temp_max}°</p>
                        <p>Low: ${data.main.temp_min}°</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Sunrise: ${sunriseTime}</p>
                        <p>Sunset: ${sunsetTime}</p>
                        <p>Coordinates: ${lat},${lon}</p>`;

}

async function apiFetchForecast() {
    try {
        const response = await fetch(urlFiveDayForecast);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }    
}

const formatDate = (date = new Date(), tz) => {
    const year = date.toLocaleString('default', {year: 'numeric', timeZone: tz});
    const month = date.toLocaleString('default', {month: '2-digit', timeZone: tz});
    const day = date.toLocaleString('default', {day: '2-digit', timeZone: tz});
  
    return [year, month, day].join('-');
  }

const processForecastData_old = (json) => {
    const options = { weekday: 'long', timeZone: 'Pacific/Auckland'};
    let output = [];
    json.list.forEach(element => {
        let date = formatDate(new Date(Number(element.dt)*1000),'Pacific/Auckland');
        if(!(date in output)) {
            output[date] = {};
            output[date]['weekday'] = new Date(Number(element.dt)*1000).toLocaleString('en-NZ', options);
            output[date]['temp'] = element.main.temp;
            output[date]['sum'] = element.main.temp;
            output[date]['count'] = 1;
        } else {
            output[date].sum += element.main.temp;
            output[date].count += 1;
            output[date].temp = output[date].sum / output[date].count;
        }
    });
    return output;
}

const processForecastData = (json) => {
    const options = { weekday: 'long', timeZone: 'Pacific/Auckland'};
    let dateList = [];
    let tempSum = [];
    let tempCount = [];
    let tempAverages = [];
    let weekdays = [];
    let output = [];
    json.list.forEach(element => {
        let date = formatDate(new Date(Number(element.dt)*1000),'Pacific/Auckland');
        if(dateList.includes(date)) {
            let index = dateList.indexOf(date);
            tempSum[index] += element.main.temp;
            tempCount[index] += 1;
            tempAverages[index] = tempSum[index] / tempCount[index];
        } else {
            dateList.push(date);
            tempSum.push(element.main.temp);
            tempCount.push(1);
            tempAverages.push(element.main.temp)
            weekdays.push(new Date(Number(element.dt)*1000).toLocaleString('en-NZ', options));
        }
    });
    output[0] = {};
    output[1] = {};
    output[2] = {};
    output[0].day = 'Today';
    output[1].day = weekdays[1];
    output[2].day = weekdays[2];
    output[0].temp = tempAverages[0];
    output[1].temp = tempAverages[1];
    output[2].temp = tempAverages[2];
    return output;
};

const displayForecast = (data) => {
    const dataSummary = processForecastData(data);
    let counter = 0;
    weatherForecast.innerHTML = '';
    dataSummary.forEach(element => {
        let newP = document.createElement('p');
        newP.innerHTML = `${element.day}: <strong>${element.temp.toFixed(0)} °C</strong>`;
        weatherForecast.appendChild(newP);
    });
}

apiFetchCurrentWeather();
apiFetchForecast();

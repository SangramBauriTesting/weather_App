function CurrentWeatherUI (currentData)
{

const city=document.querySelector('.city');
const currentImg = document.querySelector('.current-weather-img');
const currentCondi = document.querySelector('.current-weather-condi');
const currentDate = document.querySelector('.current-date');
const currentTemp = document.querySelector('.current-temp');
//create another current card
const cityName =  currentData.name;
city.innerHTML=`${cityName}`;
//current weather image 
const currIcon = currentData.weather[0].icon;
const currDescription = currentData.weather[0].description;
const currCondi = currentData.weather[0].main;
const currdate = new Date().toDateString();
const currTemp=currentData.main.temp;
currentImg.src = `https://openweathermap.org/img/wn/${currIcon}@4x.png`;
currentImg.alt = currDescription;
currentCondi.innerHTML=currCondi;
currentDate.innerHTML=currdate;
currentTemp.innerHTML=`${Math.round(currTemp)}<sup>°C</sup>`;
const currAnotherPercentage = document.createElement('h5');
const currAnotherWeather = document.createElement('h5');
const currAnotherData = document.querySelector('.current-anthoer-data').children;
const arrCurrAnotherData =Array.from(currAnotherData);

for (let index = 0; index < arrCurrAnotherData.length; index++) {
  
  if(index==0)
  {
   currAnotherData[0].children[1].innerHTML=`${currentData.main.humidity}%`;
   currAnotherData[0].children[2].innerHTML="Humidity";
  }
  if(index==1)
  {
    currAnotherData[1].children[1].innerHTML=`${currentData.wind.speed}`;
   currAnotherData[1].children[2].innerHTML="Wind";
  }
   if(index==2)
  {
    currAnotherData[2].children[1].innerHTML=`${100 - currentData.clouds.all}%`;
   currAnotherData[2].children[2].innerHTML="Sunny";
  }
  
}
}

function getWeatherIcon(description) {
  description = description.toLowerCase();

  if (description.includes("clear sky")) {
    return "https://openweathermap.org/img/wn/01d@4x.png";
  } else if (description.includes("few clouds")) {
    return "https://openweathermap.org/img/wn/02d@4x.png";
  } else if (description.includes("scattered clouds")) {
    return "https://openweathermap.org/img/wn/03d@4x.png";
  } else if (description.includes("broken clouds") || description.includes("overcast clouds")) {
    return "https://openweathermap.org/img/wn/04d@4x.png";
  } else if (description.includes("shower rain")) {
    return "https://openweathermap.org/img/wn/09d@4x.png";
  } else if (description.includes("rain")) {
    return "https://openweathermap.org/img/wn/10d@4x.png";
  } else if (description.includes("thunderstorm")) {
    return "https://openweathermap.org/img/wn/11d@4x.png";
  } else if (description.includes("snow")) {
    return "https://openweathermap.org/img/wn/13d@4x.png";
  } else if (description.includes("mist")) {
    return "https://openweathermap.org/img/wn/50d@4x.png";
  } else {
   
    return "https://openweathermap.org/img/wn/01d@4x.png";
  }
}


function getTime(hour)
{ 

    if(hour[0]==0 && hour[1]!=0)
    {
    return hour;
    }

    if(hour > 12)
    {
    hour=hour-12;  
    return hour;
    }
    if(hour==12 )
    { 
    return hour;
    }
    if(hour[0]==0 && hour[1]==0)
    {
    return 12;
    }



}


function ForecastWeatherUI(data) {
  // Clear previous hourly forecast
  const today_weather_info = document.querySelector('.today-weather-info');
  today_weather_info.innerHTML = "";

  // Clear previous 4-day forecast
  const Fourday_weather_info = document.querySelector('.Fourday-weather-info');
  Fourday_weather_info.innerHTML = "";

  // hourly forecast (first 10 entries)
  const few_hour_report = data.list;
  for (let index = 0; index < 10; index++) {
    const report = few_hour_report[index];
    if (!report) continue;

    const description = report.weather[0].description;
    const imgLink = getWeatherIcon(description);

    const timeDateSplit = report.dt_txt.split(' ');
    const timeArr = timeDateSplit[1].split(':').slice(0,2);
    const weather_at_time = `${getTime(timeArr[0])}:${timeArr[1]}`;

    const weather_at_temp = report.main.temp;

    const today_weather_info_card = document.createElement('div');
    today_weather_info_card.className = "today-weather-info-card";

    const img = document.createElement('img');
    img.className = "today-small-card";
    img.src = imgLink;

    const time = document.createElement('h5');
    time.className = "current-another-condi-info";
    time.textContent = weather_at_time;

    const temp = document.createElement('h5');
    temp.className = "current-another-condi-info condition";
    temp.innerHTML = `${weather_at_temp}<sup>°C</sup>`;

    today_weather_info_card.appendChild(img);
    today_weather_info_card.appendChild(time);
    today_weather_info_card.appendChild(temp);

    today_weather_info.appendChild(today_weather_info_card);
  }

  // future data logic
  const now = new Date();
  const futData = data.list.filter(item => new Date(item.dt_txt) > now);

  function weatherDay(data) {
    const arr = [];
    const todayDate = new Date().getDate();
    let count = 1;
    let track = 4;

    for (let index = 0; index < 4; index++) {
      let obj = [];
      for (const element of data) {
        const date = new Date(element.dt_txt).getDate();
        if (date === todayDate + count && track !== 0) {
          obj.push(element);
        }
      }
      arr.push(obj);
      count++;
      track--;
    }
    return arr;
  }

  const Fourday_weather_arr = weatherDay(futData);

  for (let index = 0; index < 4; index++) {
    const dayInfoArr = Fourday_weather_arr[index];
    if (!dayInfoArr || dayInfoArr.length === 0) continue;

    const dayInfo = dayInfoArr[0]; // use first element of the day

    const description = dayInfo.weather[0].description;
    const imgLink = getWeatherIcon(description);
    const date_obj = new Date(dayInfo.dt_txt);
    const dayName = date_obj.toLocaleDateString("en-US", { weekday: "short" });

    const card = document.createElement("div");
    card.className = "Fourday-weather-info-card";

    const aboutWeather = document.createElement("div");
    aboutWeather.className = "about_weather";

    const img = document.createElement("img");
    img.className = "img-about-weather-4day";
    img.src = imgLink;
    img.alt = description;

    const condition = document.createElement("h5");
    condition.className = "about_weather_condi_headline_4day";
    condition.textContent = description;

    aboutWeather.appendChild(img);
    aboutWeather.appendChild(condition);

    const other = document.createElement("div");
    other.className = "about_weather_other";

    const day = document.createElement("p");
    day.className = "weather_at_day";
    day.textContent = dayName;

    const info = document.createElement("div");
    info.className = "weather_at_day_info";

    const temp = document.createElement("h5");
    temp.className = "weather_at_day_temp";
    temp.innerHTML = `${Math.round(dayInfo.main.temp)}<sup>°C</sup>`;

    const wind = document.createElement("h6");
    wind.className = "weather_at_day_wind";
    wind.textContent = `Wind: ${dayInfo.wind.speed}`;

    info.appendChild(temp);
    info.appendChild(wind);

    other.appendChild(day);
    other.appendChild(info);

    card.appendChild(aboutWeather);
    card.appendChild(other);

    Fourday_weather_info.appendChild(card);
  }
}


export {CurrentWeatherUI , ForecastWeatherUI};
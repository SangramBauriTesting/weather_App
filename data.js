//api call function 
//api call when user search by the city name

// async function getCurrentWeather() {
//     try {
      
//         const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=ee588b9efb46731108f936f990dd108a&units=metric');
//         console.log(res); // you can check status
//         const data = await res.json();
        
//         getCurrentWeatherData(data);
//         return data;
//     } catch (error) {
//         console.log("ERROR: " + error);
//     }
// }

// getCurrentWeather();
//---------------------------------------------------------------

//api call base on current location
async function getCurrentWeatherUsingCoordinate() {
    try {
      
        const position = await getCurrentPositionAsync();
       const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ee588b9efb46731108f936f990dd108a&units=metric`);
        console.log(response1); // you can check status
        const data = await response1.json();
        console.log("current data using geolocation ",data)
        const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ee588b9efb46731108f936f990dd108a&units=metric`);
        const forecast = await response2.json();
         
        return {
          current : data,
          anotherDayForecast : forecast
        }
    } catch (error) {
        console.log("ERROR: " + error);
    }
}





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












function anotherWeatherUI(data)
{
  const today_weather_info=document.querySelector('.today-weather-info');
  const few_hour_report = data.list;
  
  for (const index in few_hour_report) {
      
      const description = data.list[index].weather[0].description;
      const imgLink = getWeatherIcon(description);
  
      if(index ==10)
      {
      break;
      }
  
      const timeDateSplit = data.list[index].dt_txt.split(' ');
      const timeArr = timeDateSplit[1].split(':').slice(0,2);
  
      const weather_at_time = `${getTime(timeArr[0])}:${timeArr[1]}`
  
      const weather_at_temp = data.list[index].main.temp;
      const today_weather_info_card = document.createElement('div');
      today_weather_info_card.setAttribute('class','today-weather-info-card');
      const img = document.createElement('img');
      img.setAttribute('class','today-small-card');
      img.setAttribute('src',`${imgLink}`)
      const time=document.createElement('h5');
      time.setAttribute('class','current-another-condi-info');
      time.innerHTML=weather_at_time;
      const temp = document.createElement('h5');
      temp.setAttribute('class','current-another-condi-info condition');
      temp.innerHTML=`${weather_at_temp} <sup>°C</sup>`;
      today_weather_info_card.appendChild(img);
      today_weather_info_card.appendChild(time);
      today_weather_info_card.appendChild(temp);
      today_weather_info.appendChild(today_weather_info_card);
  
  }
  
  
  
  function getFutureData(data) {
    const now = new Date(); // current time
    const futureData = data.list.filter((item) => {
      const itemTime = new Date(item.dt_txt);
      return itemTime > now; // keep only future entries
    });
  
  return futureData;
  }
  
  
  const futData =getFutureData(data);
  let arr=[];
  
  function weatherDay(data, arr){
    let now  =  new Date().toLocaleDateString();
    const dayN= new Date(now).getDate();
   let count =1 ;
   let track=4;
    for (let index = 0; index < 4; index++) {
     let obj=[];
      for (const element of futData) {
           
          const date = new Date(element.dt_txt).getDate();
  
          if(date == dayN+count && track !=0 )
          { 
              obj.push(element); 
          }
         
      }
  
      arr.push(obj);
      count++;
      track--;
       
    }
  }
  
  weatherDay(futData,arr)
  
  console.log(arr);
  
  //=========================================================================
  
  const Fourday_weather_info=document.querySelector('.Fourday-weather-info');
  
  
  
  const Fourday_weather_arr = arr;
  
  
  
  
  for (let index = 0; index < 4; index++) {
   
    const dayInfo = (Fourday_weather_arr[index])[0];
    console.log(dayInfo)
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
  img.src = `${imgLink}`;  
  
  
  const condition = document.createElement("h5");
  condition.className = "about_weather_condi_headline_4day";
  condition.textContent = `${description}`; 
  
  aboutWeather.appendChild(img);
  aboutWeather.appendChild(condition);
  
  const other = document.createElement("div");
  other.className = "about_weather_other";
  
  
  const day = document.createElement("p");
  day.className = "weather_at_day";
  day.textContent = `${dayName}`;  
  
  
  const info = document.createElement("div");
  info.className = "weather_at_day_info";
  
  
  const temp = document.createElement("h5");
  temp.className = "weather_at_day_temp";
  temp.innerHTML = `${Math.round(dayInfo.main.temp)}<sup>°C</sup>`;  // dynamically
  
  
  const wind = document.createElement("h6");
  wind.className = "weather_at_day_wind";
  wind.textContent = `Wind : ${dayInfo.wind.speed}`;  
  
  info.appendChild(temp);
  info.appendChild(wind);
  
  other.appendChild(day);
  other.appendChild(info);
  
  
  card.appendChild(aboutWeather);
  card.appendChild(other);
  
  
  Fourday_weather_info.appendChild(card);
  
  
  
    
  }
  
}
















//when user search by city name
// function  getCurrentWeatherData(currentData)
// {  console.log("sd",currentData);
//     CurrentWeatherUI(currentData);
// }



function getCurrentPositionAsync() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }


(async ()=>{

 const response = await getCurrentWeatherUsingCoordinate();
 let currentData = response.current;
 let data = response.anotherDayForecast;
  CurrentWeatherUI(currentData);
  anotherWeatherUI(data);
})();   
















//function of logic

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

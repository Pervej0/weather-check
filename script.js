// giving geolocation access--
window.addEventListener("load", () => {
  let lat = 0;
  let long = 0;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords);
      lat = position.coords.latitude;
      long = position.coords.longitude;
      // lat and long base api
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=de790a621b5ea43fc9279b4a538d84db`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => setDefault(data));
    });
  }
});

// setDefaultHtml for dynamic forcast-
const setDefault = (info) => {
  // default weather condition-
  const { weather } = info;
  if (weather[0].main == "Clouds") {
    setInnerHtml(`https://openweathermap.org/img/wn/02d@2x.png`, info);
  } else if (weather[0].main == "Haze") {
    setInnerHtml(`./images/haze.png`, info);
  } else if (weather[0].main == "Rain") {
    setInnerHtml(`./images/rain.png`, info);
  } else {
    setInnerHtml(`https://openweathermap.org/img/wn/02d@2x.png`, info);
  }
};

const loadWeather = async () => {
  const inputDiv = document.getElementById("country-input");
  const inputResult = inputDiv.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputResult},&APPID=de790a621b5ea43fc9279b4a538d84db`;
  const res = await fetch(url);
  const data = await res.json();
  inputDiv.value = "";
  setLoadWeatherData(data);
};

const setInnerHtml = (url, info) => {
  const { name, main, weather, sys } = info;
  const weatherStatus = document.getElementById("weather-status");
  weatherStatus.innerHTML = `
    <img src="${url}" alt="" width="80"/>
      <h1>${name}</h1>
      <h3><span>${parseInt(main.temp - 273)}</span>&deg;C</h3>
      <h1 class="lead">${weather[0].main}</h1>`;
};

const setLoadWeatherData = (info) => {
  const { weather } = info;
  if (weather[0].main == "Clouds") {
    setInnerHtml(`https://openweathermap.org/img/wn/02d@2x.png`, info);
  } else if (weather[0].main == "Haze") {
    setInnerHtml(`./images/haze.png`, info);
  } else if (weather[0].main == "Rain") {
    setInnerHtml(`./images/rain.png`, info);
  } else {
    setInnerHtml(`https://openweathermap.org/img/wn/02d@2x.png`, info);
  }
  console.log(info);
};

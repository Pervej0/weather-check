// giving geolocation access--
window.addEventListener("load", () => {
  let lat = 0;
  let long = 0;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      // lat and long base api
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=de790a621b5ea43fc9279b4a538d84db&units=metric`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => setInnerHtml(data, true));
    });
  }
});

const loadWeather = async () => {
  const inputDiv = document.getElementById("country-input");
  const inputResult = inputDiv.value;
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputResult},&APPID=de790a621b5ea43fc9279b4a538d84db`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputResult}&appid=de790a621b5ea43fc9279b4a538d84db&units=metric
  `;
  const res = await fetch(url);
  const data = await res.json();
  inputDiv.value = "";
  setInnerHtml(data, false);
};

const setInnerHtml = (info, isReLoad) => {
  const { name, main, weather, sys } = info;
  const weatherStatus = document.getElementById("weather-status");
  if (isReLoad) {
    weatherStatus.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="" width="80"/>
      <h1>${sys.country}</h1>
      <h3><span>${main.temp}</span>&deg;C</h3>
      <h1 class="lead">${weather[0].main}</h1>`;
  } else {
    weatherStatus.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="" width="80"/>
      <h1>${name}</h1>
      <h3><span>${main.temp}</span>&deg;C</h3>
      <h1 class="lead">${weather[0].main}</h1>`;
  }
};

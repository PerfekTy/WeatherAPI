const form = document.querySelector("form"),
  card = document.querySelector(".card"),
  rainbow = document.querySelector(".rainbow"),
  details = document.querySelector(".details"),
  time = document.querySelector("img.time"),
  icon = document.querySelector(".icon img"),
  btn = document.querySelector(".button"),
  forecast = new Forecast();

const updateUI = data => {
  const city = data.cityDetails,
    weather = data.weather;

  //   update details template
  details.innerHTML = `<h5 class="my-3">${city.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>`;

  // update the night/day imgs & icons
  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSrc);

  let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  // remove d-none class
  if (
    rainbow.classList.contains("d-none") &&
    card.classList.contains("d-none")
  ) {
    rainbow.classList.remove("d-none");
    card.classList.remove("d-none");
  }
};

form.addEventListener("submit", e => {
  e.preventDefault();

  // get city value
  const city = form.city.value.trim();
  form.reset();

  // update ui with the city
  forecast
    .updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});

btn.addEventListener("click", e => {
  e.preventDefault();

  // get city value
  const city = form.city.value.trim();
  form.reset();

  // update ui with the city
  forecast
    .updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // set local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}

const form = document.querySelector("form"),
  card = document.querySelector(".card"),
  details = document.querySelector(".details"),
  time = document.querySelector("img.time"),
  icon = document.querySelector(".icon img");

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
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async city => {
  const cityDetails = await getCity(city),
    weather = await getWeather(cityDetails.Key);

  return { cityDetails, weather };
};

form.addEventListener("submit", e => {
  e.preventDefault();

  // get city value
  const city = form.city.value.trim();
  form.reset();

  // update ui with the city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});

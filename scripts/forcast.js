const key = "vU2r4TnPqRhAQOsOY5LsTt29MjF4abFe";

// get weather info
const getWeather = async locationId => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/",
    query = `${locationId}?apikey=${key}`,
    response = await fetch(base + query),
    data = await response.json();

  return data[0];
};

// get city info
const getCity = async city => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search",
    query = `?apikey=${key}&q=${city}`,
    response = await fetch(base + query),
    data = await response.json();

  return data[0];
};

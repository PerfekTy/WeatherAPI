class Forecast {
  constructor() {
    this.key = "vU2r4TnPqRhAQOsOY5LsTt29MjF4abFe";
    this.weatherURL =
      "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURL =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }

  async updateCity(city) {
    const cityDetails = await this.getCity(city),
      weather = await this.getWeather(cityDetails.Key);

    return { cityDetails, weather };
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`,
      response = await fetch(this.cityURL + query),
      data = await response.json();

    return data[0];
  }

  async getWeather(locationId) {
    const query = `${locationId}?apikey=${this.key}`,
      response = await fetch(this.weatherURL + query),
      data = await response.json();

    return data[0];
  }
}

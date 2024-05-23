import axios from 'axios';
import Weather from './weatherModel';

const rapidApiKey = 'b7d7cb7916msh9dafbdfdab675a2p11fec6jsn75446ac15178';  
const weatherURL = 'https://weatherapi-com.p.rapidapi.com/current.json';


async function getCoords(city: string, country: string) {                                // snippet used from the api website
    const coordKey = 'syF7epMSCTsIuKRtzHbfvuEFREF3D89EhXsAxzN6'; 
  const coordUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}&X-Api-Key=${coordKey}`;

  try {
    const response = await axios.get(coordUrl);

    if (response.status === 200) {
        console.log(response)
        console.log(response.data)
      const { latitude, longitude } = response.data[0];
      return { latitude, longitude };
    } else {
      throw new Error(`Failed to fetch coordinates. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw new Error('Failed to fetch coordinates');
  }
}

async function getWeather(latitude: number, longitude: number) {
  const options = {
    method: 'GET',
    url: weatherURL,
    params: { q: `${latitude},${longitude}` },
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw new Error('Failed to fetch weather data');
  }
}

async function saveWeather(city: string, country: string) {
    console.log(city,country);
  try {
    const obj1 = await getCoords(city, country);

    console.log("\n\n\n\n\nresponse obj: ", obj1);

    // const { latitude, longitude } = await getCoords(city, country);
    const weather = await getWeather(obj1.latitude, obj1.longitude);

    const weatherData = {
      city,
      country,
      weather: weather.current.condition.text,
      longitude : obj1.longitude,
      latitude : obj1.latitude,
      time: new Date(),
    };

    await Weather.create(weatherData);
  } catch (error) {
    console.error('Error saving weather data:', error);
    throw new Error('Failed to save weather data');
  }
}

export { getWeather, saveWeather };


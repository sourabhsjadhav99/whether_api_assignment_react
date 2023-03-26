import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL, API_key } from "../Assets/Service"
function ForecastPage(props) {
  let { cityName } = useParams()
  console.log(cityName)

  let navigate = useNavigate()
  const [city, setCity] = useState()



  useEffect(() => {
    if (cityName) {
      const url = `${BASE_URL}?q=${cityName}&units=metric&${API_key}`
      axios.get(url).then((response) => {
        console.log(response.data)
        setCity(response.data);
      }).catch(error => {
        console.log(error);
      });
    }
  }, []);
  let currentdate = new Date();
  let datetime = `Last Sync:${currentdate.getDate()}/${currentdate.getMonth()+1}/${currentdate.getFullYear()} @ ${currentdate.getHours()} hours :${currentdate.getMinutes()} minutes`
  return (
    <div>

      {city && <div>
        <div>
          <h1>{city.name}</h1>
          <div><button onClick={() => { navigate(-1) }}>Back</button></div>
          <h1>{city.main.temp.toFixed()}°C</h1>
          <p>{datetime}</p>
          <p>Whether {city.weather[0].main}</p>
          <p>Whether {city.weather[0].description}</p>
        </div>
        <div>
          <p>Sunrise {city.sys.sunrise}</p>
          <p>Sunset {city.sys.sunset}</p>
        </div>
        <div>
          <p>Minimum temperature {city.main.temp_min.toFixed()}°C</p>
          <p>maximum temperature {city.main.temp_max.toFixed()}°C</p>
        </div>
        <div>
          <p>Ground Level {city.main.grnd_level} millibar</p>
          <p>Sea Level {city.main.sea_level} millibar</p>
        </div>
        <div>
          <p>Pressure {city.main.pressure} Pascal</p>
          <p>Humidity {city.main.humidity} Pascal</p>
          <p>Wind speed {city.wind.speed} km/h</p>
        </div>
        <div>
          <p>Latitide {city.coord.lat}°</p>
          <p>Longitude {city.coord.lon}°</p>
        </div>
      </div>}
    </div>
  )
}

export default ForecastPage

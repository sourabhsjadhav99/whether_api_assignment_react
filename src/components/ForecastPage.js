import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL, API_key } from "../Assets/Service"
import { RiTempHotLine  } from "react-icons/ri"
import { GiPressureCooker,GiWindSlap  } from "react-icons/gi"
import { WiHumidity,} from "react-icons/wi"
import { FcDown,FcUp} from "react-icons/fc"
import { BsSunrise,BsSunsetFill} from "react-icons/bs"
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
  let datetime = `Last Sync:${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} @ ${currentdate.getHours()} hours :${currentdate.getMinutes()} minutes`
  return (
    <div id='main-container-forecast'>
      <h1>Weather App</h1>
      {city && <div id='weather-container'>

        <div id='name-container'>
          <div>
            <h1>{city.name} <RiTempHotLine /></h1>
            <h1 id='temp'>{city.main.temp.toFixed()}°C</h1>
          </div>
          <div id='date-time'>  {datetime}</div>

        </div>

        <div id='weather-subcontainer'>
          <p>Whether <b>{city.weather[0].main}</b></p>
          <p>Whether <b>{city.weather[0].main}</b></p>
          <p>Whether description<b>{city.weather[0].description}</b></p>
          <p>Minimum temperature <b><FcDown/>{city.main.temp_min.toFixed()}°C</b></p>
          <p>maximum temperature <b><FcUp/>{city.main.temp_max.toFixed()}°C</b></p>
          <p>Feels like<b>{city.main.feels_like.toFixed()}°C</b></p>
          <p>Pressure <b><GiPressureCooker/>{city.main.pressure} mb</b></p>
          <p>Humidity <b><WiHumidity/>{city.main.humidity} %</b></p>
          <p>Wind speed <b><GiWindSlap/>{city.wind.speed} km/h</b></p>
          <p>Sunrise <b><BsSunrise/>{city.sys.sunrise}</b></p>
          <p>Sunset <b><BsSunsetFill/>{city.sys.sunset}</b></p>
          <p>Latitide <b>{city.coord.lat}°</b></p>
          <p>Longitude <b>{city.coord.lon}°</b></p>
          <p>Ground Level <b>{city.main.grnd_level} millibar</b></p>
          <p>Sea Level <b>{city.main.sea_level} millibar</b></p>
        </div>

        <div id='fav-det-btns'>
          <button id='back-btn' onClick={() => { navigate(-1) }}>Back</button>
        </div>
      </div>}



    </div>
  )
}

export default ForecastPage

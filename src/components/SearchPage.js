import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL, API_key, server_URL } from "../Assets/Service"
import { RiTempHotLine  } from "react-icons/ri"
import { GiPressureCooker,GiWindSlap  } from "react-icons/gi"
import { WiHumidity } from "react-icons/wi"
import { FcDown,FcUp} from "react-icons/fc"
function SearchPage() {
  const [search, setSearch] = useState()
  const [city, setCity] = useState(null)
  let navigate = useNavigate()

  let getData = (search) => {
    if (!search) { return }
    const url = `${BASE_URL}?q=${search}&units=metric&${API_key}`
    axios.get(url).then((response) => {
      console.log(response.data)
      setCity(response.data);
    }).catch(error => {
      console.log(error)
      if (error.message == "Request failed with status code 404") {
        alert("Enter valid city name")
      }
    });
  }

  useEffect(() => {
    getData(search)
  }, []);

  let handleClick = () => {
    getData(search)
    setSearch("")

  }
  let handleFavorite = (city) => {
    axios.post(`${server_URL}`, {
      city: city,
    }).then(() => {
      alert("Added in favorite city list")
    }).catch((error)=>{
      if(error.message=="Request failed with status code 404"){
        alert("Already in favorite list")
      }
    })
  }

  let currentdate = new Date();
  let datetime = `Last Sync:${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} @ ${currentdate.getHours()} hours :${currentdate.getMinutes()} minutes`


  return (
    <div id='main-container'>
      <h1>Weather App</h1>
      <div id="input-container">
     
        <input
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder='Search Cityname...'
          type="text" />

        <div id='search-back-btn'>
          <button className='btn' onClick={() => { handleClick(search) }}>search</button>
          <button className='btn' onClick={() => { navigate(-1) }}>Back</button>
        </div>
      </div>
      {city && <div id='weather-container'>

        <div id='name-container'>
          <div>
            <h1>{city.name}<RiTempHotLine /></h1>
            <h1 id='temp'>{city.main.temp.toFixed()}°C</h1>
          </div>
          <div id='date-time'>  {datetime}</div>

        </div>
        <div id='weather-subcontainer'>
          <p>Whether <b>{city.weather[0].main}</b></p>
          <p>Minimum temperature <b><FcDown/>{city.main.temp_min.toFixed()}°C</b></p>
          <p>maximum temperature <b><FcUp/>{city.main.temp_max.toFixed()}°C</b></p>
          <p>Pressure <b><GiPressureCooker/>{city.main.pressure} mb</b></p>
          <p>Humidity <b><WiHumidity/>{city.main.humidity} %</b></p>
          <p>Wind speed <b><GiWindSlap/>{city.wind.speed} km/h</b></p>
        </div>

        <div id='fav-det-btns'>
          <button className='fav-det-btn' onClick={() => { navigate(`/forecast/${city.name}`) }}>More Details</button>
          <button className='fav-det-btn' onClick={() => { handleFavorite(city.name) }}> Favorite</button>
        </div>
      </div>}


    </div>
  );
}

export default SearchPage;


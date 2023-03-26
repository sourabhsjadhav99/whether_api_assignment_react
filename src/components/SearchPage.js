import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./SearchPage.modules.css"
import { useNavigate } from 'react-router-dom'
import {BASE_URL,API_key, server_URL} from "../Assets/Service"

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
    }).then(()=>{
      alert("Added in favorite city list")
    })
  }




  return (
    <div id='main-container'>
      <div className="search">
        <input
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder='Search cityname...'
          type="text" />
        <button onClick={() => { handleClick(search) }}>search</button>
        <button onClick={() => { navigate(-1) }}>Back</button>
      </div>
      {
        !city ? <h2>No data</h2> :
          <div>
            <div><button id='fav-button' onClick={() => { handleFavorite(city.name) }}>favorite</button></div>
            <div>
              <h1>{city.name}</h1>
              <div><button onClick={() => { navigate(`/forecast/${city.name}`) }}>Details</button></div>
              <h1>{city.main.temp.toFixed()}°C</h1>
              <p>Whether {city.weather[0].main}</p>
        
            </div>

            <div>
              <p>Minimum temperature {city.main.temp_min.toFixed()}°C</p>
              <p>maximum temperature {city.main.temp_max.toFixed()}°C</p>
            </div>
            <div>
              <p>Pressure {city.main.pressure} Pascal </p>
              <p>Humidity {city.main.humidity} Pascal</p>
              <p>Wind speed {city.wind.speed} m/s</p>
            </div>

          </div>
      }


    </div>
  );
}

export default SearchPage;


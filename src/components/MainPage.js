import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, API_key, server_URL } from "../Assets/Service"
import { MdOutlineCancel } from "react-icons/md"
import {RiTempHotLine  } from "react-icons/ri"
import { GiPressureCooker,GiWindSlap  } from "react-icons/gi"
import { WiHumidity } from "react-icons/wi"
import { FcDown,FcUp} from "react-icons/fc"
function MainPage(props) {
    let lattitude = props.location.latitude;
    let longitude = props.location.longitude
    let navigate = useNavigate()
    const [city, setCity] = useState()
    let [favorite, setFavorite] = useState([])


    useEffect(() => {
        if (lattitude && longitude) {
            const url = `${BASE_URL}?lat=${lattitude}&lon=${longitude}&units=metric&${API_key}`
            axios.get(url).then((response) => {
                setCity(response.data);
            }).catch(error => {
                console.log(error);
            });
        }
    }, []);
    let getCity = () => {
        const url = `${server_URL}`
        axios.get(url).then((response) => {
            setFavorite(response.data);
        }).catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        getCity()

    }, []);

    function handleDelete(city) {
        axios
            .delete(`${server_URL}/${city}`)
            .then(() => {
                getCity()
            })

    }
    function handleFav(city) {
        axios
            .get(`${BASE_URL}?q=${city}&units=metric&${API_key}`)
            .then((response) => {
                setCity(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    let currentdate = new Date();
    let datetime = `Last Sync:${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} @ ${currentdate.getHours()} hours :${currentdate.getMinutes()} minutes`
    return (
        <div id='main-container'>
            <h1>Weather App</h1>
            <div id='input-container'>
                <input type="text"   placeholder='Search Cityname...' onClick={() => { navigate("/search") }} />
            </div>
            <div id='fav-container'>
                <div><b>Favorite cities</b></div>
                <div>
                    {favorite.slice(-5).map((data, index) => {
                        return <span key={data._id} id="fav-cities">
                            <span> <button id='fav-city' onClick={() => { handleFav(data.city) }}>{` ${data.city}`}</button></span>
                            <span> <button id='icon' onClick={() => { handleDelete(data.city) }}><MdOutlineCancel /></button></span>
                        </span>
                    })}
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
                    <p>Pressure <b><GiPressureCooker/>{city.main.pressure} mb </b></p>
                    <p>Humidity <b><WiHumidity/>{city.main.humidity} %</b></p>
                    <p>Wind speed <b><GiWindSlap/>{city.wind.speed} km/h</b></p>
                </div>

                <div><button className='btn' onClick={() => { navigate(`/forecast/${city.name}`) }}>More Details</button></div>
            </div>}
        </div>
    )
}

export default MainPage

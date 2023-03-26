import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import {BASE_URL,API_key, server_URL} from "../Assets/Service"
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
    return (
        <div>
            <div>
                <input type="text" onClick={() => { navigate("/search") }} />
            </div>
            <div>
                <p>favorite cities</p>
                {favorite.slice(-5).map((data, index) => {
                    return <span key={data._id}>
                        <span> <button className='icon ' onClick={() => { handleFav(data.city) }}>{` ${data.city}`}</button></span>
                        <span> <button className='icon ' onClick={() => { handleDelete(data.city) }}><AiFillDelete /></button></span>
                    </span>
                })}
            </div>
            {city && <div>
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
                    <p>Pressure {city.main.pressure} Pascal</p>
                    <p>Humidity {city.main.humidity} Pascal</p>
                    <p>Wind speed {city.wind.speed} m/s</p>
                </div>
            </div>}
        </div>
    )
}

export default MainPage

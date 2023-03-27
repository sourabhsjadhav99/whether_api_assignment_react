import React, { useEffect, useState } from 'react'
import MainPage from './MainPage';
function DisplayPage() {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: ""
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    })
  }, []);
  return (
    <div className="App">
      {location.latitude && location.longitude && <MainPage location={location} />}
    </div>
  );
}
export default DisplayPage;
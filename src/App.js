import './App.css';
import React from 'react'
import SearchPage from './components/SearchPage';
import ForecastPage from './components/ForecastPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './components/NoPage';
import DispalyPage from './components/DispalyPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DispalyPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/forecast/:cityName" element={<ForecastPage />} />
        <Route path="*" element={<NoPage />} />

      </Routes></BrowserRouter>


  )
}

export default App

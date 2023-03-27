import './App.css';
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
let DispalyPage = lazy(() => import('./components/DispalyPage'))
let ForecastPage = lazy(() => import('./components/ForecastPage'))
let SearchPage = lazy(() => import('./components/SearchPage'))
let NoPage = lazy(() => import('./components/NoPage'))
function App() {
  return (
    <div>
      <Suspense fallback={<h2 id='loading'>Loading....</h2>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DispalyPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/forecast/:cityName" element={<ForecastPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>

    </div>
  )
}

export default App

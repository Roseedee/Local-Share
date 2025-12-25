import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SharedProvider } from './contexts/SharedContext'

import App from './pages/App'
import Init from './pages/Init'
import NetworkError from './pages/NetworkError'

import "./style/index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SharedProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:id" element={<App />} />
          <Route path="/init/" element={<Init />} />
          <Route path="/error/network" element={<NetworkError />} />
        </Routes>
      </BrowserRouter>
    </SharedProvider>
  </React.StrictMode>,
)

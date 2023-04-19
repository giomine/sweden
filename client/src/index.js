import React from 'react'
import { createRoot } from 'react-dom/client'
import 'mapbox-gl/dist/mapbox-gl.css'
import './styles/main.scss'
import App from './App'

createRoot(document.getElementById('root')).render(<App />)
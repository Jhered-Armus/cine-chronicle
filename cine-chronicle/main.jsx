import ReactDOM from 'react-dom/client'
import React from 'react'
import './style.css'
import { App } from './public/App'

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

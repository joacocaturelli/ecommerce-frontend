import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter';
import '@fontsource/manrope';
import './styles/reset.css'
import './styles/variables.css'
import './styles/globals.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

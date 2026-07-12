import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter';
import '@fontsource/manrope';
import './styles/variables.css'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

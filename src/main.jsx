import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import App from './App.jsx'
import '@fontsource/inter';
import '@fontsource/manrope';
import './styles/reset.css'
import './styles/variables.css'
import './styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App /> 
    </Provider>
  </StrictMode>,
)

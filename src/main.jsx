import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Web3Provider } from './components/Web3Provider.jsx'
import "./App.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Web3Provider>
    <App/>
    </Web3Provider>
    
  </StrictMode>,
)

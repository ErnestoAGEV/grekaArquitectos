import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Links viejos de HashRouter (/#/project/x) pasan a /project/x
if (location.hash.startsWith('#/')) history.replaceState(null, '', location.hash.slice(1))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

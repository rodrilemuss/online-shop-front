import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './store/AuthContext.jsx';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

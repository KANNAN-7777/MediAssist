import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './context/AppContext.jsx'
import ToastProvider from './components/ToastProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <ToastProvider />
      <App />
    </AppProvider>
  </BrowserRouter>
)
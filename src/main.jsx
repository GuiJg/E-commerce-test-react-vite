import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ShopCartContextProvider } from '../contexts/ShopCartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ShopCartContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ShopCartContextProvider>
    </React.StrictMode>,
)

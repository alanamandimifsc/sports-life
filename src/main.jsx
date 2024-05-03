import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Routes } from './routes/Routes.jsx'
import './index.css'
import { UsuariosProvider } from './context/UsuariosContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UsuariosProvider>
    <RouterProvider router={Routes}>
    </RouterProvider>
  </UsuariosProvider>
)
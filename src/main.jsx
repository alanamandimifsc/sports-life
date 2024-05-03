import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Routes } from './routes/Routes.jsx'
import './index.css'
import { UsuariosProvider } from './context/UsuariosContext.jsx'
import { LugaresProvider } from './context/LugaresContex.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UsuariosProvider>
    <LugaresProvider>
      <RouterProvider router={Routes}>
      </RouterProvider>
    </LugaresProvider>
  </UsuariosProvider>
)
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from "react-router-dom"
import { Login } from './pages/Login'
import Header from './components/Header'

export function App() {
  return (
    <div className='App'>
      <Header />
      <Outlet />
    </div>
  );
}



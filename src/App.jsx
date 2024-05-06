
import './App.css'
import { Outlet } from "react-router-dom"
import Header from './components/Header'


export function App() {


  return (
    <div className='App'>
      <Header />
      <Outlet />
    </div>
  );
}



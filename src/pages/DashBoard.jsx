import React from 'react'
import { Link } from 'react-router-dom'

export const DashBoard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/placeList">Lista de locais</Link>
        </div>
    )
}
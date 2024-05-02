import React from 'react'
import { Link } from 'react-router-dom'
import { CardLugar } from '../components/CardLugar'
import CardUsuarios from '../components/CardUsuarios'

export const DashBoard = () => {
    return (
        <div>

            <CardUsuarios />
            <CardLugar />

        </div>
    )
}
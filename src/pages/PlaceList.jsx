import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CardLugar } from '../components/CardLugar'

export const PlaceList = () => {
    // const [places, setPlaces] = React.useState([])

    // useEffect(() => {
    //     fetch('http://localhost:3000/lugares')
    //         .then(response => response.json())
    //         .then(data => setPlaces(data))
    //         .catch(error => console.log('Erro ao buscar lugares:', error))
    // }, [])

    return (
        <div>
            <h1>Conheça as melhores dicas de lugar!</h1>
            <CardLugar />




        </div>
    )
}

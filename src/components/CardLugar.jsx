import { Link } from "react-router-dom";
import React, { useEffect } from 'react'
export function CardLugar() {

    const [places, setPlaces] = React.useState([])

    useEffect(() => {
        fetch('http://localhost:3000/lugares')
            .then(response => response.json())
            .then(data => setPlaces(data))
            .catch(error => console.log('Erro ao buscar lugares:', error))
    }, [])

    return (
        <div className="card">
            {!!places && places.map(place => (
                <div key={place.id}>
                    <h3 >{place.nome}</h3>
                    <p>{place.descricao}</p>
                    <p>Criado pelo usuario : {place.id_usuario}</p>
                    <p>Localização</p>
                    <p>Rua: {place.rua}<span> número: {place.numero}</span> </p>
                    <Link to={`/registerPlace/${place.id}`}>Editar</Link>
                </div>
            ))}

        </div>
    )
}
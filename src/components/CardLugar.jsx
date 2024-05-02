import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Typography, Button, Grid } from '@mui/material';

export function CardLugar() {

    const [places, setPlaces] = React.useState([]);
    const [user, setUser] = React.useState([]);
    const location = useLocation();

    useEffect(() => {
        fetch('http://localhost:3000/lugares')
            .then(response => response.json())
            .then(data => setPlaces(data))
            .catch(error => console.log('Erro ao buscar lugares:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/usuarios')
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.log('Erro ao buscar usuarios:', error));
    }, []);

    const deletar = (id) => {
        console.log(id);
        fetch(`http://localhost:3000/lugares/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                alert("Lugar removido com sucesso!");
                window.location.reload();
            })
            .catch(error => console.log('Erro ao deletar lugar:', error));
    };

    const getUserName = (id) => {
        const userFound = user.find(user => user.id === id);
        return userFound.nome;
    };

    return (
        <Grid container spacing={2}>
            {places.map(place => (
                <Grid item xs={12} key={place.id}>
                    <div className="card">
                        <Typography variant="h3">{place.nome}</Typography>
                        <Typography>{place.descricao}</Typography>
                        <Typography variant="subtitle1">Localização</Typography>
                        <Typography component="p">Rua: {place.rua} número: {place.numero} Estado: {place.estado}</Typography>
                        <Typography>Criado pelo usuário: {getUserName(place.id)}</Typography>
                        {location.pathname === '/placeList' && (
                            <>
                                <Link to={`/registerPlace/${place.id}`}>
                                    <Button variant="contained" color="primary">Editar</Button>
                                </Link>
                                <Button variant="contained" color="error" onClick={() => deletar(place.id)}>Deletar</Button>
                            </>
                        )}
                    </div>
                </Grid>
            ))}
        </Grid>
    );
}

export default CardLugar;

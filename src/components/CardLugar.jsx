import React, { useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Typography, Button, Grid } from '@mui/material';
import { LugaresContext } from '../context/LugaresContex';

export function CardLugar() {

    const [places, setPlaces] = React.useState([]);
    const [user, setUser] = React.useState([]);
    const location = useLocation();

    const { deletar } = useContext(LugaresContext);

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


    const getUserName = (id) => {
        const userFound = user.find(user => user.id === id);
        return userFound ? userFound.nome : 'Usuário não encontrado';
    };

    return (
        <Grid container spacing={2} sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
            {places.map(place => (
                <Grid item xs={12} sm={12} md={12} key={place.id}>
                    <div className="card" style={{ padding: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <Typography variant="h3">{place.nome}</Typography>
                        <img
                            src={place.imagem}
                            alt="Imagem do lugar"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        <Typography>{place.descricao}</Typography>
                        <Typography variant="subtitle1">Localização</Typography>
                        <Typography component="p">{place.rua} número: {place.numero} , {place.bairro}, {place.cidade} - {place.estado}</Typography>
                        <Typography variant='subtitle1'>Tipos de Atividades Praticadas</Typography>
                        {place.praticas_esportivas ? (
                            <ul>
                                {place.praticas_esportivas.map((pratica, index) => (
                                    <Typography component="p" key={index}>{pratica}</Typography>
                                ))}
                            </ul>
                        ) : (
                            <Typography component="p">Nenhuma atividade esportiva listada.</Typography>
                        )}
                        <Typography>Criado pelo usuário: {getUserName(place.id)}</Typography>
                        {/* Botões de edição e exclusão */}
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

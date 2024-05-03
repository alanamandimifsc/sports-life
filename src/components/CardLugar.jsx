import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Typography, Button, Grid } from '@mui/material';
import { UsuariosContext } from '../context/UsuariosContext';
import { LugaresContext } from '../context/LugaresContex';

export function CardLugar() {
    const { places, setPlaces } = useContext(LugaresContext);
    const { idUser } = useContext(UsuariosContext);
    const { lugares, deletaLugar } = useContext(LugaresContext);

    const location = useLocation();





    return (
        <Grid container spacing={2}>
            {lugares.map(place => (
                <Grid item xs={12} key={place.id}>
                    <div className="card">
                        <Typography variant="h3">{place.nome}</Typography>
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
                        <Typography>Criado pelo usuário: {idUser(place.id)}</Typography>
                        {location.pathname === '/placeList' && (
                            <>
                                <Link to={`/registerPlace/${place.id}`}>
                                    <Button variant="contained" color="primary">Editar</Button>
                                </Link>
                                <Button variant="contained" color="error" onClick={() => deletaLugar(place.id)}>Deletar</Button>
                            </>
                        )}
                    </div>
                </Grid>
            ))}
        </Grid>
    );
}

export default CardLugar;

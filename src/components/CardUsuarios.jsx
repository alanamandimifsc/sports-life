import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";

const CardUsuarios = () => {
    const [qtd, setQtd] = useState(0);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/usuarios');
                const users = response.data;
                let count = 0;
                users.forEach(user => {
                    if (user.logado === true) {
                        count++;
                    }
                });
                setQtd(count);
            } catch (error) {
                console.error('Error fetching usuarios:', error);
            }
        };

        fetchUsuarios();
    }, []);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/lugares');
                setPlaces(response.data);
            } catch (error) {
                console.error('Error fetching lugares:', error);
            }
        };

        fetchPlaces();
    }, []);

    return (
        <div>

            <h2>Usuários ativos: {qtd}</h2>
            <h2>Lugares Cadastrados: {places.length}</h2>
        </div>
    );
};

export default CardUsuarios;

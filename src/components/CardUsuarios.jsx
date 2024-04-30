import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

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

    useEffect(() => {
        if (places.length > 0) {
            const map = L.map('map').setView([51.505, -0.09], 13); // Define a posição inicial do mapa e o nível de zoom
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Adiciona camada de mapa base

            // Adicione marcadores aos locais de exercícios
            places.forEach(lugar => {
                L.marker([lugar.latitude, lugar.longitude]).addTo(map)
                    .bindPopup(`<b>${lugar.nome}</b><br>${lugar.descricao}`); // Define o popup com informações do local de exercício
            });
        }
    }, [places]);

    return (
        <div>

            <h2>Usuários ativos: {qtd}</h2>
            <h2>Lugares Cadastrados: {places.length}</h2>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>

        </div>
    );
};

export default CardUsuarios;

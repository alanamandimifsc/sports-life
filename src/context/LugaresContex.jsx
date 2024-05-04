import { createContext, useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Chart } from 'chart.js/auto';
import { UsuariosContext } from './UsuariosContext';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

export const LugaresContext = createContext();

export const LugaresProvider = ({ children }) => {
    const [lugares, setLugares] = useState([]);
    const [estadosMaisLocais, setEstadosMaisLocais] = useState({});
    const [tiposExercicios, setTiposExercicios] = useState({});
    // const [chartData, setChartData] = useState({});
    // const [chartType, setChartType] = useState('');
    // const [chartInstances, setChartInstances] = useState({});
    // const { qtdUsuariosAtivos } = useContext(UsuariosContext);




    useEffect(() => {
        const fetchLugares = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/lugares');
                const lugares = response.data;
                setLugares(lugares);

                const estadosCount = lugares.reduce((acc, lugar) => {
                    acc[lugar.estado] = acc[lugar.estado] ? acc[lugar.estado] + 1 : 1;
                    return acc;
                }, {});
                setEstadosMaisLocais(estadosCount);

                const tiposExerciciosCount = lugares.reduce((acc, lugar) => {
                    lugar.praticas_esportivas.forEach(pratica => {
                        acc[pratica] = acc[pratica] ? acc[pratica] + 1 : 1;
                    });
                    return acc;
                }, {});
                setTiposExercicios(tiposExerciciosCount);
            } catch (error) {
                console.error('Erro ao buscar lugares:', error);
            }
        };

        fetchLugares();
    }, []);

    useEffect(() => {
        if (lugares.length > 0) {
            geraMapa();

        }
    }, [lugares]);



    async function geraMapa() {
        try {
            const response = await Axios.get(`http://localhost:3000/lugares`);
            const place = response.data;
            if (place.length > 0) {
                const map = L.map('map').setView([-21.505, -40.09], 3);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

                place.forEach(lugar => {
                    L.marker([lugar.latitude, lugar.longitude]).addTo(map)
                        .bindPopup(`<b>${lugar.nome}</b><br>${lugar.descricao}`);
                });

            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }





    function deletaLugar(id) {
        Axios.delete(`http://localhost:3000/lugares/${id}`)
            .then(response => {
                setLugares(lugares.filter(lugar => lugar.id !== id));
            })
            .catch(erro => console.log(erro))
    }

    return (
        <LugaresContext.Provider value={{ lugares, estadosMaisLocais, tiposExercicios, geraMapa }}>
            {children}
        </LugaresContext.Provider>
    );
};
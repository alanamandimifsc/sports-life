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
    const [chartData, setChartData] = useState({});
    const [chartType, setChartType] = useState('');
    const [chartInstances, setChartInstances] = useState({});
    const { qtdUsuariosAtivos } = useContext(UsuariosContext);

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
            const map = L.map('map').setView([-21.505, -40.09], 3);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            lugares.forEach(lugar => {
                L.marker([lugar.latitude, lugar.longitude]).addTo(map)
                    .bindPopup(`<b>${lugar.nome}</b><br>${lugar.descricao}`);
            });
        }
    }, [lugares]);

    useEffect(() => {
        const estadosLabels = Object.keys(estadosMaisLocais);
        const estadosData = Object.values(estadosMaisLocais);

        const tiposExerciciosLabels = Object.keys(tiposExercicios);
        const tiposExerciciosData = Object.values(tiposExercicios);

        const usuariosAtivosData = {
            labels: ['Usuários Ativos'],
            datasets: [
                {
                    label: 'Quantidade de Usuários',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                    hoverBorderColor: 'rgba(75,192,192,1)',
                    data: [qtdUsuariosAtivos]
                }
            ]
        };

        const tiposExerciciosChartData = {
            labels: tiposExerciciosLabels,
            datasets: [{
                label: 'Tipos de Exercícios',
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1,
                hoverBackgroundColor: ['rgba(255, 99, 132, 0.4)', 'rgba(54, 162, 235, 0.4)', 'rgba(255, 206, 86, 0.4)', 'rgba(75, 192, 192, 0.4)', 'rgba(153, 102, 255, 0.4)', 'rgba(255, 159, 64, 0.4)'],
                hoverBorderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                data: tiposExerciciosData
            }]
        };

        setChartData({
            estados: {
                labels: estadosLabels,
                datasets: [{ data: estadosData }]
            },
            tiposExercicios: tiposExerciciosChartData,
            usuariosAtivos: usuariosAtivosData
        });

        setChartType('estados');
    }, [qtdUsuariosAtivos, estadosMaisLocais, tiposExercicios]);

    useEffect(() => {
        // Destruir gráficos anteriores
        Object.values(chartInstances).forEach(chart => {
            if (chart && chart.destroy) {
                chart.destroy();
            }
        });

        // Criar novos gráficos
        const newChartInstances = {};

        if (chartData.usuariosAtivos) {
            const usuariosAtivosChart = new Chart(document.getElementById('usuariosAtivosChart'), {
                type: 'bar',
                data: chartData.usuariosAtivos,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Usuários Ativos'
                        }
                    }
                }
            });
            newChartInstances.usuariosAtivos = usuariosAtivosChart;
        }

        if (chartData[chartType]) {
            const chart = new Chart(document.getElementById('chart'), {
                labels: ['Exercícios Cadastrados'],
                type: 'pie',
                data: chartData[chartType],
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: chartType === 'estados' ? 'Estados com mais Cadastros' : 'Exercícios Cadastrados'
                        }
                    }
                }
            });
            newChartInstances[chartType] = chart;
        }

        if (chartData.tiposExercicios) {
            const tiposExerciciosChart = new Chart(document.getElementById('tiposExerciciosChart'), {
                type: 'pie',
                data: chartData.tiposExercicios,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Tipos de Exercícios Cadastrados'
                        }
                    }
                }
            });
            newChartInstances['tiposExercicios'] = tiposExerciciosChart;
        }

        setChartInstances(newChartInstances);
    }, [chartData, chartType, chartInstances]);

    function deletaLugar(id) {
        Axios.delete(`http://localhost:3000/lugares/${id}`)
            .then(response => {
                setLugares(lugares.filter(lugar => lugar.id !== id));
            })
            .catch(erro => console.log(erro))
    }

    return (
        <LugaresContext.Provider value={{ lugares, estadosMaisLocais, tiposExercicios, chartData, setChartData, chartType, setChartType, chartInstances, setChartInstances, deletaLugar }}>
            {children}
        </LugaresContext.Provider>
    );
}

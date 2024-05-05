import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Chart } from 'chart.js/auto';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { LugaresContext } from "../context/LugaresContex";
import { UsuariosContext } from '../context/UsuariosContext';

const CardUsuarios = () => {
    const { qtdUsuariosAtivos } = useContext(UsuariosContext);

    const { estadosMaisLocais, tiposExercicios, lugares } = useContext(LugaresContext);

    const [chartData, setChartData] = useState({});
    const [chartType, setChartType] = useState('');
    const [chartInstances, setChartInstances] = useState({});





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
    }, [chartData, chartType]);

    useEffect(() => {
        if (lugares.length > 0) {
            const map = L.map('map').setView([-21.505, -40.09], 3); // Define a posição inicial do mapa e o nível de zoom
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Adiciona camada de mapa base

            // Adicione marcadores aos locais de exercícios
            lugares.forEach(lugar => {
                L.marker([lugar.latitude, lugar.longitude]).addTo(map)
                    .bindPopup(`<b>${lugar.nome}</b><br>${lugar.descricao}`); // Define o popup com informações do local de exercício
            });
        }
    }, [lugares]);



    return (
        <Box mt={4}>
            <Typography variant="h2">Dashboard</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h4">Usuários Ativos</Typography>
                    <canvas id="usuariosAtivosChart" style={{ width: '100%', height: 'auto' }}></canvas>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h4">{chartType === 'estados' ? 'Estados com mais Cadastros' : 'Tipos de Exercícios Cadastrados'}</Typography>
                    <canvas id="chart" style={{ width: '100%', height: 'auto' }}></canvas>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h4">Lugares</Typography>
                    <canvas id="tiposExerciciosChart" style={{ width: '100%', height: 'auto' }}></canvas>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div id="map" style={{ width: '100%', height: 400 }}></div>
                </Grid>
            </Grid>
        </Box>
    );

};

export default CardUsuarios;
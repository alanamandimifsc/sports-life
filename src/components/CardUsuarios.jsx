import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Chart } from 'chart.js/auto';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const CardUsuarios = () => {
    const [qtdUsuariosAtivos, setQtdUsuariosAtivos] = useState(0);
    const [lugares, setLugares] = useState([]);
    const [estadosMaisLocais, setEstadosMaisLocais] = useState({});
    const [tiposExercicios, setTiposExercicios] = useState({});
    const [chartData, setChartData] = useState({});
    const [chartType, setChartType] = useState('');
    const [chartInstances, setChartInstances] = useState({});

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/usuarios');
                const usuarios = response.data;
                let count = 0;
                usuarios.forEach(usuario => {
                    if (usuario.logado === true) {
                        count++;
                    }
                });
                setQtdUsuariosAtivos(count);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsuarios();
    }, []);

    useEffect(() => {
        const fetchLugares = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/lugares');
                const lugares = response.data;
                setLugares(lugares);

                // Contagem de locais por estado
                const estadosCount = lugares.reduce((acc, lugar) => {
                    acc[lugar.estado] = acc[lugar.estado] ? acc[lugar.estado] + 1 : 1;
                    return acc;
                }, {});
                setEstadosMaisLocais(estadosCount);

                // Contagem de tipos de exercícios
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

    return (
        <Box mt={4}>
            <Typography variant="h2"></Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h4"></Typography>
                    <canvas id="usuariosAtivosChart" style={{ width: '100%', height: 'auto' }}></canvas>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h4"></Typography>
                    <canvas id="chart" style={{ width: '100%', height: 'auto' }}></canvas>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h4"></Typography>
                    <canvas id="tiposExerciciosChart" style={{ width: '100%', height: 'auto' }}></canvas>
                </Grid>
            </Grid>
        </Box>

    );
};

export default CardUsuarios;

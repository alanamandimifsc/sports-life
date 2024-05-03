import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Chart } from 'chart.js/auto';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { UsuariosContext } from "../context/UsuariosContext";
import { LugaresContext } from "../context/LugaresContex";

const CardUsuarios = () => {
    // const [qtdUsuariosAtivos, setQtdUsuariosAtivos] = useState(0);
    // const [lugares, setLugares] = useState([]);
    // const [estadosMaisLocais, setEstadosMaisLocais] = useState({});
    // const [tiposExercicios, setTiposExercicios] = useState({});
    // const [chartData, setChartData] = useState({});
    // const [chartType, setChartType] = useState('');
    // const [chartInstances, setChartInstances] = useState({});
    const { qtdUsuariosAtivos: usuariosAtivos } = useContext(UsuariosContext);
    const { lugares: lugaresContext, estadosMaisLocais: estadosMaisLocaisContext, tiposExercicios: tiposExerciciosContext, chartData: chartDataContext, chartType: chartTypeContext, chartInstances: chartInstancesContext } = useContext(LugaresContext);

    useEffect(() => {
        setQtdUsuariosAtivos(usuariosAtivos);
    }, [usuariosAtivos]);

    useEffect(() => {
        setLugares(lugaresContext);
        setEstadosMaisLocais(estadosMaisLocaisContext);
        setTiposExercicios(tiposExerciciosContext);
        setChartData(chartDataContext);
        setChartType(chartTypeContext);
        setChartInstances(chartInstancesContext);
    }, [lugaresContext, estadosMaisLocaisContext, tiposExerciciosContext, chartDataContext, chartTypeContext, chartInstancesContext]);

    useEffect(() => {
        // Restante do código para renderização de gráficos e mapa
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

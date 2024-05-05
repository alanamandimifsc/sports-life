import { createContext, useEffect, useState, useContext } from "react";
import Axios from "axios";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { useForm } from "react-hook-form";
import { Chart } from 'chart.js/auto';
import { UsuariosContext } from './UsuariosContext';

export const LugaresContext = createContext();

export const LugaresProvider = ({ children }) => {
    const [lugares, setLugares] = useState([]);
    const [estadosMaisLocais, setEstadosMaisLocais] = useState({});
    const [tiposExercicios, setTiposExercicios] = useState({});
    const [id_place, setIdPlace] = useState(0);
    // const [chartData, setChartData] = useState({});
    // const [chartType, setChartType] = useState('');
    // const [chartInstances, setChartInstances] = useState({});
    // const { qtdUsuariosAtivos } = useContext(UsuariosContext);

    const [id, setId] = useState();

    // const [address, setAddress] = useState({
    //     street: '',
    //     neighborhood: '',
    //     city: '',
    //     state: ''
    // });



    const { setValue } = useForm();
    async function buscaCep(cep) {

        if (cep.length === 8) {
            try {
                const response = await Axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const data = response.data;
                return data;
                // setAddress({
                //     street: data.logradouro || '',
                //     neighborhood: data.bairro || '',
                //     city: data.localidade || '',
                //     state: data.uf || ''
                // });
            } catch (error) {
                console.log("Erro ao buscar CEP:", error);
            }
        }
    };




    useEffect(() => {
        const fetchLugares = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/lugares');
                const lugares = response.data;
                setLugares(lugares);

                const lastPlace = response.data[response.data.length - 1];
                setIdPlace(lastPlace ? parseInt(lastPlace.id) + 1 : 1);

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

    // useEffect(() => {
    //     if (lugares.length > 0) {
    //         geraMapa();

    //     }
    // }, [lugares]);


    // useEffect(() => {
    //     const fetchPlaceData = async () => {
    //         if (id) {
    //             try {
    //                 const response = await Axios.get(`http://localhost:3000/lugares/${id}`);
    //                 const place = response.data;
    //                 console.log('place', place);

    //                 if (place) {
    //                     setValue('nome', place.nome);
    //                     setValue('id_usuario', place.id_usuario);
    //                     setValue('descricao', place.descricao);
    //                     setValue('rua', place.rua);
    //                     setValue('numero', place.numero);
    //                     setValue('complemento', place.complemento);
    //                     setValue('bairro', place.bairro);
    //                     setValue('cidade', place.cidade);
    //                     setValue('estado', place.estado);
    //                     setValue('latitude', place.latitude);
    //                     setValue('longitude', place.longitude);
    //                     setAddress({
    //                         street: place.rua || '',
    //                         neighborhood: place.bairro || '',
    //                         city: place.cidade || '',
    //                         state: place.estado || '',
    //                     });

    //                     if (place.praticas_esportivas && Array.isArray(place.praticas_esportivas)) {
    //                         place.praticas_esportivas.forEach(pratica => {
    //                             setValue(`praticas_esportivas[${pratica}]`, true);
    //                         });
    //                     }
    //                 } else {
    //                     console.log(`Lugar com ID ${id} não encontrado.`);
    //                 }
    //             } catch (error) {
    //                 console.log("Erro ao buscar lugares:", error);
    //             }
    //         }
    //     };
    //     fetchPlaceData();
    // }, [id]);
    // function resetAdrres() {
    //     setAddress({
    //         street: '',
    //         neighborhood: '',
    //         city: '',
    //         state: ''
    //     });
    // }
    function atualizaLugar(data) {
        const requestConfig = {
            method: id ? 'PUT' : 'POST',
            body: JSON.stringify({
                id: (id !== undefined ? id : String(id_place)),
                id_usuario: parseInt(data.id_usuario),
                nome: data.nome,
                descricao: data.descricao,
                cep: data.cep,
                rua: data.rua,
                numero: parseInt(data.numero),
                complemento: data.complemento,
                bairro: data.bairro,
                cidade: data.cidade,
                estado: data.estado,
                latitude: data.latitude,
                longitude: data.longitude,
                praticas_esportivas: Object.keys(data.praticas_esportivas).filter(pratica => data.praticas_esportivas[pratica])
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(`http://localhost:3000/lugares${id ? `/${id}` : ''}`, requestConfig)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    setIdPlace(prevId => parseInt(prevId) + 1);
                    alert('Local cadastrado com sucesso!');
                } else {
                    throw new Error('Erro ao cadastrar local.');
                }
            })
            .catch(error => {
                console.error("Erro ao cadastrar local:", error);
                alert('Erro ao cadastrar local!');
            });
    };




    // async function geraMapa() {
    //     try {
    //         const response = await Axios.get(`http://localhost:3000/lugares`);
    //         const place = response.data;
    //         if (place.length > 0) {
    //             const map = L.map('map').setView([-21.505, -40.09], 3);
    //             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    //             place.forEach(lugar => {
    //                 L.marker([lugar.latitude, lugar.longitude]).addTo(map)
    //                     .bindPopup(`<b>${lugar.nome}</b><br>${lugar.descricao}`);
    //             });

    //         }
    //     } catch (error) {
    //         console.error('Error logging out:', error);
    //     }
    // }





    function deletar(id) {
        Axios.delete(`http://localhost:3000/lugares/${id}`)
            .then(response => {
                setLugares(lugares.filter(lugar => lugar.id !== id));
                alert('Lugar deletado com sucesso!');
                window.location.reload();
            })
            .catch(erro => console.log(erro))
    }

    return (
        <LugaresContext.Provider value={{
            lugares, estadosMaisLocais, tiposExercicios, deletar,
            id_place, setIdPlace, buscaCep, setId, atualizaLugar, setValue
        }}>
            {children}
        </LugaresContext.Provider>
    );
};
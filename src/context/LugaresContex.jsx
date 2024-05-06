import { createContext, useEffect, useState, useContext } from "react";
import Axios from "axios";
import 'leaflet/dist/leaflet.css';
import { useForm } from "react-hook-form";


export const LugaresContext = createContext();

export const LugaresProvider = ({ children }) => {
    const [lugares, setLugares] = useState([]);
    const [estadosMaisLocais, setEstadosMaisLocais] = useState({});
    const [tiposExercicios, setTiposExercicios] = useState({});
    const [id_place, setIdPlace] = useState(0);
    const [id, setId] = useState();
    const { setValue } = useForm();

    async function buscaCep(cep) {

        if (cep.length === 8) {
            try {
                const response = await Axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const data = response.data;
                return data;

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
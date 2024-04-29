import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const RegisterPlace = () => {

    const { id } = useParams();
    const [id_place, setIdPlace] = useState(0);

    // const history = useHistory();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [place, setPlaceData] = useState({
        nome: '',
        id_usuario: '',
        descricao: '',
        praticas_esportivas: [],
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        latitude: '',
        longitude: '',
        cep: ''
    });

    useEffect(() => {
        axios.get('http://localhost:3000/lugares')
            .then(response => {
                const lastPlace = response.data[response.data.length - 1];
                setIdPlace(lastPlace ? parseInt(lastPlace.id) + 1 : 1);
            })
            .catch(error => {
                console.log('Erro ao obter último ID de lugar:', error);
            });
    }, []);

    useEffect(() => {

        const fetchPlaceData = async () => {
            if (id) {
                try {
                    // const response = await axios.get(`http://localhost:3000/lugares`);
                    const response = await axios.get("http://localhost:3000/lugares/" + id);
                    // console.log(response.data);
                    // console.log(response1.data);
                    // console.log(id);
                    const place = response.data;
                    // const place = response.data.find(place => place.id == id);

                    // Verificar se o lugar foi encontrado
                    if (place) {
                        console.log(place.cep)
                        console.log(place.latitude)
                        setValue('nome', place.nome);
                        setValue('id_usuario', place.id_usuario);
                        setValue('descricao', place.descricao);
                        setValue('praticas_esportivas', place.praticas_esportivas);
                        setValue('rua', place.rua);
                        setValue('cep', place.cep)
                        setValue('numero', place.numero);
                        setValue('complemento', place.complemento);
                        setValue('bairro', place.bairro);
                        setValue('cidade', place.cidade);
                        setValue('estado', place.estado);
                        setValue('latitude', place.latitude);
                        setValue('longitude', place.longitude);
                        setAddress({
                            street: place.rua || '',
                            neighborhood: place.bairro || '',
                            city: place.cidade || '',
                            state: place.estado || '',
                            // cep: place.cep
                        });
                    } else {
                        console.log(`Lugar com ID ${id} não encontrado.`);
                    }
                } catch (error) {
                    console.log("Erro ao buscar lugares:", error);
                }
            }
        };
        fetchPlaceData();
    }, [id]);

    const [address, setAddress] = useState({
        street: '',
        neighborhood: '',
        city: '',
        state: ''
    });

    const handleBlurCEP = async (cep) => {
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const data = response.data;
                setAddress({
                    street: data.logradouro || '',
                    neighborhood: data.bairro || '',
                    city: data.localidade || '',
                    state: data.uf || ''

                });
            } catch (error) {
                console.log("Erro ao buscar CEP:", error);
            }
        }
    };

    const onSubmit = (data) => {
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
                bairro: address.neighborhood,
                cidade: address.city,
                estado: address.state,
                latitude: data.latitude,
                longitude: data.longitude,
                praticas_esportivas: data.praticas_esportivas
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        console.log(`http://localhost:3000/lugares${id ? `/${id}` : ''}`, requestConfig);

        fetch(`http://localhost:3000/lugares${id ? `/${id}` : ''}`, requestConfig)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    setIdPlace(prevId => parseInt(prevId) + 1);
                    console.log(id_place);
                    alert('Local cadastrado com sucesso!');
                } else {
                    throw new Error('Erro ao cadastrar local.');
                }
            })
            .catch(error => {
                console.error("Erro ao cadastrar local:", error);
                alert('Erro ao cadastrar local!');
            });



        console.log({
            Nome: data.nome,
            "ID do usuário": data.id_usuario,
            Descrição: data.descricao,
            PráticasEsportivas: data.praticas_esportivas,
            Rua: data.rua,
            Bairro: address.neighborhood,
            Cidade: address.city,
            Estado: address.state,
            Número: data.numero,
            Complemento: data.complemento,
            Latitude: data.latitude,
            Longitude: data.longitude
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={3} style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
                <Typography variant="h5" component="h1" align="center" gutterBottom>
                    Registrar Local
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Nome"
                            {...register("nome", { required: true })}
                            error={!!errors.nome}
                            helperText={errors.nome ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="ID do usuário"
                            {...register("id_usuario", { required: true, min: 1 })}
                            error={!!errors.id}
                            helperText={errors.id ? "ID inválido" : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Descrição"
                            {...register("descricao", { required: true })}
                            error={!!errors.descricao}
                            helperText={errors.descricao ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <fieldset>
                            <legend>Práticas Esportivas *</legend>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div>
                                        <input type="checkbox" id="caminhada" {...register("praticas_esportivas", { required: true })} value="caminhada" />
                                        <label htmlFor="caminhada">Caminhada</label><br />
                                        <input type="checkbox" id="trilha" {...register("praticas_esportivas", { required: true })} value="trilha" />
                                        <label htmlFor="trilha">Trilha</label><br />
                                        <input type="checkbox" id="musculação" {...register("praticas_esportivas", { required: true })} value="musculação" />
                                        <label htmlFor="musculação">Musculação</label><br />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <input type="checkbox" id="natação" {...register("praticas_esportivas", { required: true })} value="natação" />
                                        <label htmlFor="natação">Natação</label><br />
                                        <input type="checkbox" id="surf" {...register("praticas_esportivas", { required: true })} value="surf" />
                                        <label htmlFor="surf">Surf</label><br />
                                    </div>
                                </Grid>
                            </Grid>
                            {errors.praticas_esportivas && <span style={{ color: 'red' }}>Selecione pelo menos uma prática esportiva</span>}
                        </fieldset>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="CEP"
                            {...register("cep", { onBlur: (e) => handleBlurCEP(e.target.value) })}
                            error={!!errors.CEP}
                            helperText={errors.CEP ? "CEP inválido" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Rua"
                            {...register("rua")}
                            value={address.street}
                            error={!!errors.rua}
                            helperText={errors.rua ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Número"
                            {...register("numero", { required: true, maxLength: 5 })}
                            error={!!errors.numero}
                            helperText={errors.numero ? "Número inválido" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Complemento"
                            {...register("complemento", { required: true })}
                            error={!!errors.complemento}
                            helperText={errors.complemento ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Bairro"
                            {...register("bairro")}
                            value={address.neighborhood}
                            error={!!errors.bairro}
                            helperText={errors.bairro ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Cidade"
                            {...register("cidade")}
                            value={address.city}
                            error={!!errors.cidade}
                            helperText={errors.cidade ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Estado"
                            {...register("estado")}
                            value={address.state}
                            error={!!errors.estado}
                            helperText={errors.estado ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Latitude"
                            {...register("latitude", { required: true })}
                            error={!!errors.latitude}
                            helperText={errors.latitude ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Longitude"
                            {...register("longitude", { required: true })}
                            error={!!errors.longitude}
                            helperText={errors.longitude ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth type="submit" variant="contained" color="primary">
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    );
}

export default RegisterPlace;

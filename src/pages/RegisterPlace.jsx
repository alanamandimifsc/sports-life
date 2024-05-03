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

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [address, setAddress] = useState({
        street: '',
        neighborhood: '',
        city: '',
        state: ''
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
                    const response = await axios.get(`http://localhost:3000/lugares/${id}`);
                    const place = response.data;

                    if (place) {
                        setValue('nome', place.nome);
                        setValue('id_usuario', place.id_usuario);
                        setValue('descricao', place.descricao);
                        setValue('rua', place.rua);
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
                        });

                        if (place.praticas_esportivas && Array.isArray(place.praticas_esportivas)) {
                            place.praticas_esportivas.forEach(pratica => {
                                setValue(`praticas_esportivas[${pratica}]`, true);
                            });
                        }
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <fieldset>
                            <legend>Práticas Esportivas *</legend>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div>
                                        <input type="checkbox" id="Caminhada" {...register("praticas_esportivas.Caminhada")} />
                                        <label htmlFor="caminhada">Caminhada</label><br />
                                        <input type="checkbox" id="Trilha" {...register("praticas_esportivas.Trilha")} />
                                        <label htmlFor="trilha">Trilha</label><br />
                                        <input type="checkbox" id="Musculacao" {...register("praticas_esportivas.Musculacao")} />
                                        <label htmlFor="musculacao">Musculação</label><br />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <input type="checkbox" id="Natacao" {...register("praticas_esportivas.Natacao")} />
                                        <label htmlFor="natacao">Natação</label><br />
                                        <input type="checkbox" id="surf" {...register("praticas_esportivas.Surf")} />
                                        <label htmlFor="surf">Surf</label><br />
                                        <input type="checkbox" id="Futebol" {...register("praticas_esportivas.Futebol")} />
                                        <label htmlFor="futebol">Futebol</label><br />
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export const RegisterPlace = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [address, setAddress] = useState({
        street: '',
        neighborhood: '',
        city: '',
        state: ''
    });

    const handleBlurCEP = async (event) => {
        const cep = event.target.value;
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
        console.log({
            Nome: data.Nome,
            "ID do usuário": data["ID do usuário"],
            Descrição: data.Descrição,
            PráticasEsportivas: data.PráticasEsportivas,
            Rua: data.Rua,
            Bairro: address.neighborhood,
            Cidade: address.city,
            Estado: address.state,
            Número: data.Número,
            Complemento: data.Complemento
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
                            {...register("Nome", { required: true })}
                            error={!!errors.Nome}
                            helperText={errors.Nome ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="ID do usuário"
                            {...register("ID do usuário", { required: true, min: 1 })}
                            error={!!errors["ID do usuário"]}
                            helperText={errors["ID do usuário"] ? "ID inválido" : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Descrição"
                            {...register("Descrição", { required: true })}
                            error={!!errors.Descrição}
                            helperText={errors.Descrição ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <fieldset>
                            <legend>Práticas Esportivas *</legend>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div>
                                        <input type="checkbox" id="caminhada" {...register("PráticasEsportivas", { required: true })} value="caminhada" />
                                        <label htmlFor="caminhada">Caminhada</label><br />
                                        <input type="checkbox" id="trilha" {...register("PráticasEsportivas", { required: true })} value="trilha" />
                                        <label htmlFor="trilha">Trilha</label><br />
                                        <input type="checkbox" id="musculação" {...register("PráticasEsportivas", { required: true })} value="musculação" />
                                        <label htmlFor="musculação">Musculação</label><br />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <input type="checkbox" id="natação" {...register("PráticasEsportivas", { required: true })} value="natação" />
                                        <label htmlFor="natação">Natação</label><br />
                                        <input type="checkbox" id="surf" {...register("PráticasEsportivas", { required: true })} value="surf" />
                                        <label htmlFor="surf">Surf</label><br />
                                    </div>
                                </Grid>
                            </Grid>
                            {errors["PráticasEsportivas"] && <span style={{ color: 'red' }}>Selecione pelo menos uma prática esportiva</span>}
                        </fieldset>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="CEP"
                            onBlur={handleBlurCEP}
                            error={!!errors.CEP}
                            helperText={errors.CEP ? "CEP inválido" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Rua"
                            {...register("Rua")}
                            value={address.street}
                            error={!!errors.Rua}
                            helperText={errors.Rua ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Número"
                            {...register("Número", { required: true, maxLength: 5 })}
                            error={!!errors.Número}
                            helperText={errors.Número ? "Número inválido" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Complemento"
                            {...register("Complemento", { required: true })}
                            error={!!errors.Complemento}
                            helperText={errors.Complemento ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Bairro"
                            {...register("Bairro")}
                            value={address.neighborhood}
                            error={!!errors.Bairro}
                            helperText={errors.Bairro ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Cidade"
                            {...register("Cidade")}
                            value={address.city}
                            error={!!errors.Cidade}
                            helperText={errors.Cidade ? "Campo obrigatório" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Estado"
                            {...register("Estado")}
                            value={address.state}
                            error={!!errors.Estado}
                            helperText={errors.Estado ? "Campo obrigatório" : ""}
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

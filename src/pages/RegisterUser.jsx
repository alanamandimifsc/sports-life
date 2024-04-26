import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';


export const RegisterUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [address, setAddress] = useState({
        street: '',
        neighborhood: '',
        city: '',
        state: ''
    });

    const onSubmit = data => {
        console.log({
            Nome: data.Nome,
            "E-mail": data["E-mail"],
            CPF: data.CPF,
            "Data de Nascimento": data["Data de Nascimento"],
            Senha: data.Senha,
            Sexo: data.Sexo,
            CEP: data.CEP,
            Rua: address.street,
            Bairro: address.neighborhood,
            Cidade: address.city,
            Estado: address.state,
            Número: data.Número,
            Complemento: data.Complemento

        });
    }
    console.log(errors);

    const handleBlurCEP = (event) => {
        const cep = event.target.value;
        if (cep.length === 8) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    const data = response.data;
                    setAddress({
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf
                    });
                })
                .catch(error => {
                    console.log("Erro ao buscar CEP:", error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px' }}>
                        <TextField fullWidth type="text" label="Nome" {...register("Nome", { required: true, maxLength: 100 })} />
                        {errors.Nome && <span style={{ color: 'red' }}>Por favor, insira um nome válido.</span>}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px' }}>
                        <TextField fullWidth type="email" label="E-mail" {...register("E-mail", { required: true })} />
                        {errors["E-mail"] && <span style={{ color: 'red' }}>Por favor, insira um e-mail válido.</span>}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px' }}>
                        <TextField fullWidth type="text" label="CPF" {...register("CPF", { required: true, minLength: 11, maxLength: 11 })} />
                        {errors.CPF && <span style={{ color: 'red' }}>Por favor, insira um CPF válido.</span>}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px' }}>
                        <TextField fullWidth type="date" label="Data de Nascimento" {...register("Data de Nascimento", { required: true })} InputLabelProps={{ shrink: true }} />
                        {errors["Data de Nascimento"] && <span style={{ color: 'red' }}>Por favor, insira uma data de nascimento válida.</span>}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px' }}>
                        <TextField fullWidth type="password" label="Senha" {...register("Senha", { required: true })} />
                        {errors.Senha && <span style={{ color: 'red' }}>Por favor, insira uma senha válida.</span>}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px' }}>
                        <Select fullWidth label="Sexo" {...register("Sexo", { required: true })} defaultValue="">
                            <MenuItem value="" disabled>Selecione o gênero</MenuItem>
                            <MenuItem value="Feminino">Feminino</MenuItem>
                            <MenuItem value="Masculino">Masculino</MenuItem>
                        </Select>
                        {errors.Sexo && <span style={{ color: 'red' }}>Por favor, selecione o gênero.</span>}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px' }}>
                        <TextField fullWidth type="text" label="CEP" {...register("CEP", { required: true })} onBlur={handleBlurCEP} />
                        {errors.CEP && <span style={{ color: 'red' }}>Por favor, insira um CEP válido.</span>}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px' }}>
                        <TextField fullWidth type="text" label="Rua" value={address.street} {...register("Rua", { required: true })} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper style={{ padding: '20px' }}>
                        <TextField fullWidth type="text" label="Bairro" value={address.neighborhood} {...register("Bairro")} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper style={{ padding: '20px' }}>
                        <TextField fullWidth type="text" label="Cidade" value={address.city} {...register("Cidade")} />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px' }}>
                        <TextField fullWidth type="text" label="Estado" value={address.state} {...register("Estado")} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper style={{ padding: '20px' }}>
                        <TextField fullWidth type="number" label="Número" {...register("Número", { required: true, maxLength: 5 })} />
                        {errors.Número && <span style={{ color: 'red' }}>Por favor, insira um número válido.</span>}
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper style={{ padding: '20px' }}>
                        <TextField fullWidth type="text" label="Complemento" {...register("Complemento", { required: true })} />
                        {errors.Complemento && <span style={{ color: 'red' }}>Por favor, insira um complemento válido.</span>}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
                </Grid>
            </Grid>
        </form>
    );
};

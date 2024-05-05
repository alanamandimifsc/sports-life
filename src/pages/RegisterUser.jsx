import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Axios from 'axios';
import { useBuscaCep } from '../hook/useBuscaCep';
import { UsuariosContext } from '../context/UsuariosContext';
import { Input } from '@mui/icons-material';



export const RegisterUser = () => {
    const { register, handleSubmit, formState: { errors }, setValue, InputLabelProps } = useForm();

    const { criarUsuario } = useContext(UsuariosContext);

    const onSubmit = async (data) => {
        await criarUsuario(data);

    };

    const handleBlurCEP = async (cep) => {
        const dados = await useBuscaCep(cep);
        setValue('rua', dados.logradouro);
        setValue('bairro', dados.bairro);
        setValue('cidade', dados.localidade);
        setValue('estado', dados.uf);

    };

    return (
        <Box maxWidth={650} margin="auto">
            <h2 style={{ alignContent: "center" }}>Dados do Usuário</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="text" label="Nome" {...register("nome", { required: true, maxLength: 100 })} InputLabelProps={{ shrink: true }} />
                            {errors.nome && <span style={{ color: 'red' }}>Por favor, insira um nome válido.</span>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="email" label="E-mail" {...register("email", { required: true })} InputLabelProps={{ shrink: true }} />
                            {errors.email && <span style={{ color: 'red' }}>Por favor, insira um e-mail válido.</span>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="text" label="CPF" {...register("cpf", { required: true, minLength: 11, maxLength: 11 })} InputLabelProps={{ shrink: true }} />
                            {errors.cpf && <span style={{ color: 'red' }}>Por favor, insira um CPF válido.</span>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="date" label="Data de Nascimento" {...register("data_nasc", { required: true })} InputLabelProps={{ shrink: true }} />
                            {errors.data_nasc && <span style={{ color: 'red' }}>Por favor, insira uma data de nascimento válida.</span>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="password" label="Senha" {...register("senha", { required: true })} InputLabelProps={{ shrink: true }} />
                            {errors.senha && <span style={{ color: 'red' }}>Por favor, insira uma senha válida.</span>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>

                            <Select fullWidth label="Sexo" {...register("sexo", { required: true })} defaultValue=""
                            >
                                <MenuItem value="" disabled >Selecione o gênero</MenuItem>
                                <MenuItem value="Feminino">Feminino</MenuItem>
                                <MenuItem value="Masculino">Masculino</MenuItem>
                            </Select>
                            {errors.sexo && <span style={{ color: 'red' }}>Por favor, selecione o gênero.</span>}
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth type="text" label="CEP" name='cep' {...register("cep", { onBlur: (e) => handleBlurCEP(e.target.value) })} error={!!errors.CEP} helperText={errors.CEP ? "CEP inválido" : ""}
                            InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth type="text" label="Rua" {...register("rua", { required: true })}
                            InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth type="text" label="Bairro" {...register("bairro")}
                            InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth type="text" label="Cidade" {...register("cidade")}
                            InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth type="text" label="Estado" {...register("estado")}
                            InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth type="number" label="Número" {...register("numero", { required: true, maxLength: 5 })}
                            InputLabelProps={{ shrink: true }} />
                        {errors.numero && <span style={{ color: 'red' }}>Por favor, insira um número válido.</span>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth type="text" label="Complemento" {...register("complemento", { required: true })}
                            InputLabelProps={{ shrink: true }} />
                        {errors.complemento && <span style={{ color: 'red' }}>Por favor, insira um complemento válido.</span>}
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
            </form>
        </Box >
    );

};

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Axios from 'axios';



export const RegisterUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [address, setAddress] = useState({
        street: '',
        neighborhood: '',
        city: '',
        state: ''
    });

    const [id_user, setIdUser] = useState(0);

    useEffect(() => {
        Axios.get('http://localhost:3000/usuarios')
            .then(response => {
                const lastUser = response.data[response.data.length - 1];
                setIdUser(lastUser ? parseInt(lastUser.id) + 1 : 1);
            })
            .catch(error => {
                console.log('Erro ao obter último ID de usuário:', error);
            });
    }, []);

    const onSubmit = async (data) => {
        const response = await Axios.get('http://localhost:3000/usuarios');
        const users = response.data;
        const user = users.find(u => u.cpf === data.cpf);

        if (!user) {
            fetch("http://localhost:3000/usuarios", {
                method: 'POST',
                body: JSON.stringify({
                    id: String(id_user),
                    nome: data.nome,
                    email: data.email,
                    cpf: data.cpf,
                    data_nasc: data.data_nasc,
                    sexo: data.sexo,
                    senha: data.senha,
                    cep: data.cep,
                    rua: address.street,
                    numero: parseInt(address.number),
                    bairro: address.neighborhood,
                    cidade: address.city,
                    estado: address.state,
                    logado: false
                }),
            })
                .then(() => {
                    setIdUser(prevId => parseInt(prevId) + 1);

                    alert('Cadastro efetuado com sucesso!');
                    window.location.href = '/login';
                })
                .catch(error => console.log('Erro ao cadastrar usuário:', error));
        } else {
            alert('Usuário já possui cadastro');
        }


        console.log({
            Nome: data.nome,
            "E-mail": data["email"],
            CPF: data.cpf,
            "Data de Nascimento": data["data_nasc"],
            Senha: data.senha,
            Sexo: data.sexo,
            CEP: data.cep,
            Rua: address.street,
            Bairro: address.neighborhood,
            Cidade: address.city,
            Estado: address.state,
            Número: data.numero,
            Complemento: data.complemento

        });
    }
    console.log(errors);

    const handleBlurCEP = (event) => {
        const cep = event.target.value;
        if (cep.length === 8) {
            Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
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
        <Box maxWidth={650} margin="auto">
            <h2 style={{ alignContent: "center" }}>Dados do Usuário</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="text" label="Nome" {...register("nome", { required: true, maxLength: 100 })} />
                            {errors.nome && <span style={{ color: 'red' }}>Por favor, insira um nome válido.</span>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="email" label="E-mail" {...register("email", { required: true })} />
                            {errors.email && <span style={{ color: 'red' }}>Por favor, insira um e-mail válido.</span>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="text" label="CPF" {...register("cpf", { required: true, minLength: 11, maxLength: 11 })} />
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
                            <TextField fullWidth type="password" label="Senha" {...register("senha", { required: true })} />
                            {errors.senha && <span style={{ color: 'red' }}>Por favor, insira uma senha válida.</span>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>
                            <Select fullWidth label="Sexo" {...register("sexo", { required: true })} defaultValue="">
                                <MenuItem value="" disabled>Selecione o gênero</MenuItem>
                                <MenuItem value="Feminino">Feminino</MenuItem>
                                <MenuItem value="Masculino">Masculino</MenuItem>
                            </Select>
                            {errors.sexo && <span style={{ color: 'red' }}>Por favor, selecione o gênero.</span>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="text" label="CEP" {...register("cep", { required: true })} onBlur={handleBlurCEP} />
                            {errors.cep && <span style={{ color: 'red' }}>Por favor, insira um CEP válido.</span>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="text" label="Rua" value={address.street} {...register("rua", { required: true })} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="text" label="Bairro" value={address.neighborhood} {...register("bairro")} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="text" label="Cidade" value={address.city} {...register("cidade")} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="text" label="Estado" value={address.state} {...register("estado")} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="number" label="Número" {...register("numero", { required: true, maxLength: 5 })} />
                            {errors.numero && <span style={{ color: 'red' }}>Por favor, insira um número válido.</span>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper style={{ padding: '20px' }}>
                            <TextField fullWidth type="text" label="Complemento" {...register("complemento", { required: true })} />
                            {errors.complemento && <span style={{ color: 'red' }}>Por favor, insira um complemento válido.</span>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
                    </Grid>
                </Grid>
            </form>
        </Box >
    );
};

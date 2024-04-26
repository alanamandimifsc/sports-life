import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = data => console.log(data);

    return (
        <Grid container justifyContent="center" style={{ minHeight: '90vh', alignItems: 'center' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '30px' }}>
                    <Typography variant="h5" component="h1" align="center" gutterBottom>
                        Faça Login
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    label="E-mail"
                                    {...register("E-mail", { required: true })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    label="Senha"
                                    {...register("Senha", { required: true })}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth type="submit" variant="contained" color="primary">
                                    Entrar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Typography variant="body2">
                                Não tem uma conta? <Link to="/registerUser">Cadastre-se aqui</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

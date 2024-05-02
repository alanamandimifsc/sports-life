import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '../pages/menu'; // Importe o componente Menu
import Axios from 'axios';

function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar a exibição do menu

    const handleLogout = async () => {
        try {
            // Atualize o usuário como deslogado no servidor
            const id = localStorage.getItem('id');
            console.log('id', id);
            const response = await Axios.get(`http://localhost:3000/usuarios/${id}`);
            const user = response.data;
            await Axios.put(`http://localhost:3000/usuarios/${id}`, {
                ...user,
                logado: false
            });

            // Limpe o localStorage
            localStorage.setItem('isAutenticado', false);
            localStorage.setItem('id', 0);

            // Redirecione para a página de login
            window.location.href = '/login';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }




    // Função para alternar o estado do menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <AppBar position="fixed" sx={{ height: 56 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sports Life
                </Typography>
                {isMobile ? (
                    <Button color="inherit" onClick={toggleMenu}>
                        Menu
                    </Button>
                ) : (
                    <>
                        <Button component={Link} to="/dashboard" color="inherit" sx={{ mr: 2 }}>
                            Home
                        </Button>
                        {/* <Button component={Link} to="/login" color="inherit" sx={{ mr: 2 }}>
                            Login
                        </Button> */}
                        {/* <Button component={Link} to="/registerUser" color="inherit" sx={{ mr: 2 }}>
                            Register User
                        </Button> */}
                        <Button component={Link} to="/registerPlace" color="inherit" sx={{ mr: 2 }}>
                            Register Place
                        </Button>
                        <Button component={Link} to="/placeList" color="inherit" sx={{ mr: 2 }}>
                            Place List
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                )}
            </Toolbar>
            {isMobile && <Menu open={menuOpen} />} {/* Renderiza o componente Menu somente em dispositivos móveis */}
        </AppBar>
    );
}

export default Header;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '../pages/menu'; // Importe o componente Menu

function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar a exibição do menu

    const handleLogout = () => {
        localStorage.setItem('isAutenticado', false);
        window.location.href = '/login';
    };


    // Função para alternar o estado do menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <AppBar position="fixed" sx={{ height: 56 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My App
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

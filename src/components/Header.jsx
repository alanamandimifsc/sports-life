import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'; // Importe o IconButton
import MenuIcon from '@mui/icons-material/Menu'; // Importe o ícone do menu
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from './menu'; // Importe o componente Menu
import { UsuariosContext } from '../context/UsuariosContext';

function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar a exibição do menu
    const { logout } = useContext(UsuariosContext);



    const handleLogout = async () => {
        const id = localStorage.getItem('id');
        await logout(id);
        localStorage.clear();
        window.location.href = '/login';
    }



    //alternar o estado do menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sports Life
                </Typography>
                {isMobile ? (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={toggleMenu}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                ) : (
                    <>
                        <Button component={Link} to="/dashboard" color="inherit" sx={{ mr: 2 }}>
                            Página Inicial
                        </Button>
                        <Button component={Link} to="/registerPlace" color="inherit" sx={{ mr: 2 }}>
                            Cadastro de Lugar
                        </Button>
                        <Button component={Link} to="/placeList" color="inherit" sx={{ mr: 2 }}>
                            Lista de Lugares
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Sair
                        </Button>
                    </>
                )}
            </Toolbar>
            {isMobile && <Menu open={menuOpen} toggleMenu={toggleMenu} />}
        </AppBar>
    );
}

export default Header;

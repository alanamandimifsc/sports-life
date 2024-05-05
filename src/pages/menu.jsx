import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Axios from 'axios';
import { UsuariosContext } from '../context/UsuariosContext';


const menuOptions = [
    { text: 'Pagina Inicial', link: '/dashboard' },
    // { text: 'Login', link: '/login' },
    // { text: 'Register User', link: '/registerUser' },
    { text: 'Cadastro de Lugar', link: '/registerPlace' },
    { text: 'Lista de Lugares', link: '/placeList' },
    { text: 'Sair', action: 'logout' }
];

const Menu = ({ open, toggleMenu }) => {



    const { logout } = useContext(UsuariosContext);
    const menuStyle = {
        backgroundColor: '#333', // Altere para a cor de fundo desejada
        color: '#fff', // Altere para a cor do texto desejada
    };
    const handleOptionClick = async (action) => {
        toggleMenu();
        if (action === 'logout') {
            try {
                // Atualize o usuário como deslogado no servidor
                const id = localStorage.getItem('id');
                console.log('id', id);
                await logout(id);

                // const response = await Axios.get(`http://localhost:3000/usuarios/${id}`);
                // const user = response.data;
                // await Axios.put(`http://localhost:3000/usuarios/${id}`, {
                //     ...user,
                //     logado: false
                // });

                // Limpe o localStorage
                localStorage.setItem('isAutenticado', false);
                localStorage.setItem('id', 0);

                // Redirecione para a página de login
                window.location.href = '/login';
            } catch (error) {
                console.error('Error logging out:', error);
            }




        }
    };

    if (!open) {
        return null;
    }

    return (
        <div style={{ width: 250 }}>
            <List style={menuStyle}>
                {menuOptions.map((option, index) => (
                    <ListItem
                        button
                        key={index}
                        component={Link}
                        to={option.link}
                        onClick={() => handleOptionClick(option.action)} // Adicionamos a lógica para manipular a ação de logout
                    >
                        <ListItemText primary={option.text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );
}

export default Menu;

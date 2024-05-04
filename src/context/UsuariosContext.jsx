import { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [qtdUsuariosAtivos, setQtdUsuariosAtivos] = useState(0);

    useEffect(() => {
        getUsuarios();
    }, []);

    function getUsuarios() {
        Axios.get('http://localhost:3000/usuarios')
            .then(response => {
                setUsuarios(response.data); // Aqui está a correção
                countUsuariosAtivos(response.data); // Contagem de usuários ativos
            })
            .catch(erro => console.log(erro))
    }

    function countUsuariosAtivos(usuarios) {
        let count = 0;
        usuarios.forEach(usuario => {
            if (usuario.logado === true) {
                count++;
            }
        });
        setQtdUsuariosAtivos(count);
    }

    function idUser(id) {
        const user = usuarios.find(u => u.id === id);
        return user ? user.nome : "Usuário não encontrado";
    }


    async function login(email, senha) {
        const response = await Axios.get('http://localhost:3000/usuarios');
        const users = response.data;
        const user = users.find(u => u.email === email && u.senha === senha);

        if (user) {
            await Axios.put(`http://localhost:3000/usuarios/${user.id}`, {
                ...user,
                logado: true,
            });
            localStorage.setItem("isAutenticado", true)
            localStorage.setItem("id", user.id)
            alert('Login efetuado com sucesso!');
            window.location.href = '/dashboard';
        } else {
            alert('Usuário ou senha inválidos!');
        }
    };

    async function logout(id) {
        try {

            const response = await Axios.get(`http://localhost:3000/usuarios/${id}`);
            const user = response.data;
            await Axios.put(`http://localhost:3000/usuarios/${id}`, {
                ...user,
                logado: false
            });

        } catch (error) {
            console.error('Error logging out:', error);
        }
    }


    return (
        <UsuariosContext.Provider value={{ usuarios, login, qtdUsuariosAtivos, idUser, logout }}>
            {children}
        </UsuariosContext.Provider>
    );
}

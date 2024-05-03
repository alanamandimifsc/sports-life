import { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]);

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

    return (
        <UsuariosContext.Provider value={{ usuarios, login }}>
            {children}
        </UsuariosContext.Provider>
    );
}

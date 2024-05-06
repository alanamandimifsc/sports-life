import { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [qtdUsuariosAtivos, setQtdUsuariosAtivos] = useState(0);
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

    async function criarUsuario(data) {
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
                    rua: data.rua,
                    numero: parseInt(data.numero),
                    bairro: data.bairro,
                    cidade: data.cidade,
                    estado: data.estado,
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
    }


    return (
        <UsuariosContext.Provider value={{ usuarios, login, qtdUsuariosAtivos, idUser, logout, criarUsuario }}>
            {children}
        </UsuariosContext.Provider>
    );
}

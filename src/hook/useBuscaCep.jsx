import axios from "axios";

export async function useBuscaCep(cep) {
    let data = {};
    let error = null;

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        data = response.data;
    } catch (err) {
        console.log("Erro ao buscar CEP:", err);
    }

    return data;
}

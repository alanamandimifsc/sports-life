
export async function useBuscaCoordenadas(enderecoCompleto) {

    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${enderecoCompleto}`);
    const data = await response.json();
    return data;
};
import { Link } from "react-router-dom";
export function CardLugar() {
    return (
        <div className="card">
            <h2>Nome do lugar</h2>
            <p>Descrição do lugar</p>
            <Link to="/registerPlace">Editar</Link>
        </div>
    )
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicketById, cambiarEstado } from "../services/tickets.service";
import "./styles/styles.css";

export default function TicketDetail() {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [estado, setEstado] = useState("");

    const load = async () => {
        const res = await getTicketById(id);
        setTicket(res.data.data);
        setEstado(res.data.data.estado);
    };

    useEffect(() => {
        load();
    }, []);

    const updateEstado = async () => {
        await cambiarEstado(id, {
            estado,
            usuario: "system",
            comentario: "Cambio desde front",
        });

        load();
    };

    if (!ticket) return <p>Cargando...</p>;

    return (
        <div className="detail-container">
            <h2>Ticket #{ticket.id}</h2>

            <div className="card">
                <p><b>Título:</b> {ticket.titulo}</p>
                <p><b>Descripción:</b> {ticket.descripcion}</p>
                <p><b>Estado:</b> {ticket.estado}</p>
            </div>

            <div className="actions">
                <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="abierto">Abierto</option>
                    <option value="proceso">En proceso</option>
                    <option value="cerrado">Cerrado</option>
                </select>

                <button onClick={updateEstado}>Actualizar estado</button>
            </div>
        </div>
    );
}
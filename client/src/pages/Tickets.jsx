import { useEffect, useState } from "react";
import { getTickets, deleteTicket } from "../services/tickets.service";
import "./styles/styles.css";

export default function Tickets() {
    const [tickets, setTickets] = useState([]);

    const load = async () => {
        const res = await getTickets();
        setTickets(res.data.data);
    };

    useEffect(() => {
        load();
    }, []);

    const eliminar = async (id) => {
        await deleteTicket(id);
        load();
    };

    return (
        <div>
            <h2>Tickets</h2>

            <a href="/create-ticket">Nuevo Ticket</a>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {tickets.map((t) => (
                        <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.titulo}</td>
                            <td>{t.estado}</td>
                            <td>
                                <a href={`/ticket/${t.id}`}>Ver</a>
                                <button onClick={() => eliminar(t.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
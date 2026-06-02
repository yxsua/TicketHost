import { useState } from "react";
import { createTicket } from "../services/tickets.service";
import "../styles/styles.css";

export default function CreateTicket() {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const crear = async () => {
        await createTicket({ titulo, descripcion });
        window.location.href = "/tickets";
    };

    return (
        <div>
            <h2>Crear Ticket</h2>

            <input placeholder="titulo" onChange={(e) => setTitulo(e.target.value)} />
            <textarea placeholder="descripcion" onChange={(e) => setDescripcion(e.target.value)} />

            <button onClick={crear}>Crear</button>
        </div>
    );
}
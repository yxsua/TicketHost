import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { obtenerComentarios, crearComentario } from "../api/comentarios.api";

function TicketConversationModal({ ticketId }) {
  const [comentarios, setComentarios] = useState([]);

  const [mensaje, setMensaje] = useState("");

  const cargarComentarios = async () => {

    console.log("Cargando comentarios para ticket ID:", ticketId);
    try {
      const data = await obtenerComentarios(ticketId);

      setComentarios(data);
    } catch {
      toast.error("Error cargando conversación");
    }
  };

  useEffect(() => {
    if (!ticketId) return;

    cargarComentarios();
  }, [ticketId]);

  const handleEnviar = async (e) => {
    e.preventDefault();

    if (!mensaje.trim()) {
      return;
    }

    try {
      await crearComentario(ticketId, mensaje);

      setMensaje("");

      cargarComentarios();
    } catch {
      toast.error("Error enviando mensaje");
    }
  };

  return (
    <>
      <div className="conversation-list">
        {comentarios.map((comentario) => (
          <div
            key={comentario.COMENTARIO_ID}
            className={`conversation-item ${
              comentario.USUARIO_TIPO === "cliente"
                ? "conversation-item--cliente"
                : "conversation-item--agente"
            }`}
          >
            <strong>{comentario.USUARIO_TIPO}</strong>

            <p>{comentario.MENSAJE}</p>

            <small>{comentario.FECHA_CREACION}</small>
          </div>
        ))}
      </div>

      <form className="conversation-form" onSubmit={handleEnviar}>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          rows={4}
        />

        <br />

        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default TicketConversationModal;

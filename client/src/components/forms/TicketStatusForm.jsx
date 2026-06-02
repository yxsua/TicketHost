import { useState } from "react";

function TicketStatusForm({ ticket, onSubmit }) {
  const [estado, setEstado] = useState(ticket?.ESTADO ?? "Abierto");

  const [comentario, setComentario] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      estado,
      comentario,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Estado</label>

        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Abierto">Abierto</option>

          <option value="En Proceso">En Proceso</option>

          <option value="Resuelto">Resuelto</option>

          <option value="Cerrado">Cerrado</option>
        </select>
      </div>

      <br />

      <div>
        <label>Comentario</label>

        <textarea
          rows={5}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        />
      </div>

      <br />

      <button type="submit">Guardar</button>
    </form>
  );
}

export default TicketStatusForm;

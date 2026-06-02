import { useEffect, useState } from "react";

import { obtenerHistorialTicket } from "../api/tickets.api";

function TicketHistoryModal({ ticketId }) {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    if (!ticketId) return;

    obtenerHistorialTicket(ticketId).then(setHistorial);
  }, [ticketId]);

  return (
    <div>
      {historial.map((item) => (
        <div key={item.HISTORIAL_ID} className="ticket-history-item">
          <strong>{item.ESTADO_NUEVO}</strong>

          <p>{item.COMENTARIO}</p>

          <small>{item.USUARIO}</small>
        </div>
      ))}
    </div>
  );
}

export default TicketHistoryModal;

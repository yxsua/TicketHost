const { getConnection } = require("../config/database");

const obtenerHistorial = async () => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(`
      SELECT
        historial_id,
        ticket_id,
        estado_anterior,
        estado_nuevo,
        cambiado_por,
        comentario,
        fecha_cambio
      FROM vw_historial_estado
      ORDER BY fecha_cambio DESC
    `);

    return result.rows;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const obtenerHistorialPorTicket = async (ticketId) => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
      SELECT
        historial_id,
        ticket_id,
        estado_anterior,
        estado_nuevo,
        cambiado_por,
        comentario,
        fecha_cambio
      FROM vw_historial_estado
      WHERE ticket_id = :ticketId
      ORDER BY fecha_cambio DESC
      `,
      { ticketId },
    );

    return result.rows;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

module.exports = {
  obtenerHistorial,
  obtenerHistorialPorTicket,
};

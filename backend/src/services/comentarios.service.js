const { getConnection } = require("../config/database");

const obtenerComentariosPorTicket = async (ticketId) => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
      SELECT *
      FROM vw_ticket_comentarios
      WHERE ticket_id = :ticket_id
      ORDER BY fecha_creacion ASC
      `,
      {
        ticket_id: ticketId,
      },
    );

    return result.rows;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const crearComentario = async ({
  ticket_id,
  usuario_id,
  usuario_tipo,
  mensaje,
}) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_insertar_comentario_ticket(
          :ticket_id,
          :usuario_id,
          :usuario_tipo,
          :mensaje
        );
      END;
      `,
      {
        ticket_id,
        usuario_id,
        usuario_tipo,
        mensaje,
      },
    );
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

module.exports = {
  obtenerComentariosPorTicket,
  crearComentario,
};

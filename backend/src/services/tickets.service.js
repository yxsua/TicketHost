const { getConnection } = require("../config/database");

const obtenerTickets = async () => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(`
      SELECT *
      FROM vw_tickets_detalle
      ORDER BY ticket_id DESC
    `);

    return result.rows;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const obtenerTicketPorId = async (id) => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
      SELECT *
      FROM vw_tickets_detalle
      WHERE ticket_id = :id
      `,
      { id },
    );

    return result.rows[0];
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const crearTicket = async (ticket) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_insertar_ticket(
          :cliente_id,
          :agente_id,
          :categoria_id,
          :titulo,
          :descripcion,
          :prioridad,
          :estado
        );
      END;
      `,
      {
        cliente_id: ticket.cliente_id,
        agente_id: ticket.agente_id ?? null,
        categoria_id: ticket.categoria_id,
        titulo: ticket.titulo,
        descripcion: ticket.descripcion,
        prioridad: ticket.prioridad ?? "Media",
        estado: ticket.estado ?? "Abierto",
      },
    );
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const actualizarTicket = async (id, ticket) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_actualizar_ticket(
          :id,
          :cliente_id,
          :agente_id,
          :categoria_id,
          :titulo,
          :descripcion,
          :prioridad,
          :estado
        );
      END;
      `,
      {
        id,
        cliente_id: ticket.cliente_id,
        agente_id: ticket.agente_id ?? null,
        categoria_id: ticket.categoria_id,
        titulo: ticket.titulo,
        descripcion: ticket.descripcion,
        prioridad: ticket.prioridad ?? "Media",
        estado: ticket.estado ?? "Abierto",
      },
    );
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const eliminarTicket = async (id) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_eliminar_ticket(:id);
      END;
      `,
      { id },
    );
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const cambiarEstado = async (id, estado, usuario, comentario) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_cambiar_estado_ticket(
          :ticket_id,
          :estado_nuevo,
          :usuario,
          :comentario
        );
      END;
      `,
      {
        ticket_id: id,
        estado_nuevo: estado,
        usuario,
        comentario,
      },
    );
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const obtenerTicketsCliente = async (clienteId) => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
      SELECT *
      FROM vw_tickets_detalle
      WHERE cliente_id = :clienteId
      ORDER BY ticket_id DESC
      `,
      { clienteId },
    );

    return result.rows;
  } finally {
    if (conn) await conn.close();
  }
};

const obtenerTicketsSinAsignar = async () => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(`
      SELECT *
      FROM vw_tickets_detalle
      WHERE agente_id IS NULL
      ORDER BY ticket_id DESC
    `);

    return result.rows;
  } finally {
    if (conn) await conn.close();
  }
};

const asignarTicket = async (ticketId, agenteId) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      UPDATE tickets
      SET agente_id = :agenteId
      WHERE ticket_id = :ticketId
      `,
      {
        ticketId,
        agenteId,
      },
    );

    await conn.commit();
  } finally {
    if (conn) await conn.close();
  }
};

const obtenerTicketsAgente = async (
  agenteId
) => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
      SELECT *
      FROM vw_tickets_detalle
      WHERE agente_id = :agenteId
      ORDER BY ticket_id DESC
      `,
      { agenteId }
    );

    return result.rows;
  } finally {
    if (conn) await conn.close();
  }
};

module.exports = {
  obtenerTickets,
  obtenerTicketPorId,
  crearTicket,
  actualizarTicket,
  eliminarTicket,
  cambiarEstado,
  obtenerTicketsCliente,
  obtenerTicketsSinAsignar,
  asignarTicket,
  obtenerTicketsAgente,
};

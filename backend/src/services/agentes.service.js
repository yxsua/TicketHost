const { getConnection } = require("../config/database");

const obtenerAgentes = async () => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(`
      SELECT
        agente_id,
        nombre,
        email,
        departamento,
        fecha_contratacion
      FROM vw_agentes
      ORDER BY agente_id
    `);

    return result.rows;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const obtenerAgentePorId = async (id) => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
      SELECT
        agente_id,
        nombre,
        email,
        departamento,
        fecha_contratacion
      FROM vw_agentes
      WHERE agente_id = :id
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

const crearAgente = async (nombre, email, departamento, passwordHash) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_insertar_agente(
          :nombre,
          :email,
          :departamento,
          :password_hash
        );
      END;
      `,
      {
        nombre,
        email,
        departamento,
        password_hash: passwordHash,
      },
    );
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const actualizarAgente = async (agenteId, nombre, email, departamento, passwordHash) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_actualizar_agente(
          :id,
          :nombre,
          :email,
          :departamento,
          :password_hash
        );
      END;
      `,
      {
        id: agenteId,
        nombre,
        email,
        departamento,
        password_hash: passwordHash,
      },
    );
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const eliminarAgente = async (id) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_eliminar_agente(:id);
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

module.exports = {
  obtenerAgentes,
  obtenerAgentePorId,
  crearAgente,
  actualizarAgente,
  eliminarAgente,
};

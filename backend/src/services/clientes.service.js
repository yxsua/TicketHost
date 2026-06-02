const { getConnection } = require("../config/database");

const obtenerClientes = async () => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(`
      SELECT
        cliente_id,
        nombre,
        email,
        telefono,
        compania,
        fecha_registro
      FROM vw_clientes
      ORDER BY cliente_id
    `);

    return result.rows;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const obtenerClientePorId = async (id) => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
      SELECT
        cliente_id,
        nombre,
        email,
        telefono,
        compania,
        fecha_registro
      FROM vw_clientes
      WHERE cliente_id = :id
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

const crearCliente = async (
  nombre,
  email,
  telefono,
  compania,
  password_hash,
) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_insertar_cliente(
          :nombre,
          :email,
          :telefono,
          :compania,
          :password_hash
        );
      END;
      `,
      {
        nombre,
        email,
        telefono,
        compania,
        password_hash,
      },
    );
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const actualizarCliente = async (
  clienteId,
  nombre,
  email,
  telefono,
  compania,
  password_hash,
) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_actualizar_cliente(
          :id,
          :nombre,
          :email,
          :telefono,
          :compania,
          :password_hash
        );
      END;
      `,
      {
        id: clienteId,
        nombre,
        email,
        telefono,
        compania,
        password_hash,
      },
    );
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const eliminarCliente = async (id) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_eliminar_cliente(:id);
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
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};

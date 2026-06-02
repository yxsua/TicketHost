const { getConnection } = require("../config/database");

const obtenerCategorias = async () => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(`
      SELECT
        categoria_id,
        nombre,
        descripcion,
        fecha_creacion
      FROM vw_categorias
      ORDER BY categoria_id
    `);

    return result.rows;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const obtenerCategoriaPorId = async (id) => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
      SELECT
        categoria_id,
        nombre,
        descripcion,
        fecha_creacion
      FROM vw_categorias
      WHERE categoria_id = :id
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

const crearCategoria = async (nombre, descripcion) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_insertar_categoria(
          :nombre,
          :descripcion
        );
      END;
      `,
      {
        nombre,
        descripcion,
      },
    );
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const actualizarCategoria = async (categoriaId, nombre, descripcion) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_actualizar_categoria(
          :id,
          :nombre,
          :descripcion
        );
      END;
      `,
      {
        id: categoriaId,
        nombre,
        descripcion,
      },
    );
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const eliminarCategoria = async (id) => {
  let conn;

  try {
    conn = await getConnection();

    await conn.execute(
      `
      BEGIN
        sp_eliminar_categoria(:id);
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
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const { getConnection } = require("../config/database");

const generarToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const loginCliente = async (email, password) => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
      BEGIN
        sp_obtener_cliente_login(
          :email,
          :cursor
        );
      END;
      `,
      {
        email,
        cursor: {
          dir: require("oracledb").BIND_OUT,
          type: require("oracledb").CURSOR,
        },
      },
    );

    const rs = result.outBinds.cursor;

    const rows = await rs.getRows(1);

    await rs.close();

    if (!rows.length) {
      return null;
    }

    const usuario = rows[0];

    const passwordValido = await bcrypt.compare(
      password,
      usuario.PASSWORD_HASH,
    );

    if (!passwordValido) {
      return null;
    }

    const token = generarToken({
      id: usuario.CLIENTE_ID,
      tipo: "cliente",
      nombre: usuario.NOMBRE,
      email: usuario.EMAIL,
    });

    return {
      token,
      usuario: {
        id: usuario.CLIENTE_ID,
        nombre: usuario.NOMBRE,
        email: usuario.EMAIL,
      },
    };
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const loginAgente = async (email, password) => {
  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `
      BEGIN
        sp_obtener_agente_login(
          :email,
          :cursor
        );
      END;
      `,
      {
        email,
        cursor: {
          dir: require("oracledb").BIND_OUT,
          type: require("oracledb").CURSOR,
        },
      },
    );

    const rs = result.outBinds.cursor;

    const rows = await rs.getRows(1);

    await rs.close();

    if (!rows.length) {
      return null;
    }

    const usuario = rows[0];

    const passwordValido = await bcrypt.compare(
      password,
      usuario.PASSWORD_HASH,
    );

    if (!passwordValido) {
      return null;
    }

    const token = generarToken({
      id: usuario.AGENTE_ID,
      tipo: "agente",
      nombre: usuario.NOMBRE,
      email: usuario.EMAIL,
      departamento: usuario.DEPARTAMENTO,
    });

    return {
      token,
      usuario: {
        id: usuario.AGENTE_ID,
        nombre: usuario.NOMBRE,
        email: usuario.EMAIL,
        departamento: usuario.DEPARTAMENTO,
      },
    };
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

const loginAdmin = async (email, password) => {
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    throw new AppError(
      "Credenciales inválidas",
      401,
    );
  }

  const token = generarToken({
    id: 0,
    tipo: "admin",
    nombre: "Administrador",
    email,
  });

  return {
    token,
    usuario: {
      id: 0,
      tipo: "admin",
      nombre: "Administrador",
      email,
    },
  };
};


module.exports = {
  loginCliente,
  loginAgente,
  loginAdmin,
};

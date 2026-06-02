const { getConnection } = require("../config/database");

const testConnection = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const result = await connection.execute(
      `SELECT 'Oracle OK, conexion correcta' mensaje FROM dual`,
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

module.exports = {
  testConnection,
};

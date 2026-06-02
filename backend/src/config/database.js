const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];
oracledb.autoCommit = true;

async function initialize() {
  await oracledb.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,

    poolMin: 2,
    poolMax: 10,
    poolIncrement: 1,
  });

  console.log("Oracle Pool creado");
}

async function closePool() {
  await oracledb.getPool().close(10);

  console.log("Oracle Pool cerrado");
}

async function getConnection() {
  return await oracledb.getPool().getConnection();
}

module.exports = {
  initialize,
  closePool,
  getConnection,
};

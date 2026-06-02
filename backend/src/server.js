require("dotenv").config();

const app = require("./app");
const db = require("./config/database");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await db.initialize();

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en puerto ${PORT}`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

start();

process.on("SIGINT", async () => {
  console.log("Cerrando aplicación...");

  await db.closePool();

  process.exit(0);
});

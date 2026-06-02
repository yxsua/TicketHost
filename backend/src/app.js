const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
const testRoutes = require("./routes/test.routes");
const categoriasRoutes = require("./routes/categorias.routes");
const clientesRoutes = require("./routes/clientes.routes");
const agentesRoutes = require("./routes/agentes.routes");
const ticketsRoutes = require("./routes/tickets.routes");
const historialRoutes = require("./routes/historial.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/agentes", agentesRoutes);
app.use("/api/test", testRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/historial", historialRoutes);
app.use("/api/auth", authRoutes);

// Registrar middleware
const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);
app.get("/", (req, res) => {
  res.json({
    message: "API Tickets funcionando",
  });
});

module.exports = app;

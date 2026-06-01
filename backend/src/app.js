const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
const testRoutes = require("./routes/test.routes");

app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API Tickets funcionando",
  });
});

module.exports = app;
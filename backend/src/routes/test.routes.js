const router = require("express").Router();

const { testConnection } = require("../controllers/test.controller");

router.get("/", testConnection);

module.exports = router;

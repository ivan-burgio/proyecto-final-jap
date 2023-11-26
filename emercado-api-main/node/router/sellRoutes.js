const express = require("express");
const router = express.Router();
const sellController = require("../controller/sellController");

router.get("/", sellController.getSell);

module.exports = router;
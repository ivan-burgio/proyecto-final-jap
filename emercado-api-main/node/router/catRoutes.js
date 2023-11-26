const express = require("express");
const router = express.Router();
const catController = require("../controller/catController");

router.get("/", catController.getCategories);

router.get("/:id", catController.getIdCategories);

module.exports = router;

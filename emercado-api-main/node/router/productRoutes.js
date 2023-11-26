const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/:id", productController.getIdProduct);

module.exports = router;

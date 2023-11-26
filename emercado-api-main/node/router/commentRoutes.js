const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");

router.get("/:id", commentController.getIdComment);

module.exports = router;

const orderController = require("./../../controllers/v1/order");
const authMiddleware = require("./../../middlewares/auth");

const express = require("express");

const router = express.Router();

router.route("/").get(authMiddleware, orderController.getAll);

router.route("/:id").get(authMiddleware, orderController.getOne);

module.exports = router;

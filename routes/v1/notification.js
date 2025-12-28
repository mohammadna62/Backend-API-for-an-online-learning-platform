const express = require("express");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");

const notificationsController = require("./../../controllers/v1/notification");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, notificationsController.create).get(authMiddleware, isAdminMiddleware, notificationsController.getAll);

router.route("/:id").delete(authMiddleware,isAdminMiddleware,notificationsController.remove)
  router.route("/admins").get(authMiddleware,isAdminMiddleware,notificationsController.get)

router.route("/:id/see").put(authMiddleware, isAdminMiddleware, notificationsController.seen)


module.exports = router;

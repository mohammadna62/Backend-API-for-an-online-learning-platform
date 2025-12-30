const express = require("express");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");
const articleController = require("./../../controllers/v1/article");
const multer = require("multer");
const multerStorage = require("./../../utils/uploader");

const router = express.Router();

router
  .route("/")
  .get(articleController.getAll)
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer({ storage: multerStorage, limits: { fileSize: 100000000 } }).single(
      "cover"
    ),
    articleController.create
  );
  router
  .route("/admin")
  .get(authMiddleware, isAdminMiddleware, articleController.getAllByAdmin);
router.route("/:href").get(articleController.getOne);
router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, articleController.remove);
router
  .route("/draft")
  .post(
    authMiddleware,
    isAdminMiddleware,
    multer({ storage: multerStorage, limits: { fileSize: 1000000 } }).single(
      "cover"
    ),
    articleController.saveDraft
  );

router
  .route("/:id/publish")
  .put(authMiddleware, isAdminMiddleware, articleController.publish);

module.exports = router;

const express = require("express");
const ticketController = require("./../../controllers/v1/ticket");
const departmentController = require("./../../controllers/v1/department");
const departmentSubController = require("./../../controllers/v1/department-sub");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");
const router = express.Router();

router.route("/").post(authMiddleware, ticketController.create).get(authMiddleware, isAdminMiddleware, ticketController.getAll);
router.route("/:id").delete(authMiddleware, isAdminMiddleware, ticketController.remove);
router.route("/user").get(authMiddleware, ticketController.userTickets);
router.route("/departments").get(authMiddleware, ticketController.departments);
router.route("/departments-sub/:id").get(authMiddleware, ticketController.departmentsSubs);
router.route("/answer").post(authMiddleware, isAdminMiddleware, ticketController.setAnswer);
router.route("/:id/answer").get(authMiddleware,ticketController.getAnswer)
// department and sub department router aria
router.route("/add/departments").post(authMiddleware, isAdminMiddleware,departmentController.createDepartments)
router.route("/add/departments-sub").post(authMiddleware, isAdminMiddleware,departmentSubController.createDepartmentsSubs)
router.route("/:id/departments-sub").delete(authMiddleware, isAdminMiddleware,departmentController.removeDepartments)
router.route("/:id/departments").delete(authMiddleware, isAdminMiddleware,departmentSubController.removeDepartmentsSubs)

module.exports = router;

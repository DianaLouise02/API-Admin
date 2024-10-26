const { Router } = require("express");
const AdminController = require("../controller/AdminController");
const { validateAdmin, validateAdminId} = require("../middlewares/ValidateAdmin");

const router = Router();

router.post("/forgot-password", AdminController.forgotPassword);

router.post("/reset-password", AdminController.resetPassword);

router.post("/", validateAdmin, (req, res) => {
  AdminController.create(req, res);
});

router.get("/", (req, res) => {
 AdminController.getAll(req, res);
});

router.delete("/:id", validateAdminId, (req, res) => {
 AdminController.delete(req, res);
});


router.put("/:id", validateAdminId, validateAdmin, (req, res) => {
 AdminController.update(req, res);
});

router.get("/:id", validateAdminId, (req, res) => {
  AdminController.getOne(req, res);
});

module.exports = router;

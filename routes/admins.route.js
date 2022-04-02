const { Router } = require("express");
const { adminsController } = require("../controllers/admins.controller");

const router = Router();

router.get("/", adminsController.getAdmin);
router.post("/", adminsController.login);
// router.post('/admin', adminsController.addAdmin);
router.delete("/:id", adminsController.removeAdmin);

module.exports = router;

const { Router } = require("express");
const { adminsController } = require("../controllers/admins.controller");

const router = Router();

router.post("/", adminsController.login);
// router.post('/admin', adminsController.addAdmin);

module.exports = router;

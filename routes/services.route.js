const { Router } = require("express");
const { servicesController } = require("../controllers/services.controller");

const router = Router();

router.post("/", servicesController.addServices);

module.exports = router;

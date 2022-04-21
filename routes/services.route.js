const { Router } = require("express");
const { servicesController } = require("../controllers/services.controller");

const router = Router();

// router.get("/byDate", servicesController.getServices);
router.get("/", servicesController.getServices);
router.delete("/:id", servicesController.removeServices);
router.patch("/:id", servicesController.updateServices);

module.exports = router;

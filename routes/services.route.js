const { Router } = require("express");
const { servicesController } = require("../controllers/services.controller");

const router = Router();

router.post('/', servicesController.addServices);
router.get('/',servicesController.getServices);
router.delete('/:id', servicesController.removeServices)

module.exports = router;

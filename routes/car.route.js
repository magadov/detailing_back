const { Router } = require("express")
const { carsController } = require('../controllers/cars.controller');

const router = Router();

router.get('/', carsController.getCar)

module.exports = router;
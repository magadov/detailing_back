const { Router } = require("express")
const { carsController } = require('../controllers/cars.controller');
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/", carsController.getCars);
router.delete("/:id", carsController.deleteCar);
router.post("/:id", carsController.addCar);
router.patch("/", carsController.updateCar);

module.exports = router;



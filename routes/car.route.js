const { Router } = require("express");
const { carsController } = require("../controllers/cars.controller");

const router = Router();

router.get("/", carsController.getCar);
router.delete("/:id", carsController.deleteCar);
router.post("/:id", carsController.addCar);
router.patch("/", carsController.updateCar);

module.exports = router;


const { Router } = require("express");
const { carsController } = require("../controllers/cars.controller");
const authMiddleware = require("../middlewares/auth.middleware");


const router = Router();

router.get("/", authMiddleware, carsController.getCar);
router.delete("/:id", authMiddleware, carsController.deleteCar);
router.post("/add/car/:id", authMiddleware, carsController.addCar);
router.patch("/update", authMiddleware, carsController.updateCar);


module.exports = router;

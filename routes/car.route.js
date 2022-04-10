const { Router } = require("express");
const { carsController } = require("../controllers/cars.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/", authMiddleware, carsController.getCar);
router.post("/", authMiddleware, carsController.addCar);
router.delete("/:id", authMiddleware, carsController.deleteCar);
router.patch("/add", authMiddleware, carsController.addVinData);
router.get("/get", authMiddleware, carsController.getVin);
router.patch("/update", authMiddleware, carsController.updateCar);

module.exports = router;

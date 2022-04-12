const { Router } = require("express")
const { carsController } = require('../controllers/cars.controller');
const authMiddleware = require("../middlewares/auth.middleware");


const router = Router();

router.get("/", authMiddleware, carsController.getCar);


module.exports = router;
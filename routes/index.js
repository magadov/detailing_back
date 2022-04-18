const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();


router.use("/services", authMiddleware, require("./services.route"));
router.use("/materials", authMiddleware, require("./materials.route"));
router.use("/admins", require("./admins.route"));
router.use("/clients", authMiddleware, require("./clients.route"));
router.use("/cars", authMiddleware, require("./car.route"));


module.exports = router;

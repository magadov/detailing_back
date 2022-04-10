const { Router } = require("express");
const { clientsController } = require("../controllers/clients.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/", authMiddleware, clientsController.getClient);
router.post("/", authMiddleware, clientsController.addClient);
router.delete("/:id", authMiddleware, clientsController.deleteClient);

module.exports = router;

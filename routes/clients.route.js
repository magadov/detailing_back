const { Router } = require("express");
const { clientsController } = require("../controllers/clients.controller");

const router = Router();

router.get("/", clientsController.getClient);
router.post("/", clientsController.addClient);
router.delete("/:id", clientsController.deleteClient);

module.exports = router;

const { Router } = require('express');
const { materialsController } = require("../controllers/materials.controller");

const router = Router();

router.post('/add', materialsController.addMaterials);
router.get('/get', materialsController.getAllMaterials);
router.delete('/remove/:id', materialsController.removeMaterial);

module.exports = router;
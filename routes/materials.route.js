const { Router } = require('express');
const { materialsController } = require("../controllers/materials.controller");

const router = Router();

router.post('/', materialsController.addMaterials);
router.get('/', materialsController.getAllMaterials);
router.delete('/:id', materialsController.removeMaterial);
router.patch('/:id', materialsController.addingMaterial);
router.patch('/:id/consumption', materialsController.consumptionMaterial);
router.get('/byDate', materialsController.getAllMaterialsForThePeriod);

module.exports = router;
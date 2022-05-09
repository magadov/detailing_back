const { Router } = require("express");
const { materialsController } = require("../controllers/materials.controller");

const router = Router();

router.post("/:id/admission", materialsController.admissionMaterial);
router.post("/:id/consumption", materialsController.consumptionMaterial);
router.post("/", materialsController.addMaterials);
router.delete("/:id", materialsController.removeMaterial);
router.get("/", materialsController.getAllMaterialsForThePeriod);
router.patch('/:id', materialsController.editMaterials)

module.exports = router;

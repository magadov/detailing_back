const { Router } = require("express");

const router = Router();

router.use('/services', require('./services.route'));
router.use('/materials', require('./materials.route'))

module.exports = router;